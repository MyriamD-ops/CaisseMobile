import { Link } from '@inertiajs/react';

export default function LowStock({ products }) {
    const lowStockProducts = products.filter(p => p.stock_actuel <= p.stock_minimum);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui' }}>
            <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#f43f5e', textDecoration: 'none' }}>Atelier Doré</Link>
                        <nav style={{ display: 'flex', gap: '16px' }}>
                            <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Dashboard</Link>
                            <Link href="/products" style={{ color: '#6b7280', textDecoration: 'none' }}>Produits</Link>
                            <Link href="/products/low-stock" style={{ color: '#f43f5e', fontWeight: '600', textDecoration: 'none' }}>Alertes stock</Link>
                        </nav>
                    </div>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <div>
                            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>⚠️ Alertes stock</h2>
                            <p style={{ color: '#6b7280', marginTop: '8px' }}>{lowStockProducts.length} produit{lowStockProducts.length > 1 ? 's' : ''} en stock bas</p>
                        </div>
                        <Link href="/products" style={{ padding: '12px 24px', backgroundColor: '#f3f4f6', color: '#374151', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>
                            Tous les produits
                        </Link>
                    </div>

                    {lowStockProducts.length === 0 ? (
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '64px', textAlign: 'center', border: '2px dashed #e5e7eb' }}>
                            <p style={{ fontSize: '48px', marginBottom: '16px' }}>✅</p>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Aucune alerte stock</h3>
                            <p style={{ color: '#6b7280', marginBottom: '24px' }}>Tous vos produits ont un stock suffisant</p>
                        </div>
                    ) : (
                        <div>
                            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
                                <p style={{ color: '#991b1b', fontSize: '14px' }}>
                                    ⚠️ Ces produits ont atteint ou dépassé leur seuil d'alerte. Pensez à les réapprovisionner.
                                </p>
                            </div>

                            <div style={{ display: 'grid', gap: '16px' }}>
                                {lowStockProducts.map((product) => (
                                    <div key={product.id_produit} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '2px solid #fecaca' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>{product.nom}</h3>
                                                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                                                    <span>💰 {product.prix_base}€</span>
                                                    <span>🏷️ {product.categorie}</span>
                                                    {product.matiere && <span>🔧 {product.matiere}</span>}
                                                </div>
                                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                    <div style={{ padding: '8px 16px', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
                                                        <span style={{ fontSize: '12px', color: '#991b1b', fontWeight: '500' }}>Stock actuel</span>
                                                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#991b1b' }}>{product.stock_actuel}</div>
                                                    </div>
                                                    <div style={{ padding: '8px 16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                                                        <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Stock minimum</span>
                                                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#374151' }}>{product.stock_minimum}</div>
                                                    </div>
                                                    {product.stock_actuel === 0 && (
                                                        <div style={{ padding: '8px 16px', backgroundColor: '#991b1b', borderRadius: '8px' }}>
                                                            <span style={{ fontSize: '14px', color: 'white', fontWeight: 'bold' }}>🚨 RUPTURE</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <Link href={'/products/' + product.id_produit + '/edit'} style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151', textDecoration: 'none' }}>
                                                    ✏️ Modifier stock
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
