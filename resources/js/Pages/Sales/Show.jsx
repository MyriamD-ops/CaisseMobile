import { Link } from '@inertiajs/react';
import Header from '../../Components/Header';

export default function Show({ sale }) {
    return (
        <div className="min-h-screen bg-snow">
            <Header currentPage="sales" />

            <main className="p-4 lg:p-6 max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl border border-slate/20 shadow-sm p-6 lg:p-8 text-center">
                    {/* Icône succès */}
                    <div className="w-16 h-16 rounded-full bg-mint/10 border border-mint/20 flex items-center justify-center text-3xl mx-auto mb-4">
                        ✓
                    </div>
                    <h2 className="text-2xl font-bold text-dark mb-1">Vente enregistrée !</h2>
                    <p className="text-slate text-sm mb-6">
                        Numéro de vente : <span className="font-semibold text-dark">{sale.numero_vente}</span>
                    </p>

                    {/* Récapitulatif */}
                    <div className="bg-snow rounded-xl border border-slate/20 p-5 mb-6 text-left">
                        <div className="divide-y divide-slate/10">
                            <div className="flex justify-between items-center py-2.5">
                                <span className="text-sm text-slate">Date</span>
                                <span className="text-sm font-medium text-dark">
                                    {new Date(sale.created_at).toLocaleDateString('fr-FR', {
                                        day: '2-digit', month: '2-digit', year: 'numeric',
                                        hour: '2-digit', minute: '2-digit',
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2.5">
                                <span className="text-sm text-slate">Vendeur</span>
                                <span className="text-sm font-medium text-dark">{sale.utilisateur.username}</span>
                            </div>
                            <div className="flex justify-between items-center py-2.5">
                                <span className="text-sm text-slate">Paiement</span>
                                <span className="text-sm font-medium text-dark">{sale.moyen_paiement}</span>
                            </div>
                        </div>

                        {/* Articles */}
                        <div className="mt-4 pt-4 border-t border-slate/10">
                            <p className="text-xs font-semibold text-dark uppercase tracking-widest mb-3">Articles</p>
                            <div className="space-y-2">
                                {sale.lignes.map((ligne, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm">
                                        <span className="text-slate">{ligne.produit.nom} × {ligne.quantite}</span>
                                        <span className="font-medium text-dark">{ligne.sous_total}€</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Total */}
                        <div className="mt-4 pt-4 border-t-2 border-slate/20 flex justify-between items-center">
                            <span className="text-base font-semibold text-dark">Total</span>
                            <span className="text-2xl font-bold text-ember">{sale.montant_total}€</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Link
                            href="/sales/create"
                            className="flex-1 h-11 flex items-center justify-center bg-linear-to-r from-ember to-ember-dim hover:brightness-90 text-white font-bold rounded-xl text-sm transition-all"
                        >
                            Nouvelle vente
                        </Link>
                        <Link
                            href="/"
                            className="flex-1 h-11 flex items-center justify-center bg-slate/10 hover:bg-slate/20 text-slate hover:text-dark border border-slate/20 rounded-xl text-sm font-medium transition-colors"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
