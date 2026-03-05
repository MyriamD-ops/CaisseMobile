import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import useOnlineStatus from '../../Hooks/useOnlineStatus';
import { getVentesNonSync, syncVentes } from '../../utils/sync';

export default function Index({ sales }) {
    const isOnline = useOnlineStatus();
    const [ventesLocales, setVentesLocales] = useState([]);
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        loadVentesLocales();
    }, []);

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
        <div className="min-h-screen bg-snow">
            <Header currentPage="sales" />

            <main className="p-4 lg:p-6 max-w-7xl mx-auto">

                {/* En-tête */}
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-dark">Historique des ventes</h2>
                        <p className="text-slate text-sm mt-1">
                            {totalVentes} vente{totalVentes > 1 ? 's' : ''}
                            {ventesLocales.length > 0 && (
                                <span className="ml-1 text-ember">
                                    • {ventesLocales.length} non synchronisée{ventesLocales.length > 1 ? 's' : ''}
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                        {ventesLocales.length > 0 && isOnline && (
                            <button
                                onClick={handleSync}
                                disabled={syncing}
                                className="h-11 px-5 bg-mint/10 hover:bg-mint/20 text-mint border border-mint/30 font-medium rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {syncing ? '⏳ Synchronisation...' : '🔄 Synchroniser'}
                            </button>
                        )}
                        <Link
                            href="/sales/create"
                            className="h-11 px-5 flex items-center bg-ember hover:bg-ember-dim text-white font-bold rounded-xl text-sm transition-colors"
                        >
                            + Nouvelle vente
                        </Link>
                    </div>
                </div>

                {/* État vide */}
                {totalVentes === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate/20 p-12 text-center">
                        <p className="text-5xl mb-4 grayscale">🛍️</p>
                        <h3 className="text-lg font-semibold text-dark mb-2">Aucune vente</h3>
                        <p className="text-slate text-sm mb-6">Les ventes apparaîtront ici</p>
                        <Link
                            href="/sales/create"
                            className="inline-flex items-center justify-center h-11 px-6 bg-ember hover:bg-ember-dim text-white font-bold rounded-xl text-sm transition-colors"
                        >
                            Nouvelle vente
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">

                        {/* Ventes locales non synchronisées */}
                        {ventesLocales.map((vente) => (
                            <div key={`local-${vente.id}`} className="bg-white rounded-2xl border-2 border-ember/40 p-5 flex justify-between items-center shadow-sm">
                                <div className="flex-1">
                                    <div className="flex gap-3 items-center mb-2">
                                        <h3 className="text-base font-semibold text-dark">
                                            Vente locale #{vente.id}
                                        </h3>
                                        <span className="px-2.5 py-1 bg-ember/5 text-ember border border-ember/30 rounded-full text-xs font-semibold">
                                            ⏳ Non synchronisée
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-slate">
                                        <span>📅 {new Date(vente.date_vente).toLocaleDateString('fr-FR')} à {new Date(vente.date_vente).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span>💳 {vente.mode_paiement}</span>
                                        <span className="font-semibold text-dark">💰 {parseFloat(vente.montant_total).toFixed(2)}€</span>
                                        <span>📦 {vente.articles?.length || 0} article{vente.articles?.length > 1 ? 's' : ''}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Ventes serveur */}
                        {serverSales.map((sale) => (
                            <div key={sale.id_vente} className="bg-white rounded-2xl border border-slate/20 p-5 flex justify-between items-center hover:border-slate/40 hover:shadow-sm transition-all">
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-dark mb-2">
                                        Vente {sale.numero_vente}
                                    </h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-slate">
                                        <span>📅 {new Date(sale.date_vente).toLocaleDateString('fr-FR')} à {new Date(sale.date_vente).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span>👤 {sale.utilisateur?.username || 'N/A'}</span>
                                        <span>💳 {sale.mode_paiement}</span>
                                        <span className="font-semibold text-dark">💰 {parseFloat(sale.montant_total).toFixed(2)}€</span>
                                    </div>
                                </div>
                                <Link
                                    href={`/sales/${sale.id_vente}`}
                                    className="shrink-0 h-9 px-4 flex items-center bg-slate/10 hover:bg-slate/20 text-slate hover:text-dark border border-slate/20 rounded-xl text-sm font-medium transition-colors"
                                >
                                    📄 Détails
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {sales.links && (
                    <div className="mt-6 flex justify-center gap-2">
                        {sales.links.map((link, index) => (
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                                        link.active
                                            ? 'bg-ember text-white border-ember'
                                            : 'bg-white text-slate border-slate/20 hover:border-slate/40'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="px-3 py-2 rounded-lg text-sm border border-slate/20 bg-white text-slate/40"
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
