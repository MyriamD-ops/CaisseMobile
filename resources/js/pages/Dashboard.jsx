import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, ShoppingCart, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalProduits: 0,
        stockBas: 0,
        ventesJour: 0,
        montantJour: 0,
    });

    useEffect(() => {
        setStats({
            totalProduits: 247,
            stockBas: 8,
            ventesJour: 23,
            montantJour: 1447,
        });
    }, []);

    const cards = [
        { title: 'PRODUITS', value: stats.totalProduits, icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-50' },
        { title: 'STOCK BAS', value: stats.stockBas, icon: AlertTriangle, color: 'text-orange-600', bgColor: 'bg-orange-50' },
        { title: 'VENTES DU JOUR', value: stats.ventesJour, icon: ShoppingCart, color: 'text-green-600', bgColor: 'bg-green-50' },
        { title: 'MONTANT DU JOUR', value: `${stats.montantJour}€`, icon: TrendingUp, color: 'text-rose-600', bgColor: 'bg-rose-50' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Vue d'ensemble de votre activité</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{card.title}</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
                                </div>
                                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                                    <Icon className={`w-6 h-6 ${card.color}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
