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
            background: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
            <div style={{ width: '100%', maxWidth: '420px' }}>
                {/* Logo / Titre */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ 
                        fontSize: '48px',
                        marginBottom: '16px',
                        filter: 'grayscale(100%)'
                    }}>💎</div>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: '600',
                        color: '#2C3E50',
                        letterSpacing: '1px',
                        margin: 0
                    }}>
                        CaisseMobile
                    </h1>
                    <p style={{
                        fontSize: '14px',
                        color: '#6C757D',
                        marginTop: '8px',
                        fontWeight: '400'
                    }}>
                        Point de vente artisan
                    </p>
                </div>

                {/* Carte de connexion */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(44, 62, 80, 0.08)',
                    padding: '40px',
                    border: '1px solid #DEE2E6'
                }}>
                    <h2 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#2C3E50',
                        marginBottom: '32px',
                        textAlign: 'center'
                    }}>
                        Connexion
                    </h2>

                    {flash?.success && (
                        <div style={{
                            marginBottom: '24px',
                            padding: '16px',
                            backgroundColor: '#F8F9FA',
                            border: '1px solid #DEE2E6',
                            borderRadius: '8px',
                            color: '#2C3E50',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span style={{ color: '#495057' }}>✓</span>
                            {flash.success}
                        </div>
                    )}

                    {errors.username && (
                        <div style={{
                            marginBottom: '24px',
                            padding: '16px',
                            backgroundColor: '#FFF5F5',
                            border: '1px solid #FED7D7',
                            borderRadius: '8px',
                            color: '#C53030',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span>⚠</span>
                            {errors.username}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: '#495057',
                                marginBottom: '8px'
                            }}>
                                Nom d'utilisateur
                            </label>
                            <input
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '2px solid #DEE2E6',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    color: '#2C3E50',
                                    backgroundColor: '#FFFFFF',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#495057';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(73, 80, 87, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#DEE2E6';
                                    e.target.style.boxShadow = 'none';
                                }}
                                autoFocus
                                autoComplete="username"
                            />
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: '#495057',
                                marginBottom: '8px'
                            }}>
                                Code PIN
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPin ? 'text' : 'password'}
                                    value={data.pin}
                                    onChange={handlePinChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 50px 12px 16px',
                                        border: '2px solid #DEE2E6',
                                        borderRadius: '8px',
                                        fontSize: '15px',
                                        color: '#2C3E50',
                                        backgroundColor: '#FFFFFF',
                                        outline: 'none',
                                        letterSpacing: '6px',
                                        fontWeight: '600',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    maxLength="6"
                                    autoComplete="off"
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#495057';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(73, 80, 87, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#DEE2E6';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPin(!showPin)}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '18px',
                                        padding: '8px',
                                        color: '#6C757D',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.color = '#2C3E50'}
                                    onMouseLeave={(e) => e.target.style.color = '#6C757D'}
                                >
                                    {showPin ? '🙈' : '👁️'}
                                </button>
                            </div>
                            <p style={{
                                fontSize: '12px',
                                color: '#ADB5BD',
                                marginTop: '8px'
                            }}>
                                4 à 6 chiffres
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: processing ? '#ADB5BD' : '#343A40',
                                color: '#FFFFFF',
                                fontWeight: '600',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: processing ? 'not-allowed' : 'pointer',
                                fontSize: '15px',
                                transition: 'all 0.2s ease',
                                boxSizing: 'border-box'
                            }}
                            onMouseEnter={(e) => {
                                if (!processing) {
                                    e.target.style.backgroundColor = '#23272B';
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(52, 58, 64, 0.3)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!processing) {
                                    e.target.style.backgroundColor = '#343A40';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }
                            }}
                        >
                            {processing ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p style={{
                    textAlign: 'center',
                    marginTop: '24px',
                    fontSize: '13px',
                    color: '#ADB5BD'
                }}>
                    CaisseMobile · Version 1.0
                </p>
            </div>
        </div>
    );
}
