import { Link } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';

export default function Show({ product }) {
    const downloadQR = () => {
        const svg = document.getElementById('qr-code');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');
            
            const downloadLink = document.createElement('a');
            downloadLink.download = `qr-${product.nom.replace(/\s+/g, '-')}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    const productUrl = window.location.origin + '/products/' + product.id_produit + '/view';

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

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        {/* Informations produit */}
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
                                {product.nom}
                            </h2>
                            
                            {product.description && (
                                <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
                                    {product.description}
                                </p>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                                    <span style={{ color: '#6b7280' }}>Prix</span>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#f43f5e' }}>{product.prix_base}€</span>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                                    <span style={{ color: '#6b7280' }}>Catégorie</span>
                                    <span style={{ fontWeight: '500' }}>{product.categorie}</span>
                                </div>
                                
                                {product.matiere && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                                        <span style={{ color: '#6b7280' }}>Matériau</span>
                                        <span style={{ fontWeight: '500' }}>{product.matiere}</span>
                                    </div>
                                )}
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                                    <span style={{ color: '#6b7280' }}>Stock actuel</span>
                                    <span style={{ fontWeight: '500', color: product.stock_actuel <= product.stock_minimum ? '#991b1b' : '#166534' }}>
                                        {product.stock_actuel} unités
                                    </span>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#6b7280' }}>Code barre</span>
                                    <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{product.code_barres}</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                                <Link href={'/products/' + product.id_produit + '/edit'} style={{ flex: 1, padding: '12px', background: 'linear-gradient(to right, #f43f5e, #fbbf24)', color: 'white', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', textAlign: 'center' }}>
                                    ✏️ Modifier
                                </Link>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                                QR Code du produit
                            </h3>
                            
                            <div style={{ padding: '24px', backgroundColor: '#f9fafb', borderRadius: '8px', marginBottom: '16px' }}>
                                <QRCodeSVG
                                    id="qr-code"
                                    value={productUrl}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>

                            <p style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center', marginBottom: '16px' }}>
                                Scannez ce code pour accéder à la fiche produit
                            </p>

                            <button
                                onClick={downloadQR}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#f3f4f6',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#374151'
                                }}
                            >
                                📥 Télécharger le QR Code
                            </button>

                            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fef3c7', borderRadius: '8px', width: '100%' }}>
                                <p style={{ fontSize: '12px', color: '#92400e', textAlign: 'center' }}>
                                    💡 Imprimez ce QR code pour vos étiquettes produit
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
