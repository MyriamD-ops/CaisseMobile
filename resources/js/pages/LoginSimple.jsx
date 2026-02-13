import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';

export default function LoginSimple() {
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Username: ${username}, PIN: ${pin}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo et titre */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full mb-4">
                        <Lock className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Atelier Doré</h1>
                    <p className="text-gray-600">Caisse mobile artisanale</p>
                </div>

                {/* Formulaire */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                        Espace Administrateur
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Champ Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Nom d'utilisateur
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
                                    placeholder="sophie"
                                    required
                                />
                            </div>
                        </div>

                        {/* Champ PIN */}
                        <div>
                            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                                Code PIN
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="pin"
                                    type="password"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition font-mono text-lg tracking-widest"
                                    placeholder="••••"
                                    maxLength="6"
                                    required
                                />
                            </div>
                        </div>

                        {/* Bouton de connexion */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-rose-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition"
                        >
                            Se connecter
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-gray-500">
                        Saisissez votre code PIN à 4-6 chiffres
                    </p>
                </div>
            </div>
        </div>
    );
}
