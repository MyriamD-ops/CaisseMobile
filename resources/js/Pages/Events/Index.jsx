import { Link, router } from '@inertiajs/react';

export default function Index({ evenements }) {
    const handleDelete = (id, nom) => {
        if (confirm(`Supprimer l'événement "${nom}" ?`)) {
            router.post(`/events/${id}/delete`, { _method: 'DELETE' });
        }
    };

    const getStatutBadge = (statut) => {
        const styles = {
            planifie: { bg: '#F8F9FA', color: '#495057', text: '📅 Planifié' },
            en_cours: { bg: '#E8F5E9', color: '#2E7D32', text: '✅ En cours' },
            termine: { bg: '#F5F5F5', color: '#757575', text: '🏁 Terminé' }
        };
        const s = styles[statut] || styles.planifie;
        return <span style={{ padding: '4px 12px', backgroundColor: s.bg, color: s.color, borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>{s.text}</span>;
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DEE2E6', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <Link href="/" style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', textDecoration: 'none' }}>CaisseMobile</Link>
                        <nav style={{ display: 'flex', gap: '16px' }}>
                            <Link href="/" style={{ color: '#6C757D', textDecoration: 'none', fontSize: '14px' }}>Dashboard</Link>
                            <Link href="/products" style={{ color: '#6C757D', textDecoration: 'none', fontSize: '14px' }}>Produits</Link>
                            <Link href="/sales" style={{ color: '#6C757D', textDecoration: 'none', fontSize: '14px' }}>Ventes</Link>
                            <Link href="/events" style={{ color: '#2C3E50', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>Événements</Link>
                        </nav>
                    </div>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#495057' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#2C3E50', marginBottom: '4px' }}>Événements</h2>
                        <p style={{ color: '#6C757D', fontSize: '14px' }}>{evenements.length} événement{evenements.length > 1 ? 's' : ''}</p>
                    </div>
                    <Link href="/events/create" style={{ padding: '10px 20px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '500', borderRadius: '6px', textDecoration: 'none', fontSize: '14px' }}>
                        + Nouvel événement
                    </Link>
                </div>

                {evenements.length === 0 ? (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '64px', textAlign: 'center', border: '1px solid #DEE2E6' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px', filter: 'grayscale(100%)' }}>🎪</p>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginBottom: '8px' }}>Aucun événement</h3>
                        <p style={{ color: '#6C757D', marginBottom: '24px', fontSize: '14px' }}>Créez votre premier événement</p>
                        <Link href="/events/create" style={{ padding: '10px 20px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '500', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', display: 'inline-block' }}>Créer un événement</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {evenements.map((event) => (
                            <div key={event.id_evenement} style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', border: '1px solid #DEE2E6', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', margin: 0 }}>{event.nom}</h3>
                                            {getStatutBadge(event.statut)}
                                        </div>
                                        <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#6C757D', marginBottom: '12px' }}>
                                            <span>📍 {event.lieu || 'Non précisé'}</span>
                                            <span>📅 Du {new Date(event.date_debut).toLocaleDateString('fr-FR')} au {new Date(event.date_fin).toLocaleDateString('fr-FR')}</span>
                                            <span>📦 {event.produits_count} produit{event.produits_count > 1 ? 's' : ''}</span>
                                        </div>
                                        <div style={{ padding: '8px 12px', backgroundColor: '#F8F9FA', borderRadius: '6px', display: 'inline-block' }}>
                                            <span style={{ fontSize: '12px', color: '#6C757D', fontFamily: 'monospace' }}>Code: {event.code_unique}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Link href={`/events/${event.id_evenement}/admin`} style={{ padding: '8px 14px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '13px', color: '#495057', textDecoration: 'none' }}>📱 QR Code</Link>
                                        <Link href={`/events/${event.id_evenement}/edit`} style={{ padding: '8px 14px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '13px', color: '#495057', textDecoration: 'none' }}>✏️ Modifier</Link>
                                        <button onClick={() => handleDelete(event.id_evenement, event.nom)} style={{ padding: '8px 14px', backgroundColor: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: '#C53030' }}>🗑️ Supprimer</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
