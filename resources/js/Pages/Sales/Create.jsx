import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ products }) {
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [moyenPaiement, setMoyenPaiement] = useState('Espèces');
    const [processing, setProcessing] = useState(false);

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

    const handleSubmit = (e) => {
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

        setProcessing(true);

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
            <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DEE2E6', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', textDecoration: 'none' }}>CaisseMobile</Link>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link href="/" style={{ padding: '8px 16px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', color: '#495057', textDecoration: 'none' }}>← Dashboard</Link>
                        <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#495057' }}>Déconnexion</Link>
                    </div>
                </div>
            </header>

            <main style={{ padding: '24px' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                    {/* Produits */}
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', border: '1px solid #DEE2E6' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', marginBottom: '16px' }}>Produits</h2>
                        
                        <input
                            type="text"
                            placeholder="🔍 Rechercher un produit..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', marginBottom: '16px', boxSizing: 'border-box' }}
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', maxHeight: '600px', overflowY: 'auto' }}>
                            {filteredProducts.map((product) => (
                                <button
                                    key={product.id_produit}
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock_actuel === 0}
                                    style={{
                                        padding: '16px',
                                        backgroundColor: product.stock_actuel === 0 ? '#F8F9FA' : '#FFFFFF',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: '6px',
                                        cursor: product.stock_actuel === 0 ? 'not-allowed' : 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (product.stock_actuel > 0) {
                                            e.target.style.backgroundColor = '#F8F9FA';
                                            e.target.style.borderColor = '#ADB5BD';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (product.stock_actuel > 0) {
                                            e.target.style.backgroundColor = '#FFFFFF';
                                            e.target.style.borderColor = '#DEE2E6';
                                        }
                                    }}
                                >
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#2C3E50', marginBottom: '4px' }}>{product.nom}</div>
                                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#343A40', marginBottom: '4px' }}>{product.prix_base}€</div>
                                    <div style={{ fontSize: '12px', color: product.stock_actuel === 0 ? '#C53030' : '#6C757D' }}>
                                        Stock: {product.stock_actuel}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Panier */}
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', border: '1px solid #DEE2E6', height: 'fit-content' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', margin: 0 }}>Panier ({cart.length})</h2>
                            {cart.length > 0 && (
                                <button
                                    onClick={() => {
                                        if (confirm('Vider tout le panier ?')) {
                                            setCart([]);
                                        }
                                    }}
                                    style={{
                                        padding: '6px 12px',
                                        backgroundColor: '#FFF5F5',
                                        border: '1px solid #FED7D7',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        color: '#C53030',
                                        fontWeight: '500',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#FEE2E2';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#FFF5F5';
                                    }}
                                >
                                    🗑️ Vider
                                </button>
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
                                                <div style={{ marginLeft: 'auto', fontSize: '16px', fontWeight: '600', color: '#2C3E50' }}>
                                                    {(item.prix_unitaire * item.quantite).toFixed(2)}€
                                                </div>
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
                                        {processing && (
                                            <span style={{ 
                                                width: '16px', 
                                                height: '16px', 
                                                border: '2px solid #FFFFFF', 
                                                borderTop: '2px solid transparent', 
                                                borderRadius: '50%', 
                                                animation: 'spin 0.6s linear infinite',
                                                display: 'inline-block'
                                            }}></span>
                                        )}
                                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                                        {processing ? 'Validation en cours...' : 'Valider la vente'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
