import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
    const { flash } = usePage().props;
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
            background: 'linear-gradient(160deg, #f8f9fa 0%, #e9ecef 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            fontFamily: "'Nunito', system-ui, -apple-system, sans-serif"
        }}>
            <div style={{ width: '100%', maxWidth: '420px' }}>
                {/* Logo et titre */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        margin: '0 auto 20px',
                        background: 'linear-gradient(135deg, #6c757d, #495057)',
                        borderRadius: '50% 0 50% 50%',
                        transform: 'rotate(-45deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                    }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            background: 'white',
                            borderRadius: '50% 0 50% 50%',
                            transform: 'rotate(45deg)'
                        }}></div>
                    </div>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: '600',
                        color: '#212529',
                        marginBottom: '8px',
                        fontFamily: "'Cormorant Garamond', Georgia, serif"
                    }}>
                        3D Ami
                    </h1>
                    <p style={{ 
                        color: '#6c757d', 
                        fontSize: '14px', 
                        fontStyle: 'italic',
                        fontFamily: "'Cormorant Garamond', Georgia, serif"
                    }}>
                        Caisse mobile pour artisan
                    </p>
                </div>

                {/* Formulaire */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    padding: '36px'
                }}>
                    <h2 style={{
                        fontSize: '22px',
                        fontWeight: '600',
                        color: '#212529',
                        marginBottom: '8px',
                        textAlign: 'center',
                        fontFamily: "'Cormorant Garamond', Georgia, serif"
                    }}>
                        Espace Administrateur
                    </h2>
                    <p style={{
                        fontSize: '13px',
                        color: '#6c757d',
                        marginBottom: '28px',
                        textAlign: 'center'
                    }}>
                        Connectez-vous pour accéder à la caisse
                    </p>

                    {flash?.success && (
                        <div style={{
                            marginBottom: '20px',
                            padding: '14px 16px',
                            backgroundColor: '#d1e7dd',
                            border: '1px solid #badbcc',
                            borderRadius: '12px',
                            color: '#0f5132',
                            fontSize: '13px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <span style={{ fontSize: '16px' }}>✓</span>
                            {flash.success}
                        </div>
                    )}

                    {errors.username && (
                        <div style={{
                            marginBottom: '20px',
                            padding: '14px 16px',
                            backgroundColor: '#f8d7da',
                            border: '1px solid #f5c2c7',
                            borderRadius: '12px',
                            color: '#842029',
                            fontSize: '13px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <span style={{ fontSize: '16px' }}>⚠️</span>
                            {errors.username}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '20px',
                        alignItems: 'center'
                    }}>
                        {/* Champ Username */}
                        <div style={{ width: '100%', maxWidth: '320px' }}>
                            <label htmlFor="username" style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#495057',
                                marginBottom: '8px',
                                letterSpacing: '0.5px',
                                textAlign: 'left'
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
                                    padding: '14px 16px',
                                    border: '1.5px solid #dee2e6',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    outline: 'none',
                                    backgroundColor: 'white',
                                    color: '#212529',
                                    transition: 'all 0.3s ease',
                                    fontFamily: "'Nunito', sans-serif"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#495057';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(73,80,87,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#dee2e6';
                                    e.target.style.boxShadow = 'none';
                                }}
                                placeholder="sophie"
                                required
                            />
                        </div>

                        {/* Champ PIN */}
                        <div style={{ width: '100%', maxWidth: '320px' }}>
                            <label htmlFor="pin" style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#495057',
                                marginBottom: '8px',
                                letterSpacing: '0.5px',
                                textAlign: 'left'
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
                                    padding: '14px 16px',
                                    border: '1.5px solid #dee2e6',
                                    borderRadius: '12px',
                                    fontSize: '20px',
                                    fontFamily: "'Nunito', monospace",
                                    letterSpacing: '0.3em',
                                    outline: 'none',
                                    backgroundColor: 'white',
                                    color: '#212529',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#495057';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(73,80,87,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#dee2e6';
                                    e.target.style.boxShadow = 'none';
                                }}
                                placeholder="••••"
                                maxLength="6"
                                required
                            />
                            <div style={{ marginTop: '10px', textAlign: 'left' }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '13px',
                                    color: '#6c757d',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={showPin}
                                        onChange={(e) => setShowPin(e.target.checked)}
                                        style={{
                                            marginRight: '8px',
                                            width: '16px',
                                            height: '16px',
                                            cursor: 'pointer',
                                            accentColor: '#495057'
                                        }}
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
                                maxWidth: '320px',
                                background: processing 
                                    ? '#adb5bd' 
                                    : '#495057',
                                color: 'white',
                                fontWeight: '700',
                                padding: '16px 20px',
                                borderRadius: '12px',
                                border: 'none',
                                cursor: processing ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                letterSpacing: '0.5px',
                                boxShadow: processing 
                                    ? 'none' 
                                    : '0 4px 12px rgba(0,0,0,0.15)',
                                transition: 'all 0.3s ease',
                                fontFamily: "'Nunito', sans-serif"
                            }}
                            onMouseEnter={(e) => {
                                if (!processing) {
                                    e.target.style.background = '#343a40';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!processing) {
                                    e.target.style.background = '#495057';
                                }
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = processing 
                                    ? 'none' 
                                    : '0 4px 12px rgba(0,0,0,0.15)';
                            }}
                        >
                            {processing ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </form>

                    <p style={{
                        marginTop: '24px',
                        textAlign: 'center',
                        fontSize: '11px',
                        color: '#adb5bd',
                        letterSpacing: '0.5px'
                    }}>
                        Saisissez votre code PIN à 4-6 chiffres
                    </p>
                </div>

                {/* Footer */}
                <p style={{
                    marginTop: '24px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#6c757d'
                }}>
                    Caisse Enregistreuse Mobile
                </p>
            </div>
        </div>
    );
}