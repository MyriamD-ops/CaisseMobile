import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
    const [showPin, setShowPin] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        pin: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const handlePinChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 6) {
            setData('pin', value);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #fef2f2, #fef3c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ width: '100%', maxWidth: '448px' }}>
                {/* Logo et titre */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(to bottom right, #fb7185, #fbbf24)',
                        borderRadius: '50%',
                        marginBottom: '16px'
                    }}>
                        <span style={{ fontSize: '40px' }}>🔒</span>
                    </div>
                    <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                        Atelier Doré
                    </h1>
                    <p style={{ color: '#6b7280' }}>Caisse mobile artisanale</p>
                </div>

                {/* Formulaire */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    padding: '32px'
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '24px',
                        textAlign: 'center'
                    }}>
                        Espace Administrateur
                    </h2>

                    {errors.username && (
                        <div style={{
                            marginBottom: '16px',
                            padding: '16px',
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '8px',
                            color: '#991b1b',
                            fontSize: '14px'
                        }}>
                            ⚠️ {errors.username}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Champ Username */}
                        <div>
                            <label htmlFor="username" style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '8px'
                            }}>
                                Nom d'utilisateur
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    outline: 'none'
                                }}
                                placeholder="sophie"
                                required
                            />
                        </div>

                        {/* Champ PIN */}
                        <div>
                            <label htmlFor="pin" style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '8px'
                            }}>
                                Code PIN
                            </label>
                            <input
                                id="pin"
                                type={showPin ? "text" : "password"}
                                value={data.pin}
                                onChange={handlePinChange}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '18px',
                                    fontFamily: 'monospace',
                                    letterSpacing: '0.2em',
                                    outline: 'none'
                                }}
                                placeholder="••••"
                                maxLength="6"
                                required
                            />
                            <div style={{ marginTop: '8px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#6b7280' }}>
                                    <input
                                        type="checkbox"
                                        checked={showPin}
                                        onChange={(e) => setShowPin(e.target.checked)}
                                        style={{ marginRight: '8px' }}
                                    />
                                    Afficher le code PIN
                                </label>
                            </div>
                        </div>

                        {/* Bouton de connexion */}
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                width: '100%',
                                background: 'linear-gradient(to right, #f43f5e, #fbbf24)',
                                color: 'white',
                                fontWeight: '600',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: processing ? 'not-allowed' : 'pointer',
                                opacity: processing ? 0.5 : 1,
                                fontSize: '16px'
                            }}
                        >
                            {processing ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </form>

                    <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
                        Saisissez votre code PIN à 4-6 chiffres
                    </p>
                </div>
            </div>
        </div>
    );
}
