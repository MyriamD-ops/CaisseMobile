import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import useOnlineStatus from '../../Hooks/useOnlineStatus';
import { getVentesNonSync, syncVentes } from '../../utils/sync';

export default function Index({ sales }) {
    const isOnline = useOnlineStatus();
    const [ventesLocales, setVentesLocales] = useState([]);
    const [syncing, setSyncing] = useState(false);

    // Charger les ventes locales au montage
    useEffect(() => {
        loadVentesLocales();
    }, []);

    // Synchroniser automatiquement quand en ligne ET qu'il y a des ventes locales
    useEffect(() => {
        if (isOnline && ventesLocales.length > 0 && !syncing) {
            console.log('🔄 Synchronisation automatique déclenchée');
            handleSync();
        }
    }, [isOnline, ventesLocales.length]);

    const loadVentesLocales = async () => {
        try {
            const ventes = await getVentesNonSync();
            console.log(`📦 ${ventes.length} ventes locales trouvées`);
            setVentesLocales(ventes);
        } catch (error) {
            console.error('Erreur chargement ventes locales:', error);
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            const count = await syncVentes();
            if (count > 0) {
                alert(`✅ ${count} vente(s) synchronisée(s) !`);
                // Recharger la page pour voir les ventes serveur
                window.location.reload();
            }
        } catch (error) {
            console.error('Erreur sync:', error);
        } finally {
            setSyncing(false);
        }
    };

    const serverSales = sales.data || [];
    const totalVentes = serverSales.length + ventesLocales.length;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <Header currentPage="sales" />

            <main style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#2C3E50', marginBottom: '4px' }}>Historique des ventes</h2>
                        <p style={{ color: '#6C757D', fontSize: '14px' }}>
                            {totalVentes} vente{totalVentes > 1 ? 's' : ''}
                            {ventesLocales.length > 0 && ` • ${ventesLocales.length} non synchronisée${ventesLocales.length > 1 ? 's' : ''}`}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {ventesLocales.length > 0 && isOnline && (
                            <button
                                onClick={handleSync}
                                disabled={syncing}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: syncing ? '#ADB5BD' : '#28A745',
                                    color: '#FFFFFF',
                                    fontWeight: '500',
                                    borderRadius: '6px',
                                    border: 'none',
                                    cursor: syncing ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {syncing ? '⏳ Synchronisation...' : '🔄 Synchroniser maintenant'}
                            </button>
                        )}
                        <Link href="/sales/create" style={{ padding: '10px 20px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '500', borderRadius: '6px', textDecoration: 'none', display: 'inline-block', fontSize: '14px', transition: 'all 0.2s' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#23272B'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#343A40'}
                        >
                            + Nouvelle vente
                        </Link>
                    </div>
                </div>

                {totalVentes === 0 ? (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '64px', textAlign: 'center', border: '1px solid #DEE2E6' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px', filter: 'grayscale(100%)' }}>🛍️</p>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginBottom: '8px' }}>Aucune vente</h3>
                        <p style={{ color: '#6C757D', marginBottom: '24px', fontSize: '14px' }}>Les ventes apparaîtront ici</p>
                        <Link href="/sales/create" style={{ padding: '10px 20px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '500', borderRadius: '6px', textDecoration: 'none', display: 'inline-block', fontSize: '14px' }}>Nouvelle vente</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {/* Ventes locales non synchronisées */}
                        {ventesLocales.map((vente) => (
                            <div key={`local-${vente.id}`} style={{ backgroundColor: '#FFFBEB', borderRadius: '8px', padding: '24px', border: '2px solid #FDB022', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2C3E50', margin: 0 }}>
                                            Vente locale #{vente.id}
                                        </h3>
                                        <span style={{ padding: '4px 12px', backgroundColor: '#FFF5E1', color: '#E65100', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                                            ⏳ Non synchronisée
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#6C757D' }}>
                                        <span>📅 {new Date(vente.date_vente).toLocaleDateString('fr-FR')} à {new Date(vente.date_vente).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span>💳 {vente.mode_paiement}</span>
                                        <span style={{ fontWeight: '600', color: '#2C3E50' }}>💰 {parseFloat(vente.montant_total).toFixed(2)}€</span>
                                        <span style={{ fontSize: '13px' }}>📦 {vente.articles?.length || 0} article{vente.articles?.length > 1 ? 's' : ''}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Ventes serveur synchronisées */}
                        {serverSales.map((sale) => (
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
                                <Link key={index} href={link.url} style={{ padding: '8px 12px', backgroundColor: link.active ? '#343A40' : '#F8F9FA', color: link.active ? '#FFFFFF' : '#495057', border: '1px solid #DEE2E6', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }} dangerouslySetInnerHTML={{ __html: link.label }} />
                            ) : (
                                <span key={index} style={{ padding: '8px 12px', backgroundColor: '#F8F9FA', color: '#ADB5BD', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '13px' }} dangerouslySetInnerHTML={{ __html: link.label }} />
                            )
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
