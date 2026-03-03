import { Link } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';

export default function Show({ evenement }) {
    const downloadQR = () => {
        const svg = document.getElementById('qr-code-event');
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
            downloadLink.download = `qr-event-${evenement.code_unique}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    const eventUrl = window.location.origin + '/events/' + evenement.code_unique;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DEE2E6', padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ fontSize: '20px', fontWeight: '600', color: '#2C3E50', textDecoration: 'none' }}>CaisseMobile</Link>
                    <Link href="/logout" method="post" as="button" style={{ padding: '8px 16px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#495057' }}>Déconnexion</Link>
                </div>
            </header>

            <main style={{ padding: '32px 24px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <Link href="/events" style={{ color: '#6C757D', textDecoration: 'none', fontSize: '14px', marginBottom: '24px', display: 'inline-block' }}>← Retour aux événements</Link>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '32px', border: '1px solid #DEE2E6' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#2C3E50', marginBottom: '16px' }}>{evenement.nom}</h2>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #DEE2E6' }}>
                                    <span style={{ color: '#6C757D', fontSize: '14px' }}>Lieu</span>
                                    <span style={{ fontWeight: '500', fontSize: '14px', color: '#2C3E50' }}>{evenement.lieu || 'Non précisé'}</span>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #DEE2E6' }}>
                                    <span style={{ color: '#6C757D', fontSize: '14px' }}>Dates</span>
                                    <span style={{ fontWeight: '500', fontSize: '14px', color: '#2C3E50' }}>
                                        {new Date(evenement.date_debut).toLocaleDateString('fr-FR')} - {new Date(evenement.date_fin).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #DEE2E6' }}>
                                    <span style={{ color: '#6C757D', fontSize: '14px' }}>Code d'accès</span>
                                    <span style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '600', color: '#343A40' }}>{evenement.code_unique}</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#6C757D', fontSize: '14px' }}>Produits</span>
                                    <span style={{ fontWeight: '500', fontSize: '14px', color: '#2C3E50' }}>{evenement.produits?.length || 0} produit(s)</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#F8F9FA', borderRadius: '6px' }}>
                                <p style={{ fontSize: '13px', color: '#495057', marginBottom: '8px', fontWeight: '500' }}>URL d'accès public :</p>
                                <p style={{ fontSize: '12px', color: '#6C757D', fontFamily: 'monospace', wordBreak: 'break-all' }}>{eventUrl}</p>
                            </div>

                            <div style={{ marginTop: '24px' }}>
                                <Link href={`/events/${evenement.id_evenement}/edit`} style={{ width: '100%', padding: '12px', backgroundColor: '#343A40', color: '#FFFFFF', fontWeight: '600', borderRadius: '6px', textDecoration: 'none', textAlign: 'center', display: 'block', fontSize: '14px' }}>
                                    ✏️ Modifier l'événement
                                </Link>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '32px', border: '1px solid #DEE2E6', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2C3E50', marginBottom: '16px' }}>QR Code pour vos clients</h3>
                            
                            <div style={{ padding: '24px', backgroundColor: '#F8F9FA', borderRadius: '8px', marginBottom: '16px' }}>
                                <QRCodeSVG id="qr-code-event" value={eventUrl} size={250} level="H" includeMargin={true} />
                            </div>

                            <p style={{ fontSize: '13px', color: '#6C757D', textAlign: 'center', marginBottom: '16px' }}>
                                Vos clients scannent ce code pour voir votre catalogue
                            </p>

                            <button onClick={downloadQR} style={{ width: '100%', padding: '12px', backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#495057', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#E9ECEF'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#F8F9FA'}
                            >
                                📥 Télécharger le QR Code
                            </button>

                            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#FFF5E1', border: '1px solid #FFE0B2', borderRadius: '6px', width: '100%' }}>
                                <p style={{ fontSize: '12px', color: '#E65100', textAlign: 'center' }}>
                                    💡 Affichez ce QR code sur votre stand !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}