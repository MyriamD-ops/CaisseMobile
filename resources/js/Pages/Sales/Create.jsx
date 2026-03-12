import { router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import QRScanner from '../../Components/QRScanner';
import useOnlineStatus from '../../Hooks/useOnlineStatus';
import { saveVenteLocal, getProduitsLocal, syncProduits } from '../../utils/sync';

export default function Create({ products: serverProducts }) {
    const isOnline = useOnlineStatus();
    const { errors } = usePage().props;
    const [products, setProducts] = useState(serverProducts);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [moyenPaiement, setMoyenPaiement] = useState('Espèces');
    const [processing, setProcessing] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

    // ── UI state (mobile + notifications) ──────────────────────────────────────
    const [showCart, setShowCart] = useState(false);
    const [notification, setNotification] = useState(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const notify = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    // Afficher les erreurs renvoyées par back()->withErrors() côté serveur
    useEffect(() => {
        if (errors?.error) {
            notify('error', errors.error);
        }
    }, [errors]);

    // ── Logique métier inchangée ────────────────────────────────────────────────

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        if (isOnline) {
            syncProducts();
        }
    }, [isOnline]);

    const loadProducts = async () => {
        try {
            const localProducts = await getProduitsLocal();
            if (localProducts.length > 0) {
                setProducts(localProducts);
            }
        } catch (error) {
            console.error('Erreur chargement produits:', error);
        }
    };

    const syncProducts = async () => {
        if (!isOnline) return;
        try {
            const synced = await syncProduits();
            setProducts(synced);
        } catch (error) {
            console.error('Erreur sync:', error);
        }
    };

    const filteredProducts = products.filter(p =>
        p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categorie.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (product) => {
        const existing = cart.find(item => item.id_produit === product.id_produit);
        if (existing) {
            if (existing.quantite < product.stock_actuel) {
                setCart(cart.map(item =>
                    item.id_produit === product.id_produit
                        ? { ...item, quantite: item.quantite + 1 }
                        : item
                ));
            } else {
                notify('error', 'Stock insuffisant');
            }
        } else {
            setCart([...cart, {
                id_produit: product.id_produit,
                nom: product.nom,
                prix_unitaire: product.prix_base,
                quantite: 1,
                stock_max: product.stock_actuel,
            }]);
        }
    };

    const removeFromCart = (id_produit) => {
        setCart(cart.filter(item => item.id_produit !== id_produit));
    };

    const updateQuantity = (id_produit, quantite) => {
        if (quantite < 1) {
            removeFromCart(id_produit);
            return;
        }
        const item = cart.find(i => i.id_produit === id_produit);
        if (quantite > item.stock_max) {
            notify('error', 'Stock insuffisant');
            return;
        }
        setCart(cart.map(item =>
            item.id_produit === id_produit ? { ...item, quantite } : item
        ));
    };

    const total = cart.reduce((sum, item) => sum + (item.prix_unitaire * item.quantite), 0);

    const handleQRScan = (qrCode) => {
        console.log('🔍 Recherche produit avec code:', qrCode);
        const product = products.find(p => p.code_barres === qrCode);
        if (product) {
            addToCart(product);
            setShowScanner(false);
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
            audio.play().catch(() => {});
        } else {
            notify('error', `Produit non trouvé — Code scanné : ${qrCode}`);
        }
        setShowScanner(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            notify('error', 'Le panier est vide !');
            return;
        }

        setProcessing(true);

        const venteData = {
            articles: cart.map(item => ({
                id_produit: item.id_produit,
                nom_produit: item.nom,
                quantite: item.quantite,
                prix_unitaire: item.prix_unitaire,
                sous_total: item.prix_unitaire * item.quantite,
            })),
            mode_paiement: moyenPaiement,
            montant_total: total,
            date_vente: new Date().toISOString(),
        };

        if (!isOnline) {
            try {
                await saveVenteLocal(venteData);
                setCart([]);
                setShowCart(false);
                setProcessing(false);
                notify('success', 'Vente sauvegardée hors ligne — synchronisation automatique au retour de la connexion.');
            } catch (error) {
                console.error('Erreur sauvegarde locale:', error);
                notify('error', 'Erreur lors de la sauvegarde locale');
                setProcessing(false);
            }
            return;
        }

        const formData = {
            items: cart.map(item => ({
                id_produit: item.id_produit,
                quantite: item.quantite,
                prix_unitaire: item.prix_unitaire,
            })),
            moyen_paiement: moyenPaiement,
        };

        router.post('/sales', formData, {
            onSuccess: () => {
                // La navigation vers sales.index est automatique (redirect côté serveur).
                // Les setState ici sont sur un composant démonté — pas de mise à jour.
            },
            onError: (errs) => {
                console.error('Erreurs de validation:', errs);
                // Les erreurs de back()->withErrors() sont lues via useEffect(errors)
                // Les erreurs de validation standard (422) arrivent ici
                const msg = errs?.error ?? errs?.items ?? "Erreur lors de l'enregistrement";
                notify('error', Array.isArray(msg) ? msg[0] : msg);
                setProcessing(false);
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    // ── JSX du contenu panier (sidebar desktop + bottom sheet mobile) ──────────
    const renderCartContent = (onClose) => (
        <div className="flex flex-col flex-1 min-h-0">
            {/* En-tête panier */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate/20 shrink-0">
                <h2 className="font-semibold text-dark">
                    Panier
                    <span className="ml-2 px-2 py-0.5 bg-ember/10 text-ember text-xs rounded-full font-bold">
                        {cart.length}
                    </span>
                </h2>
                <div className="flex items-center gap-2">
                    {cart.length > 0 && (
                        showClearConfirm ? (
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-slate text-xs">Vider ?</span>
                                <button
                                    onClick={() => { setCart([]); setShowClearConfirm(false); }}
                                    className="text-ruby text-xs font-semibold hover:opacity-80 transition-opacity"
                                >Oui</button>
                                <button
                                    onClick={() => setShowClearConfirm(false)}
                                    className="text-slate text-xs hover:text-dark transition-colors"
                                >Non</button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowClearConfirm(true)}
                                className="flex items-center gap-1 px-2.5 h-7 bg-ruby/10 text-ruby text-xs font-medium rounded-lg hover:bg-ruby/20 transition-colors border border-ruby/20"
                            >
                                🗑️ Vider
                            </button>
                        )
                    )}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate/10 text-slate hover:text-dark transition-colors text-lg leading-none"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <span className="text-4xl mb-3 grayscale">🛒</span>
                        <p className="text-slate text-sm">Panier vide</p>
                        <p className="text-slate/50 text-xs mt-1">Appuyez sur un produit pour l'ajouter</p>
                    </div>
                ) : (
                    cart.map((item) => (
                        <div key={item.id_produit} className="bg-snow rounded-xl p-3 border border-slate/20">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 min-w-0 mr-2">
                                    <p className="text-sm font-medium text-dark truncate">{item.nom}</p>
                                    <p className="text-xs text-slate mt-0.5">{item.prix_unitaire}€ × {item.quantite}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id_produit)}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg text-ruby hover:bg-ruby/10 transition-colors text-lg leading-none shrink-0"
                                >×</button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateQuantity(item.id_produit, item.quantite - 1)}
                                    className="w-11 h-11 flex items-center justify-center bg-slate/10 hover:bg-ember/10 hover:text-ember text-dark rounded-xl transition-colors font-bold text-lg shrink-0"
                                >−</button>
                                <input
                                    type="number"
                                    value={item.quantite}
                                    onChange={(e) => updateQuantity(item.id_produit, parseInt(e.target.value) || 0)}
                                    className="w-14 h-11 text-center bg-white border border-slate/30 rounded-xl text-dark text-sm focus:outline-none focus:border-ember transition-colors"
                                />
                                <button
                                    onClick={() => updateQuantity(item.id_produit, item.quantite + 1)}
                                    className="w-11 h-11 flex items-center justify-center bg-slate/10 hover:bg-ember/10 hover:text-ember text-dark rounded-xl transition-colors font-bold text-lg shrink-0"
                                >+</button>
                                <span className="ml-auto text-sm font-bold text-ember shrink-0">
                                    {(item.prix_unitaire * item.quantite).toFixed(2)}€
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pied panier : total + paiement + valider */}
            {cart.length > 0 && (
                <div className="p-4 border-t border-slate/20 space-y-3 shrink-0">
                    <div className="flex justify-between items-center">
                        <span className="text-slate text-sm font-medium">Total</span>
                        <span className="text-2xl font-bold text-dark">{total.toFixed(2)}€</span>
                    </div>

                    <select
                        value={moyenPaiement}
                        onChange={(e) => setMoyenPaiement(e.target.value)}
                        className="w-full h-11 px-3 bg-white border border-slate/40 rounded-xl text-dark text-sm focus:outline-none focus:border-ember focus:ring-2 focus:ring-ember/15 transition-colors"
                    >
                        <option value="Espèces">Espèces</option>
                        <option value="Carte bancaire">Carte bancaire</option>
                        <option value="Chèque">Chèque</option>
                        <option value="Virement">Virement</option>
                    </select>

                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="w-full h-12 bg-linear-to-r from-ember to-ember-dim hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm shadow-ember/20"
                    >
                        {processing && (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        {processing ? 'Traitement...' : (isOnline ? 'Valider la vente' : '💾 Sauvegarder hors ligne')}
                    </button>
                </div>
            )}
        </div>
    );

    // ── Rendu principal ────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-snow">
            <Header currentPage="sales" />

            {/* Toast notification */}
            {notification && (
                <div className={`fixed top-4 left-4 right-4 z-50 p-4 rounded-xl text-sm font-medium flex items-start gap-3 shadow-xl ${
                    notification.type === 'success'
                        ? 'bg-mint/10 border border-mint/40 text-dark'
                        : 'bg-ruby/5 border border-ruby/30 text-dark'
                }`}>
                    <span className={`text-lg leading-none mt-0.5 ${notification.type === 'success' ? 'text-mint' : 'text-ruby'}`}>
                        {notification.type === 'success' ? '✓' : '⚠'}
                    </span>
                    <span className="flex-1 leading-relaxed">{notification.message}</span>
                    <button
                        onClick={() => setNotification(null)}
                        className="text-slate hover:text-dark font-bold text-lg leading-none shrink-0"
                    >×</button>
                </div>
            )}

            {/*
                Layout :
                  mobile  → 1 colonne, panier en bottom sheet
                  desktop → grille 2fr + 1fr avec colonnes scrollables
            */}
            <main className="p-4 lg:p-6 max-w-7xl mx-auto pb-28 lg:pb-6">
                <div className="lg:grid lg:grid-cols-[2fr_1fr] lg:gap-6 lg:h-[calc(100vh-8rem)]">

                    {/* ── Colonne produits ── */}
                    <div className="bg-white rounded-2xl border border-slate/20 shadow-sm flex flex-col overflow-hidden mb-4 lg:mb-0">
                        {/* Barre de recherche */}
                        <div className="p-4 border-b border-slate/20 shrink-0">
                            <h2 className="text-base font-semibold text-dark mb-3">Produits</h2>
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-11 px-4 bg-snow border border-slate/30 rounded-xl text-dark text-sm placeholder:text-slate/40 focus:outline-none focus:border-ember focus:ring-2 focus:ring-ember/15 transition-colors mb-2"
                            />
                            <button
                                onClick={() => setShowScanner(true)}
                                className="w-full h-11 bg-mint/10 text-mint border border-mint/30 rounded-xl text-sm font-medium hover:bg-mint/20 transition-colors flex items-center justify-center gap-2"
                            >
                                📷 Scanner un produit
                            </button>
                        </div>

                        {/* Grille produits */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {filteredProducts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <p className="text-4xl mb-3 grayscale">📦</p>
                                    <p className="text-slate text-sm">Aucun produit trouvé</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                                    {filteredProducts.map((product) => (
                                        <button
                                            key={product.id_produit}
                                            onClick={() => addToCart(product)}
                                            disabled={product.stock_actuel === 0}
                                            className={`p-4 rounded-xl text-left border transition-all ${
                                                product.stock_actuel === 0
                                                    ? 'bg-snow border-slate/20 opacity-40 cursor-not-allowed'
                                                    : 'bg-snow border-slate/20 hover:border-ember/40 hover:bg-ember/5 active:scale-95 cursor-pointer'
                                            }`}
                                        >
                                            <p className="text-sm font-semibold text-dark mb-1 truncate">
                                                {product.nom}
                                            </p>
                                            <p className="text-base font-bold text-ember">
                                                {product.prix_base}€
                                            </p>
                                            <p className={`text-xs mt-1 ${
                                                product.stock_actuel === 0 ? 'text-ruby' : 'text-slate'
                                            }`}>
                                                Stock : {product.stock_actuel}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Panier desktop (sidebar droite) ── */}
                    <div className="hidden lg:flex flex-col bg-white rounded-2xl border border-slate/20 shadow-sm overflow-hidden">
                        {renderCartContent(null)}
                    </div>
                </div>
            </main>

            {/* ── Barre panier fixe en bas (mobile, si panier non vide) ── */}
            {cart.length > 0 && (
                <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-slate/20 z-30">
                    <button
                        onClick={() => setShowCart(true)}
                        className="w-full h-14 bg-linear-to-r from-ember to-ember-dim hover:brightness-90 text-white font-bold rounded-2xl flex items-center justify-between px-5 transition-all shadow-sm shadow-ember/20"
                    >
                        <span className="flex items-center gap-2.5">
                            <span className="bg-white/25 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                {cart.length}
                            </span>
                            <span>Voir le panier</span>
                        </span>
                        <span className="text-lg font-bold">{total.toFixed(2)}€</span>
                    </button>
                </div>
            )}

            {/* ── Bottom sheet panier (mobile) ── */}
            {showCart && (
                <div className="lg:hidden fixed inset-0 z-40">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowCart(false)}
                    />
                    {/* Sheet */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] flex flex-col border-t border-slate/20 overflow-hidden">
                        {/* Poignée visuelle */}
                        <div className="flex justify-center pt-3 pb-1 shrink-0">
                            <div className="w-10 h-1 bg-slate/20 rounded-full" />
                        </div>
                        {renderCartContent(() => setShowCart(false))}
                    </div>
                </div>
            )}

            {/* ── Scanner QR ── */}
            {showScanner && (
                <QRScanner
                    onScan={handleQRScan}
                    onClose={() => setShowScanner(false)}
                />
            )}
        </div>
    );
}
