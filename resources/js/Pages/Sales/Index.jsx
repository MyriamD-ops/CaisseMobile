import { Link } from '@inertiajs/react';
import Header from '../../Components/Header';

export default function Index({ sales }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <Header currentPage="sales" />

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

                {(!sales.data || sales.data.length === 0) ? (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '64px', textAlign: 'center', border: '1px solid #DEE2E6' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px', filter: 'grayscale(100%)' }}>🛍️</p>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginBottom: '8px' }}>Aucune vente</h3>
                        <p style={{ color: '#6C757D', marginBottom: '24px', fontSize: '14px' }}>Les ventes apparaîtront ici</p>
                        <Link href="/sales/create" style={{ padding: '10px 20px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '500', borderRadius: '6px', textDecoration: 'none', display: 'inline-block', fontSize: '14px' }}>Nouvelle vente</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {sales.data.map((sale) => (
                            <div key={sale.id_vente} style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', border: '1px solid #DEE2E6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}
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
                                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2C3E50', marginBottom: '8px' }}>
                                        Vente {sale.numero_vente}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#6C757D' }}>
                                        <span>📅 {new Date(sale.date_vente).toLocaleDateString('fr-FR')} à {new Date(sale.date_vente).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span>👤 {sale.utilisateur?.username || 'N/A'}</span>
                                        <span>💳 {sale.mode_paiement}</span>
                                        <span style={{ fontWeight: '600', color: '#2C3E50' }}>💰 {parseFloat(sale.montant_total).toFixed(2)}€</span>
                                    </div>
                                </div>
                                <Link href={`/sales/${sale.id_vente}`} style={{ padding: '8px 14px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '13px', color: '#495057', textDecoration: 'none', transition: 'all 0.2s' }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#E9ECEF'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#F8F9FA'}
                                >
                                    📄 Détails
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {sales.links && (
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        {sales.links.map((link, index) => (
                            link.url ? (
                                <Link 
                                    key={index}
                                    href={link.url} 
                                    style={{ 
                                        padding: '8px 12px', 
                                        backgroundColor: link.active ? '#343A40' : '#F8F9FA',
                                        color: link.active ? '#FFFFFF' : '#495057',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontSize: '13px'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span 
                                    key={index}
                                    style={{ 
                                        padding: '8px 12px', 
                                        backgroundColor: '#F8F9FA',
                                        color: '#ADB5BD',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: '6px',
                                        fontSize: '13px'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}