import { Link } from '@inertiajs/react';
import useOnlineStatus from '../Hooks/useOnlineStatus';

export default function Header({ currentPage = 'dashboard' }) {
    const isOnline = useOnlineStatus();
    
    const navItems = [
        { name: 'Dashboard', href: '/', key: 'dashboard' },
        { name: 'Produits', href: '/products', key: 'products' },
        { name: 'Ventes', href: '/sales', key: 'sales' },
        { name: 'Événements', href: '/events', key: 'events' }
    ];

    return (
        <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DEE2E6', padding: '16px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <Link href="/" style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', textDecoration: 'none' }}>
                        CaisseMobile
                    </Link>
                    <nav style={{ display: 'flex', gap: '16px' }}>
                        {navItems.map((item) => (
                            <Link 
                                key={item.key}
                                href={item.href} 
                                style={{ 
                                    color: currentPage === item.key ? '#2C3E50' : '#6C757D',
                                    fontWeight: currentPage === item.key ? '600' : '400',
                                    textDecoration: 'none', 
                                    fontSize: '14px', 
                                    transition: 'color 0.2s' 
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#2C3E50'}
                                onMouseLeave={(e) => {
                                    if (currentPage !== item.key) {
                                        e.target.style.color = '#6C757D';
                                    }
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {/* Indicateur de connexion */}
                    <div style={{ 
                        padding: '6px 12px', 
                        backgroundColor: isOnline ? '#E8F5E9' : '#FFF5F5',
                        color: isOnline ? '#2E7D32' : '#C53030',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <span style={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: isOnline ? '#2E7D32' : '#C53030' 
                        }}></span>
                        {isOnline ? 'En ligne' : 'Hors ligne'}
                    </div>
                    
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
            </div>
        </header>
    );
}
