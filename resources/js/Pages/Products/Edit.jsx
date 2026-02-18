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
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DEE2E6', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', textDecoration: 'none' }}>CaisseMobile</Link>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#495057' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '32px 24px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <Link href="/products" style={{ color: '#6C757D', textDecoration: 'none', fontSize: '14px' }}>← Retour aux produits</Link>
                    </div>

                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '32px', border: '1px solid #DEE2E6' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#2C3E50', marginBottom: '24px' }}>Modifier le produit</h2>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Nom du produit *</label>
                                <input type="text" value={data.nom} onChange={(e) => setData('nom', e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                                {errors.nom && <p style={{ color: '#C53030', fontSize: '13px', marginTop: '4px' }}>{errors.nom}</p>}
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Description</label>
                                <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows="4" style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Prix (€) *</label>
                                    <input type="number" step="0.01" value={data.prix} onChange={(e) => setData('prix', e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                                    {errors.prix && <p style={{ color: '#C53030', fontSize: '13px', marginTop: '4px' }}>{errors.prix}</p>}
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Catégorie *</label>
                                    <select value={data.categorie} onChange={(e) => setData('categorie', e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}>
                                        <option value="">Sélectionner...</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                    {errors.categorie && <p style={{ color: '#C53030', fontSize: '13px', marginTop: '4px' }}>{errors.categorie}</p>}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Stock actuel *</label>
                                    <input type="number" value={data.stock_actuel} onChange={(e) => setData('stock_actuel', e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                                    {errors.stock_actuel && <p style={{ color: '#C53030', fontSize: '13px', marginTop: '4px' }}>{errors.stock_actuel}</p>}
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Stock minimum *</label>
                                    <input type="number" value={data.stock_minimum} onChange={(e) => setData('stock_minimum', e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                                    {errors.stock_minimum && <p style={{ color: '#C53030', fontSize: '13px', marginTop: '4px' }}>{errors.stock_minimum}</p>}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Matériau d'impression</label>
                                <select value={data.matiere} onChange={(e) => setData('matiere', e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}>
                                    <option value="">Sélectionner...</option>
                                    {matieres.map(mat => <option key={mat} value={mat}>{mat}</option>)}
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid #DEE2E6' }}>
                                <button type="submit" disabled={processing} style={{ flex: 1, padding: '12px', backgroundColor: processing ? '#ADB5BD' : '#343A40', color: '#FFFFFF', fontWeight: '600', borderRadius: '6px', border: 'none', cursor: processing ? 'not-allowed' : 'pointer', fontSize: '14px' }}>
                                    {processing ? 'Modification...' : 'Enregistrer'}
                                </button>
                                <Link href="/products" style={{ flex: 1, padding: '12px', backgroundColor: '#F8F9FA', color: '#495057', fontWeight: '600', borderRadius: '6px', border: '1px solid #DEE2E6', textAlign: 'center', textDecoration: 'none', fontSize: '14px', display: 'block', boxSizing: 'border-box' }}>Annuler</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
