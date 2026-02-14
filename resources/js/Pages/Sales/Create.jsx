import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ products }) {
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [moyenPaiement, setMoyenPaiement] = useState('Espèces');
    const [processing, setProcessing] = useState(false);

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id_produit === product.id_produit);
        
        if (existingItem) {
            if (existingItem.quantite < product.stock_actuel) {
                setCart(cart.map(item =>
                    item.id_produit === product.id_produit
                        ? { ...item, quantite: item.quantite + 1 }
                        : item
                ));
            } else {
                alert('Stock insuffisant !');
            }
        } else {
            setCart([...cart, {
                id_produit: product.id_produit,
                nom: product.nom,
                prix_unitaire: parseFloat(product.prix_base),
                quantite: 1,
                stock_max: product.stock_actuel
            }]);
        }
    };

    const removeFromCart = (id_produit) => {
        setCart(cart.filter(item => item.id_produit !== id_produit));
    };

    const updateQuantity = (id_produit, newQuantity) => {
        const item = cart.find(i => i.id_produit === id_produit);
        if (newQuantity > item.stock_max) {
            alert('Stock insuffisant !');
            return;
        }
        if (newQuantity < 1) {
            removeFromCart(id_produit);
            return;
        }
        setCart(cart.map(item =>
            item.id_produit === id_produit
                ? { ...item, quantite: newQuantity }
                : item
        ));
    };

    const total = cart.reduce((sum, item) => sum + (item.prix_unitaire * item.quantite), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert('Le panier est vide !');
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
        
        console.log('=== ENVOI ===', formData);
        setProcessing(true);
        
        // Utiliser Inertia avec les bonnes données
        router.post('/sales', formData, {
            onSuccess: (page) => {
                console.log('Succès !', page);
                setCart([]);
            },
            onError: (errors) => {
                console.error('Erreurs:', errors);
                alert('Erreur: ' + JSON.stringify(errors));
                setProcessing(false);
            },
            onFinish: () => {
                setProcessing(false);
            }
        });
    };

    const filteredProducts = products.filter(p =>
        p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categorie?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui' }}>
            <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#f43f5e', textDecoration: 'none' }}>Atelier Doré</Link>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '24px' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>Nouvelle vente</h2>
                        <Link href="/sales" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}>← Retour aux ventes</Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                        {/* Liste des produits */}
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Produits disponibles</h3>
                            
                            <input
                                type="text"
                                placeholder="🔍 Rechercher un produit..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', marginBottom: '16px', fontSize: '16px' }}
                            />

                            <div style={{ display: 'grid', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
                                {filteredProducts.map(product => (
                                    <div
                                        key={product.id_produit}
                                        onClick={() => addToCart(product)}
                                        style={{
                                            padding: '16px',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            backgroundColor: '#fff'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h4 style={{ fontWeight: '600', color: '#111827', marginBottom: '4px' }}>{product.nom}</h4>
                                                <p style={{ fontSize: '12px', color: '#6b7280' }}>Stock: {product.stock_actuel} • {product.categorie}</p>
                                            </div>
                                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#f43f5e' }}>{product.prix_base}€</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Panier */}
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Panier ({cart.length})</h3>

                            {cart.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
                                    <p style={{ fontSize: '48px', marginBottom: '8px' }}>🛒</p>
                                    <p>Le panier est vide</p>
                                </div>
                            ) : (
                                <>
                                    <div style={{ marginBottom: '16px', maxHeight: '300px', overflowY: 'auto' }}>
                                        {cart.map(item => (
                                            <div key={item.id_produit} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <span style={{ fontWeight: '500', flex: 1 }}>{item.nom}</span>
                                                    <button onClick={() => removeFromCart(item.id_produit)} style={{ color: '#991b1b', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <button onClick={() => updateQuantity(item.id_produit, item.quantite - 1)} style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>-</button>
                                                    <input type="number" value={item.quantite} onChange={(e) => updateQuantity(item.id_produit, parseInt(e.target.value) || 0)} style={{ width: '50px', textAlign: 'center', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                                                    <button onClick={() => updateQuantity(item.id_produit, item.quantite + 1)} style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>+</button>
                                                    <span style={{ marginLeft: 'auto', fontWeight: '600' }}>{(item.prix_unitaire * item.quantite).toFixed(2)}€</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '16px', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total</span>
                                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#f43f5e' }}>{total.toFixed(2)}€</span>
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Moyen de paiement</label>
                                            <select value={moyenPaiement} onChange={(e) => setMoyenPaiement(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }}>
                                                <option value="Espèces">Espèces</option>
                                                <option value="Carte bancaire">Carte bancaire</option>
                                                <option value="Chèque">Chèque</option>
                                                <option value="Virement">Virement</option>
                                            </select>
                                        </div>

                                        <button onClick={handleSubmit} disabled={processing} style={{ width: '100%', padding: '16px', background: 'linear-gradient(to right, #f43f5e, #fbbf24)', color: 'white', fontWeight: '600', borderRadius: '8px', border: 'none', cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.5 : 1, fontSize: '16px' }}>
                                            {processing ? 'Enregistrement...' : '💰 Valider la vente'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
