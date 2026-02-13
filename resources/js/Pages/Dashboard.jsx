import { Link, useForm } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post('/logout');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui' }}>
            {/* Header */}
            <header style={{
                backgroundColor: 'white',
                borderBottom: '1px solid #e5e7eb',
                padding: '16px 24px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f43f5e' }}>
                        Atelier Doré
                    </h1>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#f3f4f6',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: '#374151'
                        }}
                    >
                        Déconnexion
                    </button>
                </div>
            </header>

            {/* Contenu */}
            <main style={{ padding: '24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>
                            Dashboard
                        </h2>
                        <p style={{ color: '#6b7280', marginTop: '8px' }}>
                            Bienvenue {auth.user?.username} ! 👋
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '24px'
                    }}>
                        {[
                            { title: 'Produits', value: '247', icon: '📦', color: '#3b82f6' },
                            { title: 'Stock Bas', value: '8', icon: '⚠️', color: '#f97316' },
                            { title: 'Ventes du jour', value: '23', icon: '🛒', color: '#10b981' },
                            { title: 'Montant du jour', value: '1447€', icon: '💰', color: '#f43f5e' },
                        ].map((card, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    padding: '24px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    border: '1px solid #f3f4f6'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div>
                                        <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500', marginBottom: '8px' }}>
                                            {card.title}
                                        </p>
                                        <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>
                                            {card.value}
                                        </p>
                                    </div>
                                    <div style={{
                                        fontSize: '32px',
                                        padding: '12px',
                                        backgroundColor: `${card.color}15`,
                                        borderRadius: '12px'
                                    }}>
                                        {card.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions rapides */}
                    <div style={{ marginTop: '32px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                            Actions rapides
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <Link
                                href="/sales/create"
                                style={{
                                    padding: '20px',
                                    background: 'linear-gradient(to right, #f43f5e, #fbbf24)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textDecoration: 'none'
                                }}
                            >
                                <span style={{ fontSize: '28px' }}>🛒</span>
                                Nouvelle vente
                            </Link>
                            
                            <Link
                                href="/products/create"
                                style={{
                                    padding: '20px',
                                    background: 'white',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textDecoration: 'none'
                                }}
                            >
                                <span style={{ fontSize: '28px' }}>📦</span>
                                Ajouter produit
                            </Link>
                            
                            <Link
                                href="/products?filter=low_stock"
                                style={{
                                    padding: '20px',
                                    background: 'white',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textDecoration: 'none'
                                }}
                            >
                                <span style={{ fontSize: '28px' }}>⚠️</span>
                                Alertes stock
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
