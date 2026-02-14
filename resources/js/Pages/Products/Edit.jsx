import { Link, useForm } from '@inertiajs/react';

export default function Edit({ product }) {
    const { data, setData, put, processing, errors } = useForm({
        id: product?.id_produit || null,
        nom: product?.nom || '',
        description: product?.description || '',
        prix: product?.prix_base || '',
        stock_actuel: product?.stock_actuel || '',
        stock_minimum: product?.stock_minimum || '',
        categorie: product?.categorie || '',
        matiere: product?.matiere || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.id) {
            alert('Erreur: ID produit manquant');
            return;
        }
        put('/products/' + data.id);
    };

    const categories = ['Bijou', 'Décoration', 'Accessoire', 'Figurine', 'Utilitaire', 'Autre'];
    const matieres = ['PLA', 'PETG', 'ABS', 'Résine', 'TPU/Flexible', 'Bois (PLA)', 'Métal (PLA)', 'Autre'];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui' }}>
            <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#f43f5e', textDecoration: 'none' }}>
                        Atelier Doré
                    </Link>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>
                        Déconnexion
                    </Link>
                </div>
            </header>

            <main style={{ padding: '24px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <Link href="/products" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}>
                            ← Retour aux produits
                        </Link>
                    </div>

                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
                            Modifier le produit
                        </h2>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                    Nom du produit *
                                </label>
                                <input
                                    type="text"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }}
                                />
                                {errors.nom && <p style={{ color: '#991b1b', fontSize: '14px', marginTop: '4px' }}>{errors.nom}</p>}
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="4"
                                    style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                        Prix (€) *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.prix}
                                        onChange={(e) => setData('prix', e.target.value)}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }}
                                    />
                                    {errors.prix && <p style={{ color: '#991b1b', fontSize: '14px', marginTop: '4px' }}>{errors.prix}</p>}
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                        Catégorie *
                                    </label>
                                    <select
                                        value={data.categorie}
                                        onChange={(e) => setData('categorie', e.target.value)}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }}
                                    >
                                        <option value="">Sélectionner...</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                    {errors.categorie && <p style={{ color: '#991b1b', fontSize: '14px', marginTop: '4px' }}>{errors.categorie}</p>}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                        Stock actuel *
                                    </label>
                                    <input
                                        type="number"
                                        value={data.stock_actuel}
                                        onChange={(e) => setData('stock_actuel', e.target.value)}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }}
                                    />
                                    {errors.stock_actuel && <p style={{ color: '#991b1b', fontSize: '14px', marginTop: '4px' }}>{errors.stock_actuel}</p>}
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                        Stock minimum *
                                    </label>
                                    <input
                                        type="number"
                                        value={data.stock_minimum}
                                        onChange={(e) => setData('stock_minimum', e.target.value)}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }}
                                    />
                                    {errors.stock_minimum && <p style={{ color: '#991b1b', fontSize: '14px', marginTop: '4px' }}>{errors.stock_minimum}</p>}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                                    Matériau d'impression
                                </label>
                                <select
                                    value={data.matiere}
                                    onChange={(e) => setData('matiere', e.target.value)}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }}
                                >
                                    <option value="">Sélectionner...</option>
                                    {matieres.map(mat => <option key={mat} value={mat}>{mat}</option>)}
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: 'linear-gradient(to right, #f43f5e, #fbbf24)',
                                        color: 'white',
                                        fontWeight: '600',
                                        borderRadius: '8px',
                                        border: 'none',
                                        cursor: processing ? 'not-allowed' : 'pointer',
                                        opacity: processing ? 0.5 : 1,
                                        fontSize: '16px'
                                    }}
                                >
                                    {processing ? 'Modification...' : 'Enregistrer les modifications'}
                                </button>
                                <Link
                                    href="/products"
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        backgroundColor: '#f3f4f6',
                                        color: '#374151',
                                        fontWeight: '600',
                                        borderRadius: '8px',
                                        border: 'none',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        fontSize: '16px',
                                        display: 'block'
                                    }}
                                >
                                    Annuler
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
