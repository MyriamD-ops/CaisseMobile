import { Link } from '@inertiajs/react';
import Header from '../../Components/Header';

export default function LowStock({ lowStockProducts }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <Header currentPage="products" />

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
