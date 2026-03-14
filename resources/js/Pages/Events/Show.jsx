import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../../Components/Header';

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > maxWidth && n > 0) {
            ctx.fillText(line.trim(), x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line.trim(), x, currentY);
    return currentY;
}

export default function Show({ evenement }) {
    const { auth } = usePage().props;
    const [generating, setGenerating] = useState(false);

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

    const generateFlyer = () => {
        setGenerating(true);

        const SIZE = 1080;
        const canvas = document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext('2d');

        // --- Fond ---
        ctx.fillStyle = '#3A3F43';
        ctx.fillRect(0, 0, SIZE, SIZE);

        // --- Bande orange haut ---
        ctx.fillStyle = '#DC5F00';
        ctx.fillRect(0, 0, SIZE, 10);

        // --- Nom "3D Ami" ---
        ctx.fillStyle = '#DC5F00';
        ctx.font = 'bold 100px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('3D Ami', SIZE / 2, 175);

        // --- Sous-titre ---
        ctx.fillStyle = '#C8CDD2';
        ctx.font = '32px Arial, sans-serif';
        ctx.fillText('Agence de Modélisation et d\'Impression', SIZE / 2, 225);

        // --- Séparateur 1 ---
        ctx.strokeStyle = '#DC5F00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(80, 265);
        ctx.lineTo(SIZE - 80, 265);
        ctx.stroke();

        // --- Nom de l'événement ---
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 72px Arial, sans-serif';
        const lastY = wrapText(ctx, evenement.nom, SIZE / 2, 370, 920, 85);

        // --- Date ---
        const opts = { day: 'numeric', month: 'long', year: 'numeric' };
        const dateDebut = new Date(evenement.date_debut).toLocaleDateString('fr-FR', opts);
        const dateFin   = new Date(evenement.date_fin).toLocaleDateString('fr-FR', opts);
        const dateStr   = evenement.date_debut === evenement.date_fin
            ? dateDebut
            : `Du ${dateDebut} au ${dateFin}`;

        const dateY = lastY + 90;
        ctx.fillStyle = '#DC5F00';
        ctx.font = 'bold 38px Arial, sans-serif';
        ctx.fillText(dateStr, SIZE / 2, dateY);

        // --- Lieu ---
        if (evenement.lieu) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '34px Arial, sans-serif';
            ctx.fillText(evenement.lieu, SIZE / 2, dateY + 60);
        }

        // --- Séparateur 2 ---
        const sep2Y = Math.max(dateY + 130, 750);
        ctx.strokeStyle = '#DC5F00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(80, sep2Y);
        ctx.lineTo(SIZE - 80, sep2Y);
        ctx.stroke();

        // --- Instagram ---
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 40px Arial, sans-serif';
        ctx.fillText('@nath.ami3d972', SIZE / 2, sep2Y + 75);

        // --- Téléphone ---
        ctx.fillStyle = '#C8CDD2';
        ctx.font = '36px Arial, sans-serif';
        ctx.fillText('06 96 80 29 73', SIZE / 2, sep2Y + 130);

        // --- Artisanat Martinik ---
        ctx.fillStyle = '#DC5F00';
        ctx.font = 'bold 30px Arial, sans-serif';
        ctx.fillText('Artisanat Martinik', SIZE / 2, SIZE - 50);

        // --- Bande orange bas ---
        ctx.fillStyle = '#DC5F00';
        ctx.fillRect(0, SIZE - 10, SIZE, 10);

        // --- Téléchargement ---
        const slug = evenement.nom.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const link = document.createElement('a');
        link.download = `flyer-${slug}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        setGenerating(false);
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

                        <div className="mt-5 flex flex-col gap-3">
                            <Link
                                href={`/events/${evenement.id_evenement}/edit`}
                                className="w-full h-11 flex items-center justify-center bg-slate/10 hover:bg-slate/20 text-slate hover:text-dark border border-slate/20 rounded-xl text-sm font-medium transition-colors"
                            >
                                ✏️ Modifier l'événement
                            </Link>

                            {auth?.user && (
                                <button
                                    onClick={generateFlyer}
                                    disabled={generating}
                                    className="w-full h-11 flex items-center justify-center bg-ember hover:bg-ember/90 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors"
                                >
                                    {generating ? '⏳ Génération...' : '📸 Générer flyer Instagram'}
                                </button>
                            )}
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
