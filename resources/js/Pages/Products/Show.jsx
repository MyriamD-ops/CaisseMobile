import { Link } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../../Components/Header';

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
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <Header currentPage="products" />

            <main style={{ padding: '32px 24px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <Link href="/products" style={{ color: '#6C757D', textDecoration: 'none', fontSize: '14px' }}>← Retour aux produits</Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '32px', border: '1px solid #DEE2E6' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#2C3E50', marginBottom: '16px' }}>{product.nom}</h2>
                            
                            {product.description && (
                                <p style={{ color: '#6C757D', marginBottom: '24px', lineHeight: '1.6', fontSize: '14px' }}>{product.description}</p>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #DEE2E6' }}>
                                    <span style={{ color: '#6C757D', fontSize: '14px' }}>Prix</span>
                                    <span style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50' }}>{product.prix_base}€</span>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #DEE2E6' }}>
                                    <span style={{ color: '#6C757D', fontSize: '14px' }}>Catégorie</span>
                                    <span style={{ fontWeight: '500', fontSize: '14px', color: '#2C3E50' }}>{product.categorie}</span>
                                </div>
                                
                                {product.matiere && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #DEE2E6' }}>
                                        <span style={{ color: '#6C757D', fontSize: '14px' }}>Matériau</span>
                                        <span style={{ fontWeight: '500', fontSize: '14px', color: '#2C3E50' }}>{product.matiere}</span>
                                    </div>
                                )}
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #DEE2E6' }}>
                                    <span style={{ color: '#6C757D', fontSize: '14px' }}>Stock actuel</span>
                                    <span style={{ fontWeight: '500', fontSize: '14px', color: product.stock_actuel <= product.stock_minimum ? '#C53030' : '#2C3E50' }}>
                                        {product.stock_actuel} unités
                                    </span>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#6C757D', fontSize: '14px' }}>Code barre</span>
                                    <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#495057' }}>{product.code_barres}</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '24px' }}>
                                <Link href={'/products/' + product.id_produit + '/edit'} style={{ width: '100%', padding: '12px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '600', borderRadius: '6px', textDecoration: 'none', textAlign: 'center', display: 'block', fontSize: '14px' }}>
                                    ✏️ Modifier
                                </Link>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '32px', border: '1px solid #DEE2E6', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginBottom: '16px' }}>QR Code du produit</h3>
                            
                            <div style={{ padding: '24px', backgroundColor: '#F8F9FA', borderRadius: '8px', marginBottom: '16px' }}>
                                <QRCodeSVG id="qr-code" value={productUrl} size={200} level="H" includeMargin={true} />
                            </div>

                            <p style={{ fontSize: '12px', color: '#6C757D', textAlign: 'center', marginBottom: '16px' }}>
                                Scannez ce code pour accéder à la fiche produit
                            </p>

                            <button onClick={downloadQR} style={{ width: '100%', padding: '12px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#495057', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#E9ECEF'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#F8F9FA'}
                            >
                                📥 Télécharger le QR Code
                            </button>

                            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: '6px', width: '100%' }}>
                                <p style={{ fontSize: '12px', color: '#C53030', textAlign: 'center' }}>
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
