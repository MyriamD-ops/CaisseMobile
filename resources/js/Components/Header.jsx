import { Link } from '@inertiajs/react';
import { useState } from 'react';
import useOnlineStatus from '../Hooks/useOnlineStatus';

export default function Header({ currentPage = 'dashboard' }) {
    const isOnline = useOnlineStatus();
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard',   href: '/',        key: 'dashboard' },
        { name: 'Produits',    href: '/products', key: 'products'  },
        { name: 'Ventes',      href: '/sales',    key: 'sales'     },
        { name: 'Événements',  href: '/events',   key: 'events'    },
    ];

    return (
        <header className="bg-surface border-b border-ink">
            {/* ── barre principale ── */}
            <div className="flex items-center justify-between px-4 h-14 max-w-7xl mx-auto">

                {/* Logo */}
                <Link href="/" className="text-gold font-bold text-lg tracking-tight shrink-0">
                    CaisseMobile
                </Link>

                {/* Nav desktop */}
                <nav className="hidden lg:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`text-sm font-medium transition-colors ${
                                currentPage === item.key
                                    ? 'text-gold'
                                    : 'text-fog hover:text-snow'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Droite : badge + déconnexion/hamburger */}
                <div className="flex items-center gap-3">

                    {/* Badge online (masqué sur xs, visible à partir de sm) */}
                    <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        isOnline ? 'bg-mint/10 text-mint' : 'bg-ruby/10 text-ruby'
                    }`}>
                        <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-mint' : 'bg-ruby'}`} />
                        {isOnline ? 'En ligne' : 'Hors ligne'}
                    </div>

                    {/* Déconnexion — desktop uniquement */}
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="hidden lg:flex items-center justify-center h-9 px-4 bg-ink hover:bg-ink/70 text-fog hover:text-snow border border-ink rounded-lg text-sm font-medium transition-colors"
                    >
                        Déconnexion
                    </Link>

                    {/* Hamburger — mobile uniquement */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-ink text-fog hover:text-snow transition-colors"
                        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M3 6h18M3 12h18M3 18h18" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* ── Menu mobile déroulant ── */}
            {menuOpen && (
                <div className="lg:hidden border-t border-ink bg-surface">
                    <nav className="px-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center h-12 text-sm font-medium border-b border-ink last:border-b-0 transition-colors ${
                                    currentPage === item.key
                                        ? 'text-gold'
                                        : 'text-fog hover:text-snow'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Pied du menu : badge (xs) + déconnexion */}
                        <div className="flex items-center justify-between py-3 border-t border-ink">
                            {/* Badge online sur xs (caché sur sm+ car déjà dans la barre) */}
                            <div className={`flex sm:hidden items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                                isOnline ? 'bg-mint/10 text-mint' : 'bg-ruby/10 text-ruby'
                            }`}>
                                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-mint' : 'bg-ruby'}`} />
                                {isOnline ? 'En ligne' : 'Hors ligne'}
                            </div>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="flex items-center justify-center h-11 px-5 bg-ink hover:bg-ink/70 text-fog hover:text-snow rounded-xl text-sm font-medium transition-colors ml-auto"
                            >
                                Déconnexion
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
