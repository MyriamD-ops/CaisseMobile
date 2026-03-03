import { Link } from '@inertiajs/react';

export default function Show({ sale }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DEE2E6', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', textDecoration: 'none' }}>CaisseMobile</Link>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#495057' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '32px 24px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '40px', border: '1px solid #DEE2E6', textAlign: 'center' }}>
                        <div style={{ fontSize: '64px', marginBottom: '16px', filter: 'grayscale(100%)' }}>✓</div>
                        <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#2C3E50', marginBottom: '8px' }}>Vente enregistrée !</h2>
                        <p style={{ color: '#6C757D', fontSize: '15px', marginBottom: '32px' }}>Numéro de vente : <strong>{sale.numero_vente}</strong></p>

                        <div style={{ backgroundColor: '#F8F9FA', borderRadius: '8px', padding: '24px', marginBottom: '24px', textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #DEE2E6' }}>
                                <span style={{ color: '#6C757D', fontSize: '14px' }}>Date</span>
                                <span style={{ fontWeight: '500', fontSize: '14px', color: '#2C3E50' }}>
                                    {new Date(sale.created_at).toLocaleDateString('fr-FR', { 
                                        day: '2-digit', 
                                        month: '2-digit', 
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #DEE2E6' }}>
                                <span style={{ color: '#6C757D', fontSize: '14px' }}>Vendeur</span>
                                <span style={{ fontWeight: '500', fontSize: '14px', color: '#2C3E50' }}>{sale.utilisateur.username}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #DEE2E6' }}>
                                <span style={{ color: '#6C757D', fontSize: '14px' }}>Paiement</span>
                                <span style={{ fontWeight: '500', fontSize: '14px', color: '#2C3E50' }}>{sale.moyen_paiement}</span>
                            </div>

                            <div style={{ marginTop: '16px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#2C3E50', marginBottom: '12px' }}>Articles</h3>
                                {sale.lignes.map((ligne, index) => (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                                        <span style={{ color: '#495057' }}>
                                            {ligne.produit.nom} × {ligne.quantite}
                                        </span>
                                        <span style={{ fontWeight: '500', color: '#2C3E50' }}>{ligne.sous_total}€</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '2px solid #DEE2E6', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50' }}>Total</span>
                                <span style={{ fontSize: '24px', fontWeight: '600', color: '#343A40' }}>{sale.montant_total}€</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <Link href="/sales/create" style={{ flex: 1, padding: '12px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '600', borderRadius: '6px', textDecoration: 'none', textAlign: 'center', fontSize: '14px' }}>
                                Nouvelle vente
                            </Link>
                            <Link href="/" style={{ flex: 1, padding: '12px', backgroundColor: '#F8F9FA', color: '#495057', fontWeight: '600', borderRadius: '6px', border: '1px solid #DEE2E6', textDecoration: 'none', textAlign: 'center', fontSize: '14px' }}>
                                Retour au Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
