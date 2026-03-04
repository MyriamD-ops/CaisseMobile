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
        post('/login', {
            onError: (errors) => {
                console.log('Erreurs de validation:', errors);
            },
        });
    };

    const handlePinChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 6) {
            setData('pin', value);
        }
    };

    return (
        /* Fond : dégradé vertical blanc cassé → gris doux */
        <div className="min-h-screen bg-linear-to-b from-snow to-[#D4D4D4] flex items-center justify-center p-4">
            <div className="w-full max-w-sm">

                {/* ── Logo ── */}
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">💎</div>
                    <h1 className="text-3xl font-bold text-dark tracking-tight">
                        CaisseMobile
                    </h1>
                    <p className="text-slate text-sm mt-2">Point de vente artisan</p>
                </div>

                {/* ── Card ── */}
                <div className="bg-white rounded-2xl border border-[#D8D8D8] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-8">

                    <h2 className="text-lg font-semibold text-dark text-center mb-7">
                        Connexion
                    </h2>

                    {/* Flash succès */}
                    {flash?.success && (
                        <div className="mb-5 p-4 bg-[#EEFAF5] border border-mint/40 rounded-xl text-[#065F46] text-sm flex items-center gap-2">
                            <span>✓</span>
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* Erreur */}
                    {(errors.username || errors.pin) && (
                        <div className="mb-5 p-4 bg-[#FFF0E8] border border-ember/50 rounded-xl text-dark text-sm flex items-center gap-2">
                            <span className="text-ember">⚠</span>
                            <span>{errors.username || errors.pin}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Nom d'utilisateur */}
                        <div>
                            <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                                Nom d'utilisateur
                            </label>
                            <input
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                className="w-full h-12 px-4 bg-white border border-slate/40 rounded-xl text-dark text-sm placeholder:text-slate/50 focus:outline-none focus:border-ember focus:ring-2 focus:ring-ember/15 transition-colors"
                                autoFocus
                                autoComplete="username"
                            />
                        </div>

                        {/* Code PIN */}
                        <div>
                            <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                                Code PIN
                            </label>
                            <div className="relative">
                                <input
                                    type={showPin ? 'text' : 'password'}
                                    value={data.pin}
                                    onChange={handlePinChange}
                                    className="w-full h-12 px-4 pr-12 bg-white border border-slate/40 rounded-xl text-dark text-sm tracking-[0.4em] font-bold focus:outline-none focus:border-ember focus:ring-2 focus:ring-ember/15 transition-colors"
                                    maxLength="6"
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPin(!showPin)}
                                    className="absolute right-0 top-0 w-12 h-12 flex items-center justify-center text-slate hover:text-dark transition-colors"
                                    aria-label="Afficher/masquer le PIN"
                                >
                                    {showPin ? '🙈' : '👁️'}
                                </button>
                            </div>
                            <p className="text-xs text-slate/60 mt-1.5">4 à 6 chiffres</p>
                        </div>

                        {/* Bouton — dégradé ember */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-12 bg-linear-to-r from-ember to-ember-dim hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
                        >
                            {processing && (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            )}
                            {processing ? 'Connexion...' : 'Se connecter'}
                        </button>

                    </form>
                </div>

                {/* Version */}
                <p className="text-center mt-6 text-xs text-slate/60">
                    CaisseMobile · Version 1.0
                </p>

            </div>
        </div>
    );
}
