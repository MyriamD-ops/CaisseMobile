import { Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            {/* Header */}
            <header style={{
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid #DEE2E6',
                padding: '16px 24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                    <h1 style={{ 
                        fontSize: '20px', 
                        fontWeight: '600', 
                        color: '#2C3E50',
                        margin: 0
                    }}>
                        CaisseMobile
                    </h1>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#F8F9FA',
                            border: '1px solid #DEE2E6',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: '#495057',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#E9ECEF';
                            e.target.style.borderColor = '#ADB5BD';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#F8F9FA';
                            e.target.style.borderColor = '#DEE2E6';
                        }}
                    >
                        Déconnexion
                    </Link>
                </div>
            </header>

            {/* Contenu */}
            <main style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
                {/* En-tête */}
                <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ 
                        fontSize: '28px', 
                        fontWeight: '600', 
                        color: '#2C3E50',
                        marginBottom: '4px'
                    }}>
                        Dashboard
                    </h2>
                    <p style={{ color: '#6C757D', fontSize: '15px' }}>
                        Bienvenue {auth.user?.username}
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '40px'
                }}>
                    {[
                        { title: 'Produits', value: '247', icon: '📦' },
                        { title: 'Stock Bas', value: '8', icon: '⚠️' },
                        { title: 'Ventes du jour', value: '23', icon: '🛒' },
                        { title: 'Montant du jour', value: '1 447€', icon: '💰' },
                    ].map((card, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '8px',
                                padding: '24px',
                                border: '1px solid #DEE2E6',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div style={{ flex: 1 }}>
                                    <p style={{ 
                                        fontSize: '13px', 
                                        color: '#6C757D', 
                                        fontWeight: '500', 
                                        marginBottom: '8px'
                                    }}>
                                        {card.title}
                                    </p>
                                    <p style={{ 
                                        fontSize: '32px', 
                                        fontWeight: '600', 
                                        color: '#2C3E50',
                                        margin: 0
                                    }}>
                                        {card.value}
                                    </p>
                                </div>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    backgroundColor: '#F8F9FA',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    filter: 'grayscale(100%)'
                                }}>
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions rapides */}
                <div>
                    <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        color: '#2C3E50', 
                        marginBottom: '20px'
                    }}>
                        Actions rapides
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px'
                    }}>
                        <Link
                            href="/sales/create"
                            style={{
                                padding: '24px',
                                backgroundColor: '#343A40',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '15px',
                                fontWeight: '500',
                                color: '#FFFFFF',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                border: 'none'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#23272B';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(52, 58, 64, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#343A40';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <span style={{ fontSize: '32px', filter: 'grayscale(100%)' }}>🛒</span>
                            <span>Nouvelle vente</span>
                        </Link>
                        
                        <Link
                            href="/products/create"
                            style={{
                                padding: '24px',
                                backgroundColor: '#FFFFFF',
                                border: '2px solid #DEE2E6',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '15px',
                                fontWeight: '500',
                                color: '#495057',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#F8F9FA';
                                e.target.style.borderColor = '#ADB5BD';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#FFFFFF';
                                e.target.style.borderColor = '#DEE2E6';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            <span style={{ fontSize: '32px', filter: 'grayscale(100%)' }}>📦</span>
                            <span>Ajouter produit</span>
                        </Link>
                        
                        <Link
                            href="/products/low-stock"
                            style={{
                                padding: '24px',
                                backgroundColor: '#FFFFFF',
                                border: '2px solid #DEE2E6',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '15px',
                                fontWeight: '500',
                                color: '#495057',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#F8F9FA';
                                e.target.style.borderColor = '#ADB5BD';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#FFFFFF';
                                e.target.style.borderColor = '#DEE2E6';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            <span style={{ fontSize: '32px', filter: 'grayscale(100%)' }}>⚠️</span>
                            <span>Alertes stock</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
