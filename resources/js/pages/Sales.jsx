import React, { useState } from 'react';
import { 
    Calendar, 
    Download, 
    Eye,
    Filter,
    CreditCard,
    Banknote,
    Smartphone
} from 'lucide-react';

const Sales = () => {
    const [dateFilter, setDateFilter] = useState('today');

    const sales = [
        {
            id: 'PV-0247',
            date: '14 fév. 2026 à 08:34',
            items: [
                { name: 'Perles Dorées Océane', quantity: 2, price: 89.00 }
            ],
            total: 178.00,
            paymentMethod: 'card',
            synchronized: true
        },
        {
            id: 'PV-0246',
            date: '14 fév. 2026 à 08:12',
            items: [
                { name: 'Cristal Étoile', quantity: 1, price: 45.00 }
            ],
            total: 45.00,
            paymentMethod: 'cash',
            synchronized: true
        },
        {
            id: 'PV-0245',
            date: '14 fév. 2026 à 07:58',
            items: [
                { name: 'Bracelet Argent Tressé', quantity: 1, price: 67.50 }
            ],
            total: 67.50,
            paymentMethod: 'mobile',
            synchronized: false
        },
    ];

    const getPaymentIcon = (method) => {
        switch (method) {
            case 'card':
                return <CreditCard className="w-5 h-5" />;
            case 'cash':
                return <Banknote className="w-5 h-5" />;
            case 'mobile':
                return <Smartphone className="w-5 h-5" />;
            default:
                return null;
        }
    };

    const getPaymentLabel = (method) => {
        switch (method) {
            case 'card':
                return 'Carte bancaire';
            case 'cash':
                return 'Espèces';
            case 'mobile':
                return 'Paiement mobile';
            default:
                return method;
        }
    };

    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const unsyncedSales = sales.filter(sale => !sale.synchronized).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Historique des ventes</h2>
                    <p className="text-gray-600 mt-1">
                        {sales.length} vente(s) • Total: {totalSales.toFixed(2)}€
                        {unsyncedSales > 0 && (
                            <span className="ml-2 text-amber-600">
                                • {unsyncedSales} en attente de synchronisation
                            </span>
                        )}
                    </p>
                </div>
                <button className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Exporter (CSV)</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setDateFilter('today')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                dateFilter === 'today'
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Aujourd'hui
                        </button>
                        <button
                            onClick={() => setDateFilter('week')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                dateFilter === 'week'
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Cette semaine
                        </button>
                        <button
                            onClick={() => setDateFilter('month')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                dateFilter === 'month'
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Ce mois
                        </button>
                    </div>
                </div>
            </div>

            {/* Sales List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    N° Vente
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Articles
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Paiement
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sales.map((sale) => (
                                <tr key={sale.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {sale.id}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{sale.date}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {sale.items.map((item, idx) => (
                                                <div key={idx}>
                                                    {item.quantity}x {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2 text-sm text-gray-900">
                                            {getPaymentIcon(sale.paymentMethod)}
                                            <span>{getPaymentLabel(sale.paymentMethod)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">
                                            {sale.total.toFixed(2)}€
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {sale.synchronized ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Synchronisé
                                            </span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                                                En attente
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-rose-600 hover:text-rose-900 inline-flex items-center space-x-1">
                                            <Eye className="w-4 h-4" />
                                            <span>Détails</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Sales;
