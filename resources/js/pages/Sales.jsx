import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function Sales() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Ventes</h1>
                <p className="text-gray-600 mt-2">Historique et statistiques</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Page Ventes</h3>
                <p className="text-gray-500">Cette page sera développée dans une prochaine étape</p>
            </div>
        </div>
    );
}
