import { Link } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../../Components/Header';

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
        <div className="min-h-screen bg-snow">
            <Header currentPage="events" />

            <main className="p-4 lg:p-6 max-w-5xl mx-auto">
                <Link
                    href="/events"
                    className="inline-flex items-center gap-1 text-slate hover:text-dark text-sm mb-6 transition-colors"
                >
                    ← Retour aux événements
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Informations événement */}
                    <div className="bg-white rounded-2xl border border-slate/20 shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-dark mb-5">{evenement.nom}</h2>

                        <div className="divide-y divide-slate/10">
                            <div className="flex justify-between items-center py-3">
                                <span className="text-sm text-slate">Lieu</span>
                                <span className="text-sm font-medium text-dark">{evenement.lieu || 'Non précisé'}</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <span className="text-sm text-slate">Dates</span>
                                <span className="text-sm font-medium text-dark">
                                    {new Date(evenement.date_debut).toLocaleDateString('fr-FR')} → {new Date(evenement.date_fin).toLocaleDateString('fr-FR')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <span className="text-sm text-slate">Produits</span>
                                <span className="text-sm font-medium text-dark">{evenement.produits?.length || 0} produit(s)</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <span className="text-sm text-slate">Code d'accès</span>
                                <span className="text-sm font-mono font-semibold text-dark">{evenement.code_unique}</span>
                            </div>
                        </div>

                        {/* URL publique */}
                        <div className="mt-5 p-3 bg-snow border border-slate/20 rounded-xl">
                            <p className="text-xs font-semibold text-dark uppercase tracking-widest mb-1.5">URL d'accès public</p>
                            <p className="text-xs text-slate font-mono break-all">{eventUrl}</p>
                        </div>

                        <div className="mt-5">
                            <Link
                                href={`/events/${evenement.id_evenement}/edit`}
                                className="w-full h-11 flex items-center justify-center bg-slate/10 hover:bg-slate/20 text-slate hover:text-dark border border-slate/20 rounded-xl text-sm font-medium transition-colors"
                            >
                                ✏️ Modifier l'événement
                            </Link>
                        </div>
                    </div>

                    {/* QR Code clients */}
                    <div className="bg-white rounded-2xl border border-slate/20 shadow-sm p-6 flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-dark mb-5 text-center">QR Code pour vos clients</h3>

                        <div className="p-6 bg-snow rounded-xl mb-4">
                            <QRCodeSVG
                                id="qr-code-event"
                                value={eventUrl}
                                size={220}
                                level="H"
                                marginSize={4}
                            />
                        </div>

                        <p className="text-sm text-slate text-center mb-5 leading-relaxed">
                            Vos clients scannent ce code pour voir votre catalogue
                        </p>

                        <button
                            onClick={downloadQR}
                            className="w-full h-11 bg-slate/10 hover:bg-slate/20 text-slate hover:text-dark border border-slate/20 rounded-xl text-sm font-medium transition-colors mb-3"
                        >
                            📥 Télécharger le QR Code
                        </button>

                        <div className="w-full p-3 bg-ember/5 border border-ember/20 rounded-xl">
                            <p className="text-xs text-ember text-center font-medium">
                                💡 Affichez ce QR code sur votre stand !
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
