import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
    Home, 
    Package, 
    ShoppingCart, 
    Calendar, 
    Settings, 
    LogOut, 
    Menu, 
    X 
} from 'lucide-react';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Produits', href: '/products', icon: Package },
        { name: 'Ventes', href: '/sales', icon: ShoppingCart },
        { name: 'Événements', href: '/events', icon: Calendar },
        { name: 'Paramètres', href: '/settings', icon: Settings },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar pour mobile */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-64 bg-white">
                    <div className="flex items-center justify-between h-16 px-4 border-b">
                        <h1 className="text-xl font-bold text-rose-600">Atelier Doré</h1>
                        <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md text-gray-400 hover:text-gray-500">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex-1 px-2 py-4 overflow-y-auto">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${
                                        isActive(item.href)
                                            ? 'bg-rose-50 text-rose-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>

            {/* Sidebar pour desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
                    <div className="flex items-center h-16 px-4 border-b">
                        <h1 className="text-xl font-bold text-rose-600">Atelier Doré</h1>
                    </div>
                    <div className="flex-1 px-2 py-4 overflow-y-auto">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${
                                        isActive(item.href)
                                            ? 'bg-rose-50 text-rose-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="px-2 py-4 border-t">
                        <button className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50">
                            <LogOut className="w-5 h-5 mr-3" />
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="lg:pl-64">
                {/* Header */}
                <div className="sticky top-0 z-10 flex h-16 bg-white border-b border-gray-200 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="px-4 text-gray-500 focus:outline-none"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center flex-1 px-4">
                        <h1 className="text-xl font-bold text-rose-600">Atelier Doré</h1>
                    </div>
                </div>

                {/* Contenu de la page */}
                <main className="py-6">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
