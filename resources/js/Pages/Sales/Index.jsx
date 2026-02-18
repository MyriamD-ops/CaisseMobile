import { Link } from '@inertiajs/react';

export default function Index({ sales }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DEE2E6', padding: '16px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <Link href="/" style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', textDecoration: 'none' }}>CaisseMobile</Link>
                        <nav style={{ display: 'flex', gap: '16px' }}>
                            <Link href="/" style={{ color: '#6C757D', textDecoration: 'none', fontSize: '14px' }}>Dashboard</Link>
                            <Link href="/sales" style={{ color: '#2C3E50', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>Ventes</Link>
                        </nav>
                    </div>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#495057' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#2C3E50', marginBottom: '4px' }}>Historique des ventes</h2>
                        <p style={{ color: '#6C757D', fontSize: '14px' }}>{sales.data?.length || 0} vente{(sales.data?.length > 1) ? 's' : ''}</p>
                    </div>
                    <Link href="/sales/create" style={{ padding: '10px 20px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '500', borderRadius: '6px', textDecoration: 'none', display: 'inline-block', fontSize: '14px', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#23272B'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#343A40'}
                    >
                        + Nouvelle vente
                    </Link>
                </div>

                {!sales.data || sales.data.length === 0 ? (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '64px', textAlign: 'center', border: '1px solid #DEE2E6' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px', filter: 'grayscale(100%)' }}>🛒</p>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginBottom: '8px' }}>Aucune vente</h3>
                        <p style={{ color: '#6C757D', marginBottom: '24px', fontSize: '14px' }}>Commencez par créer votre première vente</p>
                        <Link href="/sales/create" style={{ padding: '10px 20px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '500', borderRadius: '6px', textDecoration: 'none', display: 'inline-block', fontSize: '14px' }}>Nouvelle vente</Link>
                    </div>
                ) : (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #DEE2E6', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #DEE2E6' }}>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#495057' }}>N° Vente</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#495057' }}>Date</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#495057' }}>Paiement</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#495057' }}>Vendeur</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#495057' }}>Montant</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#495057' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.data.map((sale) => (
                                    <tr key={sale.id_vente} style={{ borderBottom: '1px solid #DEE2E6' }}>
                                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#2C3E50', fontFamily: 'monospace' }}>{sale.numero_vente}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#495057' }}>
                                            {new Date(sale.created_at).toLocaleDateString('fr-FR', { 
                                                day: '2-digit', 
                                                month: '2-digit', 
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#495057' }}>{sale.moyen_paiement}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#495057' }}>{sale.utilisateur.username}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '16px', fontWeight: '600', color: '#2C3E50', textAlign: 'right' }}>{sale.montant_total}€</td>
                                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                            <Link href={'/sales/' + sale.id_vente} style={{ padding: '6px 12px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '13px', color: '#495057', textDecoration: 'none', transition: 'all 0.2s' }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#E9ECEF'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = '#F8F9FA'}
                                            >
                                                Détails
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
