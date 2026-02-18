import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ evenement, produits }) {
    const [formData, setFormData] = useState({
        nom: evenement.nom,
        lieu: evenement.lieu || '',
        date_debut: evenement.date_debut.split('T')[0],
        date_fin: evenement.date_fin.split('T')[0],
        description: evenement.description || '',
        statut: evenement.statut
    });

    const [selectedProduits, setSelectedProduits] = useState(
        evenement.produits.map(p => ({
            id: p.id_produit,
            nom: p.nom,
            stock: p.pivot.stock_evenement,
            stock_max: p.stock_actuel
        }))
    );

    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post(`/events/${evenement.id_evenement}/update`, {
            ...formData,
            produits: selectedProduits.map(p => ({ id: p.id, stock: p.stock }))
        }, {
            onFinish: () => setProcessing(false)
        });
    };

    const addProduit = (produit) => {
        if (!selectedProduits.find(p => p.id === produit.id_produit)) {
            setSelectedProduits([...selectedProduits, {
                id: produit.id_produit,
                nom: produit.nom,
                stock: 1,
                stock_max: produit.stock_actuel
            }]);
        }
    };

    const updateStock = (id, stock) => {
        setSelectedProduits(selectedProduits.map(p => 
            p.id === id ? { ...p, stock: Math.min(Math.max(0, stock), p.stock_max) } : p
        ));
    };

    const removeProduit = (id) => {
        setSelectedProduits(selectedProduits.filter(p => p.id !== id));
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DEE2E6', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', textDecoration: 'none' }}>CaisseMobile</Link>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#495057' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '32px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <Link href="/events" style={{ color: '#6C757D', textDecoration: 'none', fontSize: '14px', marginBottom: '24px', display: 'inline-block' }}>← Retour aux événements</Link>

                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#2C3E50', marginBottom: '24px' }}>Modifier l'événement</h2>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', border: '1px solid #DEE2E6' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginBottom: '16px' }}>Informations</h3>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Nom de l'événement *</label>
                                        <input type="text" value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Lieu</label>
                                        <input type="text" value={formData.lieu} onChange={(e) => setFormData({...formData, lieu: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Date début *</label>
                                            <input type="date" value={formData.date_debut} onChange={(e) => setFormData({...formData, date_debut: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Date fin *</label>
                                            <input type="date" value={formData.date_fin} onChange={(e) => setFormData({...formData, date_fin: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Statut</label>
                                        <select value={formData.statut} onChange={(e) => setFormData({...formData, statut: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}>
                                            <option value="planifie">📅 Planifié</option>
                                            <option value="en_cours">✅ En cours</option>
                                            <option value="termine">🏁 Terminé</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#495057', marginBottom: '8px' }}>Description</label>
                                        <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" style={{ width: '100%', padding: '10px 12px', border: '1px solid #DEE2E6', borderRadius: '6px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginTop: '32px', marginBottom: '16px' }}>Ajouter des produits</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                                    {produits.filter(p => !selectedProduits.find(sp => sp.id === p.id_produit)).map((produit) => (
                                        <button key={produit.id_produit} type="button" onClick={() => addProduit(produit)} style={{ padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#2C3E50', marginBottom: '4px' }}>{produit.nom}</div>
                                            <div style={{ fontSize: '13px', color: '#6C757D' }}>Stock: {produit.stock_actuel}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', border: '1px solid #DEE2E6', position: 'sticky', top: '24px' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginBottom: '16px' }}>Produits ({selectedProduits.length})</h3>
                                    
                                    {selectedProduits.length === 0 ? (
                                        <p style={{ color: '#6C757D', fontSize: '14px', textAlign: 'center', padding: '32px 0' }}>Aucun produit</p>
                                    ) : (
                                        <div style={{ marginBottom: '16px', maxHeight: '300px', overflowY: 'auto' }}>
                                            {selectedProduits.map((p) => (
                                                <div key={p.id} style={{ padding: '12px', backgroundColor: '#F8F9FA', borderRadius: '6px', marginBottom: '8px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#2C3E50', flex: 1 }}>{p.nom}</span>
                                                        <button type="button" onClick={() => removeProduit(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#C53030' }}>×</button>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                        <button type="button" onClick={() => updateStock(p.id, p.stock - 1)} style={{ padding: '4px 12px', backgroundColor: '#FFFFFF', border: '1px solid #DEE2E6', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>−</button>
                                                        <input type="number" value={p.stock} onChange={(e) => updateStock(p.id, parseInt(e.target.value) || 0)} style={{ width: '50px', padding: '4px', textAlign: 'center', border: '1px solid #DEE2E6', borderRadius: '4px', fontSize: '14px' }} />
                                                        <button type="button" onClick={() => updateStock(p.id, p.stock + 1)} style={{ padding: '4px 12px', backgroundColor: '#FFFFFF', border: '1px solid #DEE2E6', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>+</button>
                                                        <span style={{ fontSize: '12px', color: '#6C757D', marginLeft: 'auto' }}>Max: {p.stock_max}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <button type="submit" disabled={processing} style={{ width: '100%', padding: '12px', backgroundColor: processing ? '#ADB5BD' : '#343A40', color: '#FFFFFF', fontWeight: '600', borderRadius: '6px', border: 'none', cursor: processing ? 'not-allowed' : 'pointer', fontSize: '14px' }}>
                                        {processing ? 'Modification...' : 'Enregistrer'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}