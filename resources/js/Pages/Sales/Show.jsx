import { Link } from '@inertiajs/react';

export default function Show({ sale }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui' }}>
            <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#f43f5e', textDecoration: 'none' }}>Atelier Doré</Link>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '24px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {/* Message de succès */}
                    <div style={{ backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '12px', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534', marginBottom: '8px' }}>Vente enregistrée avec succès !</h2>
                        <p style={{ color: '#166534' }}>Numéro de vente : <strong>{sale.numero_vente}</strong></p>
                    </div>

                    {/* Détails de la vente */}
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>Détails de la vente</h3>

                        <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ color: '#6b7280' }}>Date</span>
                                <span style={{ fontWeight: '500' }}>{new Date(sale.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ color: '#6b7280' }}>Vendeur</span>
                                <span style={{ fontWeight: '500' }}>{sale.utilisateur?.username || 'Inconnu'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ color: '#6b7280' }}>Moyen de paiement</span>
                                <span style={{ fontWeight: '500' }}>{sale.moyen_paiement}</span>
                            </div>
                        </div>

                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Articles vendus</h4>
                        <div style={{ marginBottom: '24px' }}>
                            {sale.lignes?.map((ligne, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                    <div>
                                        <span style={{ fontWeight: '500' }}>{ligne.produit?.nom || 'Produit inconnu'}</span>
                                        <span style={{ color: '#6b7280', marginLeft: '8px' }}>x {ligne.quantite}</span>
                                    </div>
                                    <span style={{ fontWeight: '600' }}>{(ligne.prix_unitaire * ligne.quantite).toFixed(2)}€</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Total</span>
                            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#f43f5e' }}>{parseFloat(sale.montant_total).toFixed(2)}€</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Link href="/sales/create" style={{ padding: '16px', background: 'linear-gradient(to right, #f43f5e, #fbbf24)', color: 'white', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', textAlign: 'center' }}>
                            🛒 Nouvelle vente
                        </Link>
                        <Link href="/" style={{ padding: '16px', backgroundColor: '#f3f4f6', color: '#374151', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', textAlign: 'center' }}>
                            🏠 Retour au Dashboard
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
