import { Link } from '@inertiajs/react';

export default function Index({ sales }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui' }}>
            <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#f43f5e', textDecoration: 'none' }}>Atelier Doré</Link>
                        <nav style={{ display: 'flex', gap: '16px' }}>
                            <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Dashboard</Link>
                            <Link href="/products" style={{ color: '#6b7280', textDecoration: 'none' }}>Produits</Link>
                            <Link href="/sales" style={{ color: '#f43f5e', fontWeight: '600', textDecoration: 'none' }}>Ventes</Link>
                        </nav>
                    </div>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <div>
                            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>Historique des ventes</h2>
                            <p style={{ color: '#6b7280', marginTop: '8px' }}>{sales.data?.length || 0} vente{sales.data?.length > 1 ? 's' : ''}</p>
                        </div>
                        <Link href="/sales/create" style={{ padding: '12px 24px', background: 'linear-gradient(to right, #f43f5e, #fbbf24)', color: 'white', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>
                            🛒 Nouvelle vente
                        </Link>
                    </div>

                    {sales.data?.length === 0 ? (
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '64px', textAlign: 'center', border: '2px dashed #e5e7eb' }}>
                            <p style={{ fontSize: '48px', marginBottom: '16px' }}>💰</p>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Aucune vente</h3>
                            <p style={{ color: '#6b7280', marginBottom: '24px' }}>Commencez par enregistrer votre première vente</p>
                            <Link href="/sales/create" style={{ padding: '12px 24px', background: 'linear-gradient(to right, #f43f5e, #fbbf24)', color: 'white', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>
                                Créer une vente
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '16px' }}>
                            {sales.data.map((sale) => (
                                <div key={sale.id_vente} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>{sale.numero_vente}</h3>
                                            <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
                                                <span>📅 {new Date(sale.created_at).toLocaleDateString('fr-FR')}</span>
                                                <span>💳 {sale.moyen_paiement}</span>
                                                <span>👤 {sale.utilisateur?.username}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f43f5e', marginBottom: '8px' }}>{parseFloat(sale.montant_total).toFixed(2)}€</div>
                                            <Link href={'/sales/' + sale.id_vente} style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151', textDecoration: 'none' }}>
                                                👁️ Détails
                                            </Link>
                                        </div>
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
