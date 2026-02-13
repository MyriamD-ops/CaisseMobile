export default function Welcome() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fef2f2',
            fontFamily: 'system-ui'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '48px', color: '#be123c', marginBottom: '16px' }}>
                    🎉 Inertia.js fonctionne !
                </h1>
                <p style={{ color: '#666', fontSize: '18px' }}>
                    React + Inertia + Laravel = Success!
                </p>
            </div>
        </div>
    );
}
