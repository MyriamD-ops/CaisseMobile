import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import useOnlineStatus from '../../Hooks/useOnlineStatus';
import { syncProduits, getProduitsLocal } from '../../utils/sync';

export default function Index({ products: serverProducts }) {
    const { flash } = usePage().props;
    const isOnline = useOnlineStatus();
    const [products, setProducts] = useState(serverProducts);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        if (isOnline) {
            syncProducts();
        }
    }, [isOnline]);

    const loadProducts = async () => {
        try {
            const localProducts = await getProduitsLocal();
            if (localProducts.length > 0) {
                setProducts(localProducts);
            }
        } catch (error) {
            console.error('Erreur chargement produits locaux:', error);
        }
    };

    const syncProducts = async () => {
        if (!isOnline) return;
        setLoading(true);
        try {
            const synced = await syncProduits();
            setProducts(synced);
        } catch (error) {
            console.error('Erreur synchronisation:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (productId, productName) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer "${productName}" ?`)) {
            router.post(`/products/${productId}`, { _method: 'DELETE' });
        }
    };

    return (
        <div className="min-h-screen bg-night">
            <Header currentPage="products" />

            <main className="p-4 lg:p-6 max-w-7xl mx-auto">

                {/* En-tête page */}
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-snow">Produits</h2>
                        <p className="text-fog text-sm mt-1">
                            {products.length} produit{products.length > 1 ? 's' : ''}
                            {loading && (
                                <span className="ml-2 inline-flex items-center gap-1 text-gold">
                                    <span className="w-3 h-3 border border-gold border-t-transparent rounded-full animate-spin" />
                                    Synchronisation…
                                </span>
                            )}
                        </p>
                    </div>
                    <Link
                        href="/products/create"
                        className="shrink-0 flex items-center justify-center h-11 px-5 bg-gold hover:bg-gold-dim text-night font-bold rounded-xl text-sm transition-colors"
                    >
                        + Nouveau
                    </Link>
                </div>

                {/* Flash success */}
                {flash?.success && (
                    <div className="mb-5 p-4 bg-mint/10 border border-mint/30 rounded-xl text-mint text-sm flex items-center gap-2">
                        <span>✓</span>
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* État vide */}
                {products.length === 0 ? (
                    <div className="bg-surface rounded-2xl border border-ink p-12 text-center">
                        <p className="text-5xl mb-4 grayscale">📦</p>
                        <h3 className="text-lg font-semibold text-snow mb-2">Aucun produit</h3>
                        <p className="text-fog text-sm mb-6">
                            Commencez par ajouter votre premier produit
                        </p>
                        <Link
                            href="/products/create"
                            className="inline-flex items-center justify-center h-11 px-6 bg-gold hover:bg-gold-dim text-night font-bold rounded-xl text-sm transition-colors"
                        >
                            Créer un produit
                        </Link>
                    </div>
                ) : (
                    /* Grille responsive */
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {products.map((product) => {
                            const stockBas = product.stock_actuel <= product.stock_minimum;
                            return (
                                <div
                                    key={product.id_produit}
                                    className="bg-surface rounded-2xl border border-ink p-5 flex flex-col gap-4 hover:border-ink/80 transition-colors"
                                >
                                    {/* Ligne nom + badge stock */}
                                    <div className="flex items-start justify-between gap-2">
                                        <Link
                                            href={`/products/${product.id_produit}`}
                                            className="flex-1 min-w-0"
                                        >
                                            <h3 className="font-semibold text-snow hover:text-gold transition-colors truncate">
                                                {product.nom}
                                            </h3>
                                        </Link>
                                        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                                            stockBas
                                                ? 'bg-ruby/10 text-ruby border border-ruby/20'
                                                : 'bg-mint/10 text-mint border border-mint/20'
                                        }`}>
                                            {stockBas ? '⚠ Bas' : '✓ OK'}
                                        </span>
                                    </div>

                                    {/* Méta : prix, stock, catégorie */}
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                        <span className="text-gold font-bold">{product.prix_base}€</span>
                                        <span className="text-fog">Stock : {product.stock_actuel}</span>
                                        <span className="text-fog truncate">{product.categorie}</span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-auto">
                                        <Link
                                            href={`/products/${product.id_produit}/edit`}
                                            className="flex-1 h-11 flex items-center justify-center bg-ink hover:bg-ink/70 text-fog hover:text-snow rounded-xl text-sm font-medium transition-colors"
                                        >
                                            ✏️ Modifier
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id_produit, product.nom)}
                                            className="flex-1 h-11 flex items-center justify-center bg-ruby/10 hover:bg-ruby/20 text-ruby rounded-xl text-sm font-medium transition-colors border border-ruby/20"
                                        >
                                            🗑️ Supprimer
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
