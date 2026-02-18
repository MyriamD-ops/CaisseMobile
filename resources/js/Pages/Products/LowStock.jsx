import { Link } from '@inertiajs/react';

export default function LowStock({ products }) {
    const lowStockProducts = products.filter(p => p.stock_actuel <= p.stock_minimum);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DEE2E6', padding: '16px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <Link href="/" style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', textDecoration: 'none' }}>CaisseMobile</Link>
                        <nav style={{ display: 'flex', gap: '16px' }}>
                            <Link href="/" style={{ color: '#6C757D', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#2C3E50'}
                                onMouseLeave={(e) => e.target.style.color = '#6C757D'}
                            >Dashboard</Link>
                            <Link href="/products" style={{ color: '#6C757D', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#2C3E50'}
                                onMouseLeave={(e) => e.target.style.color = '#6C757D'}
                            >Produits</Link>
                            <Link href="/sales" style={{ color: '#6C757D', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                                onMouseEnter={(e) => e.target.style.color = '#2C3E50'}
                                onMouseLeave={(e) => e.target.style.color = '#6C757D'}
                            >Ventes</Link>
                            <Link href="/products/low-stock" style={{ color: '#2C3E50', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>Alertes stock</Link>
                        </nav>
                    </div>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#495057' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#2C3E50', marginBottom: '4px' }}>Alertes stock</h2>
                        <p style={{ color: '#6C757D', fontSize: '14px' }}>{lowStockProducts.length} produit{lowStockProducts.length > 1 ? 's' : ''} en stock bas</p>
                    </div>
                    <Link href="/products" style={{ padding: '10px 20px', backgroundColor: '#F8F9FA', color: '#495057', fontWeight: '500', borderRadius: '6px', textDecoration: 'none', display: 'inline-block', fontSize: '14px', border: '1px solid #DEE2E6' }}>
                        Tous les produits
                    </Link>
                </div>

                {lowStockProducts.length === 0 ? (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '64px', textAlign: 'center', border: '1px solid #DEE2E6' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px', filter: 'grayscale(100%)' }}>✅</p>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginBottom: '8px' }}>Aucune alerte stock</h3>
                        <p style={{ color: '#6C757D', marginBottom: '24px', fontSize: '14px' }}>Tous vos produits ont un stock suffisant</p>
                    </div>
                ) : (
                    <div>
                        <div style={{ backgroundColor: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                            <p style={{ color: '#C53030', fontSize: '14px' }}>
                                ⚠️ Ces produits ont atteint ou dépassé leur seuil d'alerte. Pensez à les réapprovisionner.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gap: '16px' }}>
                            {lowStockProducts.map((product) => (
                                <div key={product.id_produit} style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', border: product.stock_actuel === 0 ? '2px solid #C53030' : '1px solid #DEE2E6' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50' }}>{product.nom}</h3>
                                                {product.stock_actuel === 0 && (
                                                    <span style={{ padding: '4px 12px', backgroundColor: '#C53030', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px', fontWeight: '600' }}>
                                                        RUPTURE
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6C757D', marginBottom: '16px' }}>
                                                <span>💰 {product.prix_base}€</span>
                                                <span>🏷️ {product.categorie}</span>
                                                {product.matiere && <span>🔧 {product.matiere}</span>}
                                            </div>
                                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                <div style={{ padding: '12px 16px', backgroundColor: '#FFF5F5', borderRadius: '6px', border: '1px solid #FED7D7' }}>
                                                    <span style={{ fontSize: '11px', color: '#C53030', fontWeight: '500', display: 'block' }}>Stock actuel</span>
                                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#C53030' }}>{product.stock_actuel}</div>
                                                </div>
                                                <div style={{ padding: '12px 16px', backgroundColor: '#F8F9FA', borderRadius: '6px', border: '1px solid #DEE2E6' }}>
                                                    <span style={{ fontSize: '11px', color: '#6C757D', fontWeight: '500', display: 'block' }}>Stock minimum</span>
                                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#495057' }}>{product.stock_minimum}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link href={'/products/' + product.id_produit + '/edit'} style={{ padding: '10px 20px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '500', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', transition: 'all 0.2s' }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#23272B'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#343A40'}
                                        >
                                            ✏️ Modifier stock
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
