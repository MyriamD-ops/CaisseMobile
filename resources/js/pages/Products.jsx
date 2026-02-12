import React, { useState } from 'react';
import { 
    Search, 
    Plus, 
    Edit2, 
    Trash2, 
    Eye,
    Package,
    AlertCircle
} from 'lucide-react';

const Products = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Tous' },
        { id: 'colliers', name: 'Colliers' },
        { id: 'boucles', name: 'Boucles d\'oreilles' },
        { id: 'bracelets', name: 'Bracelets' },
    ];

    const products = [
        {
            id: 1,
            name: 'Perles Dorées Océane',
            category: 'Colliers',
            price: 89.00,
            stock: 12,
            variants: 2,
            image: null,
            active: true
        },
        {
            id: 2,
            name: 'Cristal Étoile',
            category: 'Boucles d\'oreilles',
            price: 45.00,
            stock: 5,
            variants: 1,
            image: null,
            active: true
        },
        {
            id: 3,
            name: 'Bracelet Argent Tressé',
            category: 'Bracelets',
            price: 67.50,
            stock: 2,
            variants: 3,
            image: null,
            active: true,
            lowStock: true
        },
    ];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === categories.find(c => c.id === selectedCategory)?.name;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Mes produits</h2>
                    <p className="text-gray-600 mt-1">{products.length} produits au catalogue</p>
                </div>
                <button className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Ajouter un produit</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        />
                    </div>
                    
                    {/* Category Filter */}
                    <div className="flex gap-2 overflow-x-auto">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-rose-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Product Image */}
                        <div className="h-48 bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center">
                            <Package className="w-16 h-16 text-rose-400" />
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.category}</p>
                                </div>
                                {product.lowStock && (
                                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                                        Stock bas
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-gray-900">{product.price.toFixed(2)}€</span>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                                    <p className="text-xs text-gray-500">{product.variants} variante(s)</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center space-x-1">
                                    <Eye className="w-4 h-4" />
                                    <span className="text-sm">Voir</span>
                                </button>
                                <button className="flex-1 px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-1">
                                    <Edit2 className="w-4 h-4" />
                                    <span className="text-sm">Modifier</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Aucun produit trouvé
                    </h3>
                    <p className="text-gray-600">
                        Essayez de modifier vos filtres ou ajoutez un nouveau produit
                    </p>
                </div>
            )}
        </div>
    );
};

export default Products;
