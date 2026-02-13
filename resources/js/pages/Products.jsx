import React from 'react';
import { Package } from 'lucide-react';

export default function Products() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
                <p className="text-gray-600 mt-2">Gestion de votre catalogue</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Page Produits</h3>
                <p className="text-gray-500">Cette page sera développée dans la prochaine étape</p>
            </div>
        </div>
    );
}
