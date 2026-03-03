export default function Public({ evenement }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            {/* Header simple */}
            <header style={{ backgroundColor: '#343A40', color: '#FFFFFF', padding: '24px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '600', margin: 0, marginBottom: '8px' }}>{evenement.nom}</h1>
                <p style={{ fontSize: '15px', opacity: 0.9, margin: 0 }}>
                    📍 {evenement.lieu} • 📅 {evenement.date_debut} - {evenement.date_fin}
                </p>
            </header>

            {/* Catalogue produits */}
            <main style={{ padding: '32px 16px', maxWidth: '1200px', margin: '0 auto' }}>
                {evenement.description && (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px', marginBottom: '24px', border: '1px solid #DEE2E6' }}>
                        <p style={{ fontSize: '15px', color: '#495057', margin: 0 }}>{evenement.description}</p>
                    </div>
                )}

                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', marginBottom: '16px' }}>
                    Nos produits disponibles ({evenement.produits.length})
                </h2>

                {evenement.produits.length === 0 ? (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '64px', textAlign: 'center', border: '1px solid #DEE2E6' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px', filter: 'grayscale(100%)' }}>📦</p>
                        <p style={{ color: '#6C757D', fontSize: '16px' }}>Aucun produit disponible pour le moment</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {evenement.produits.map((produit) => (
                            <div key={produit.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #DEE2E6', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}>
                                
                                {/* Badge disponibilité */}
                                <div style={{ marginBottom: '12px' }}>
                                    {produit.disponible ? (
                                        <span style={{ padding: '4px 12px', backgroundColor: '#E8F5E9', color: '#2E7D32', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                                            ✓ Disponible
                                        </span>
                                    ) : (
                                        <span style={{ padding: '4px 12px', backgroundColor: '#FFEBEE', color: '#C62828', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                                            ✗ Rupture
                                        </span>
                                    )}
                                </div>

                                {/* Nom produit */}
                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginBottom: '8px' }}>{produit.nom}</h3>

                                {/* Description */}
                                {produit.description && (
                                    <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '12px', lineHeight: '1.5' }}>{produit.description}</p>
                                )}

                                {/* Infos produit */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '13px', color: '#6C757D' }}>
                                    {produit.categorie && <span>🏷️ {produit.categorie}</span>}
                                    {produit.matiere && <span>🔧 {produit.matiere}</span>}
                                    {produit.disponible && <span>📦 {produit.stock_evenement} en stock</span>}
                                </div>

                                {/* Prix */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #DEE2E6' }}>
                                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#343A40' }}>{produit.prix}€</span>
                                    {!produit.disponible && (
                                        <span style={{ fontSize: '12px', color: '#C62828', fontWeight: '500' }}>Plus disponible</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#343A40', color: '#FFFFFF', padding: '24px', textAlign: 'center', marginTop: '48px' }}>
                <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>
                    Powered by CaisseMobile
                </p>
            </footer>
        </div>
    );
}