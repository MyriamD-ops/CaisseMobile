import { Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import QRScanner from '../../Components/QRScanner';
import useOnlineStatus from '../../Hooks/useOnlineStatus';
import { saveVenteLocal, getProduitsLocal, syncProduits } from '../../utils/sync';

export default function Create({ products: serverProducts }) {
    const isOnline = useOnlineStatus();
    const [products, setProducts] = useState(serverProducts);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [moyenPaiement, setMoyenPaiement] = useState('Espèces');
    const [processing, setProcessing] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

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
                alert('Stock insuffisant');
            }
        } else {
            setCart([...cart, {
                id_produit: product.id_produit,
                nom: product.nom,
                prix_unitaire: product.prix_base,
                quantite: 1,
                stock_max: product.stock_actuel
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
            alert('Stock insuffisant');
            return;
        }
        setCart(cart.map(item => 
            item.id_produit === id_produit ? { ...item, quantite } : item
        ));
    };

    const total = cart.reduce((sum, item) => sum + (item.prix_unitaire * item.quantite), 0);

    const handleQRScan = (qrCode) => {
        console.log('🔍 Recherche produit avec code:', qrCode);
        
        // Chercher le produit par code_barres
        const product = products.find(p => p.code_barres === qrCode);
        
        if (product) {
            addToCart(product);
            setShowScanner(false);
            // Feedback visuel
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
            audio.play().catch(() => {});
        } else {
            alert(`❌ Produit non trouvé\n\nCode scanné : ${qrCode}\n\nVérifiez que le QR code correspond à un produit actif.`);
        }
        
        setShowScanner(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert('Le panier est vide !');
            return;
        }

        setProcessing(true);

        const venteData = {
            articles: cart.map(item => ({
                id_produit: item.id_produit,
                nom_produit: item.nom,
                quantite: item.quantite,
                prix_unitaire: item.prix_unitaire,
                sous_total: item.prix_unitaire * item.quantite
            })),
            mode_paiement: moyenPaiement,
            montant_total: total,
            date_vente: new Date().toISOString()
        };

        if (!isOnline) {
            try {
                await saveVenteLocal(venteData);
                setCart([]);
                setProcessing(false);
                alert('✅ Vente sauvegardée hors ligne !\n\nElle sera synchronisée automatiquement au retour de la connexion.\n\nVous pouvez continuer à vendre hors ligne.');
            } catch (error) {
                console.error('Erreur sauvegarde locale:', error);
                alert('❌ Erreur lors de la sauvegarde locale');
                setProcessing(false);
            }
            return;
        }

        const formData = {
            items: cart.map(item => ({
                id_produit: item.id_produit,
                quantite: item.quantite,
                prix_unitaire: item.prix_unitaire
            })),
            moyen_paiement: moyenPaiement
        };

        router.post('/sales', formData, {
            onSuccess: () => {
                setCart([]);
                setProcessing(false);
            },
            onError: (errors) => {
                console.error('Erreurs:', errors);
                alert('Erreur lors de l\'enregistrement');
                setProcessing(false);
            },
            onFinish: () => {
                setProcessing(false);
            }
        });
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <Header currentPage="sales" />
            <main style={{ padding: '24px' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', border: '1px solid #DEE2E6' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', marginBottom: '16px' }}>Produits</h2>
                        
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                            <input 
                                type="text" 
                                placeholder="🔍 Rechercher un produit..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                style={{ flex: 1, padding: '12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} 
                            />
                            <button
                                onClick={() => setShowScanner(true)}
                                style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#28A745',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s',
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#28A745'}
                            >
                                📷 Scanner
                            </button>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', maxHeight: '600px', overflowY: 'auto' }}>
                            {filteredProducts.map((product) => (
                                <button key={product.id_produit} onClick={() => addToCart(product)} disabled={product.stock_actuel === 0} style={{ padding: '16px', backgroundColor: product.stock_actuel === 0 ? '#F8F9FA' : '#FFFFFF', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: product.stock_actuel === 0 ? 'not-allowed' : 'pointer', textAlign: 'left', transition: 'all 0.2s' }} onMouseEnter={(e) => { if (product.stock_actuel > 0) { e.target.style.backgroundColor = '#F8F9FA'; e.target.style.borderColor = '#ADB5BD'; } }} onMouseLeave={(e) => { if (product.stock_actuel > 0) { e.target.style.backgroundColor = '#FFFFFF'; e.target.style.borderColor = '#DEE2E6'; } }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#2C3E50', marginBottom: '4px' }}>{product.nom}</div>
                                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#343A40', marginBottom: '4px' }}>{product.prix_base}€</div>
                                    <div style={{ fontSize: '12px', color: product.stock_actuel === 0 ? '#C53030' : '#6C757D' }}>Stock: {product.stock_actuel}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', border: '1px solid #DEE2E6', height: 'fit-content' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', margin: 0 }}>Panier ({cart.length})</h2>
                            {cart.length > 0 && (
                                <button onClick={() => { if (confirm('Vider tout le panier ?')) { setCart([]); } }} style={{ padding: '6px 12px', backgroundColor: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', color: '#C53030', fontWeight: '500', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#FEE2E2'} onMouseLeave={(e) => e.target.style.backgroundColor = '#FFF5F5'}>🗑️ Vider</button>
                            )}
                        </div>
                        {cart.length === 0 ? (
                            <div style={{ padding: '32px', textAlign: 'center' }}>
                                <p style={{ fontSize: '32px', marginBottom: '8px', filter: 'grayscale(100%)' }}>🛒</p>
                                <p style={{ color: '#6C757D', fontSize: '14px' }}>Panier vide</p>
                            </div>
                        ) : (
                            <div>
                                <div style={{ marginBottom: '16px', maxHeight: '300px', overflowY: 'auto' }}>
                                    {cart.map((item) => (
                                        <div key={item.id_produit} style={{ padding: '12px', backgroundColor: '#F8F9FA', borderRadius: '6px', marginBottom: '8px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#2C3E50' }}>{item.nom}</div>
                                                    <div style={{ fontSize: '13px', color: '#6C757D' }}>{item.prix_unitaire}€ × {item.quantite}</div>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id_produit)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#C53030' }}>×</button>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <button onClick={() => updateQuantity(item.id_produit, item.quantite - 1)} style={{ padding: '4px 12px', backgroundColor: '#FFFFFF', border: '1px solid #DEE2E6', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>−</button>
                                                <input type="number" value={item.quantite} onChange={(e) => updateQuantity(item.id_produit, parseInt(e.target.value) || 0)} style={{ width: '50px', padding: '4px', textAlign: 'center', border: '1px solid #DEE2E6', borderRadius: '4px', fontSize: '14px' }} />
                                                <button onClick={() => updateQuantity(item.id_produit, item.quantite + 1)} style={{ padding: '4px 12px', backgroundColor: '#FFFFFF', border: '1px solid #DEE2E6', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>+</button>
                                                <div style={{ marginLeft: 'auto', fontSize: '16px', fontWeight: '600', color: '#2C3E50' }}>{(item.prix_unitaire * item.quantite).toFixed(2)}€</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ borderTop: '1px solid #DEE2E6', paddingTop: '16px', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <span style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50' }}>Total</span>
                                        <span style={{ fontSize: '24px', fontWeight: '600', color: '#343A40' }}>{total.toFixed(2)}€</span>
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Moyen de paiement</label>
                                        <select value={moyenPaiement} onChange={(e) => setMoyenPaiement(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}>
                                            <option value="Espèces">Espèces</option>
                                            <option value="Carte bancaire">Carte bancaire</option>
                                            <option value="Chèque">Chèque</option>
                                            <option value="Virement">Virement</option>
                                        </select>
                                    </div>
                                    <button onClick={handleSubmit} disabled={processing} style={{ width: '100%', padding: '14px', backgroundColor: processing ? '#ADB5BD' : '#343A40', color: '#FFFFFF', fontWeight: '600', borderRadius: '6px', border: 'none', cursor: processing ? 'not-allowed' : 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}>
                                        {processing && <span style={{ width: '16px', height: '16px', border: '2px solid #FFFFFF', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }}></span>}
                                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                                        {processing ? 'Traitement...' : (isOnline ? 'Valider la vente' : '💾 Sauvegarder hors ligne')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            
            {/* Scanner QR Code */}
            {showScanner && (
                <QRScanner 
                    onScan={handleQRScan}
                    onClose={() => setShowScanner(false)}
                />
            )}
        </div>
    );
}
