import { Link, usePage } from '@inertiajs/react';

export default function Index({ products, auth }) {
    const { flash } = usePage().props;
    
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui' }}>
            <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#f43f5e', textDecoration: 'none' }}>Atelier Doré</Link>
                        <nav style={{ display: 'flex', gap: '16px' }}>
                            <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Dashboard</Link>
                            <Link href="/products" style={{ color: '#f43f5e', fontWeight: '600', textDecoration: 'none' }}>Produits</Link>
                        </nav>
                    </div>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <div>
                            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>Produits</h2>
                            <p style={{ color: '#6b7280', marginTop: '8px' }}>{products.length} produit{products.length > 1 ? 's' : ''} au total</p>
                        </div>
                        <Link href="/products/create" style={{ padding: '12px 24px', background: 'linear-gradient(to right, #f43f5e, #fbbf24)', color: 'white', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>+ Nouveau produit</Link>
                    </div>

                    {flash?.success && (
                        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', fontSize: '14px' }}>
                            ✓ {flash.success}
                        </div>
                    )}

                    {products.length === 0 ? (
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '64px', textAlign: 'center', border: '2px dashed #e5e7eb' }}>
                            <p style={{ fontSize: '48px', marginBottom: '16px' }}>📦</p>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Aucun produit</h3>
                            <p style={{ color: '#6b7280', marginBottom: '24px' }}>Commencez par ajouter votre premier produit</p>
                            <Link href="/products/create" style={{ padding: '12px 24px', background: 'linear-gradient(to right, #f43f5e, #fbbf24)', color: 'white', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>Créer un produit</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '16px' }}>
                            {products.map((product) => (
                                <div key={product.id_produit} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>{product.nom}</h3>
                                        <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
                                            <span>💰 {product.prix_base}€</span>
                                            <span>📦 Stock: {product.stock_actuel}</span>
                                            <span>🏷️ {product.categorie}</span>
                                            <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: product.stock_actuel <= product.stock_minimum ? '#fef2f2' : '#f0fdf4', color: product.stock_actuel <= product.stock_minimum ? '#991b1b' : '#166534' }}>
                                                {product.stock_actuel <= product.stock_minimum ? '⚠️ Stock bas' : '✓ Stock OK'}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Link href={'/products/' + product.id_produit} style={{ padding: '8px 16px', backgroundColor: '#eff6ff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#1e40af', textDecoration: 'none' }}>📱 QR Code</Link>
                                        <Link href={'/products/' + product.id_produit + '/edit'} style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151', textDecoration: 'none' }}>✏️ Modifier</Link>
                                        <Link 
                                            href={'/products/' + product.id_produit} 
                                            method="delete" 
                                            as="button"
                                            onBefore={() => {
                                                return confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');
                                            }}
                                            style={{ padding: '8px 16px', backgroundColor: '#fef2f2', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#991b1b' }}
                                        >
                                            🗑️ Supprimer
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
