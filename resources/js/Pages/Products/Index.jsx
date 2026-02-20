import { Link, usePage, router } from '@inertiajs/react';
import Header from '../../Components/Header';

export default function Index({ products, auth }) {
    const { flash } = usePage().props;
    
    const handleDelete = (productId, productName) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer "${productName}" ?`)) {
            router.post(`/products/${productId}`, {
                _method: 'DELETE'
            });
        }
    };
    
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <Header currentPage="products" />

            <main style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#2C3E50', marginBottom: '4px' }}>Produits</h2>
                        <p style={{ color: '#6C757D', fontSize: '14px' }}>{products.length} produit{products.length > 1 ? 's' : ''} au total</p>
                    </div>
                    <Link href="/products/create" style={{ padding: '10px 20px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '500', borderRadius: '6px', textDecoration: 'none', display: 'inline-block', fontSize: '14px', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#23272B'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#343A40'}
                    >
                        + Nouveau produit
                    </Link>
                </div>

                {flash?.success && (
                    <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', color: '#2C3E50', fontSize: '14px' }}>
                        ✓ {flash.success}
                    </div>
                )}

                {products.length === 0 ? (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '64px', textAlign: 'center', border: '1px solid #DEE2E6' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px', filter: 'grayscale(100%)' }}>📦</p>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginBottom: '8px' }}>Aucun produit</h3>
                        <p style={{ color: '#6C757D', marginBottom: '24px', fontSize: '14px' }}>Commencez par ajouter votre premier produit</p>
                        <Link href="/products/create" style={{ padding: '10px 20px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '500', borderRadius: '6px', textDecoration: 'none', display: 'inline-block', fontSize: '14px' }}>Créer un produit</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {products.map((product) => (
                            <div key={product.id_produit} style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px', border: '1px solid #DEE2E6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <Link href={'/products/' + product.id_produit} style={{ textDecoration: 'none' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2C3E50', marginBottom: '8px', cursor: 'pointer', transition: 'color 0.2s' }}
                                            onMouseEnter={(e) => e.target.style.color = '#5D6D7E'}
                                            onMouseLeave={(e) => e.target.style.color = '#2C3E50'}
                                        >
                                            {product.nom}
                                        </h3>
                                    </Link>
                                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6C757D' }}>
                                        <span>💰 {product.prix_base}€</span>
                                        <span>📦 Stock: {product.stock_actuel}</span>
                                        <span>🏷️ {product.categorie}</span>
                                        <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: product.stock_actuel <= product.stock_minimum ? '#FFF5F5' : '#F8F9FA', color: product.stock_actuel <= product.stock_minimum ? '#C53030' : '#495057', fontSize: '12px', fontWeight: '500' }}>
                                            {product.stock_actuel <= product.stock_minimum ? '⚠️ Stock bas' : '✓ Stock OK'}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Link href={'/products/' + product.id_produit + '/edit'} style={{ padding: '8px 14px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: '#495057', textDecoration: 'none', transition: 'all 0.2s' }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#E9ECEF'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#F8F9FA'}
                                    >✏️ Modifier</Link>
                                    <button 
                                        onClick={() => handleDelete(product.id_produit, product.nom)}
                                        style={{ padding: '8px 14px', backgroundColor: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: '#C53030', transition: 'all 0.2s' }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#FEE2E2';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = '#FFF5F5';
                                        }}
                                    >
                                        🗑️ Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}