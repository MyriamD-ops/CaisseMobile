const formatDateFR = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
};

const dateRange = (ev) => {
    const d1 = formatDateFR(ev.date_debut);
    if (!ev.date_fin || ev.date_debut === ev.date_fin) return d1;
    return `Du ${d1} au ${formatDateFR(ev.date_fin)}`;
};

const qrSrc = (ev) => {
    const code = ev.code_public || ev.code_unique;
    if (!code) return null;
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    const url = encodeURIComponent(`${base}/events/${code}`);
    return `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${url}`;
};

// ─── Template 1 : Prestige ───────────────────────────────────────────────────
// Bicolonne : panel gauche vert foncé avec photo bijoux, panel droit blanc
function generatePrestige(ev) {
    const date  = dateRange(ev);
    const src   = qrSrc(ev);

    const lieuBlock = ev.lieu
        ? `<div style="display:flex;align-items:center;gap:10px;margin-bottom:28px;">
               <span style="font-size:16px;">📍</span>
               <span style="font-size:15px;color:#666C7B;font-family:Arial,sans-serif;">${ev.lieu}</span>
           </div>`
        : '<div style="margin-bottom:28px;"></div>';

    const qrBlock = src
        ? `<div style="border:2px solid #EEEEEE;border-radius:10px;padding:12px;display:inline-block;">
               <img src="${src}" style="width:150px;height:150px;display:block;" crossorigin="anonymous" alt="QR">
               <p style="font-size:10px;color:#999;text-align:center;margin:5px 0 0;font-family:Arial,sans-serif;">Scanner pour voir le catalogue</p>
           </div>`
        : '';

    return `<div style="width:1080px;height:1080px;display:flex;font-family:Georgia,serif;overflow:hidden;background:#fff;">
        <div style="width:400px;min-width:400px;height:1080px;position:relative;overflow:hidden;background:#1C3830;">
            <img src="/images/bijoux.png" style="width:100%;height:100%;object-fit:cover;" alt="">
            <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(28,56,48,0.15) 0%,rgba(28,56,48,0.65) 100%);"></div>
            <div style="position:absolute;bottom:0;left:0;right:0;padding:32px 28px;background:linear-gradient(to top,rgba(28,56,48,0.95),transparent);">
                <div style="width:32px;height:3px;background:#DC5F00;margin-bottom:10px;"></div>
                <p style="color:rgba(255,255,255,0.55);font-size:12px;letter-spacing:4px;text-transform:uppercase;margin:0 0 3px;font-family:Arial,sans-serif;">Artisanat</p>
                <p style="color:#DC5F00;font-size:14px;letter-spacing:5px;text-transform:uppercase;font-weight:bold;margin:0;font-family:Arial,sans-serif;">Martinik</p>
            </div>
        </div>
        <div style="flex:1;height:1080px;background:#fff;display:flex;flex-direction:column;padding:62px 50px;box-sizing:border-box;">
            <div style="margin-bottom:5px;">
                <span style="font-size:62px;font-weight:900;color:#DC5F00;font-family:Georgia,serif;line-height:1;">3D Ami</span>
            </div>
            <p style="font-size:11px;color:#666C7B;letter-spacing:3px;text-transform:uppercase;margin:0 0 46px;font-family:Arial,sans-serif;">Agence de Modélisation et d'Impression</p>
            <div style="width:44px;height:4px;background:#DC5F00;margin-bottom:38px;border-radius:2px;"></div>
            <h2 style="font-size:36px;font-weight:700;color:#3A3F43;line-height:1.25;margin:0 0 26px;word-wrap:break-word;overflow-wrap:break-word;">${ev.nom}</h2>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
                <span style="font-size:16px;">📅</span>
                <span style="font-size:16px;color:#DC5F00;font-weight:600;font-family:Arial,sans-serif;">${date}</span>
            </div>
            ${lieuBlock}
            <div style="margin-bottom:auto;">
                ${qrBlock}
            </div>
            <div style="padding-top:28px;border-top:1px solid #EEEEEE;margin-top:auto;">
                <p style="font-size:15px;font-weight:700;color:#3A3F43;margin:0 0 3px;font-family:Arial,sans-serif;">@nath.ami3d972</p>
                <p style="font-size:13px;color:#666C7B;margin:0;font-family:Arial,sans-serif;">06 96 80 29 73</p>
            </div>
        </div>
    </div>`;
}

// ─── Template 2 : Alpinia ────────────────────────────────────────────────────
// Bicolonne : panel gauche violet profond avec photo, panel droit crème
// Signature visuelle "Excellence 3D", titre plus imposant
function generateAlpinia(ev) {
    const date = dateRange(ev);
    const src  = qrSrc(ev);

    const lieuBlock = ev.lieu
        ? `<p style="font-size:14px;color:#8B7355;font-family:Arial,sans-serif;margin:0 0 24px;">📍 ${ev.lieu}</p>`
        : '';

    const qrBlock = src
        ? `<div style="margin:20px 0;padding:12px;background:#fff;border-radius:10px;border:1px solid #E8E0D0;display:inline-block;">
               <img src="${src}" style="width:130px;height:130px;display:block;" crossorigin="anonymous" alt="QR">
               <p style="font-size:10px;color:#999;text-align:center;margin:6px 0 0;font-family:Arial,sans-serif;">Scanner le catalogue</p>
           </div>`
        : '';

    return `<div style="width:1080px;height:1080px;display:flex;font-family:Georgia,serif;overflow:hidden;background:#FEFDF6;">
        <div style="width:410px;min-width:410px;height:1080px;position:relative;overflow:hidden;background:#2B1F42;">
            <img src="/images/bijoux.png" style="width:100%;height:100%;object-fit:cover;mix-blend-mode:luminosity;opacity:0.55;" alt="">
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(43,31,66,0.25),rgba(43,31,66,0.80));"></div>
            <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
                <p style="color:rgba(255,255,255,0.4);font-size:11px;letter-spacing:6px;text-transform:uppercase;margin:0 0 14px;font-family:Arial,sans-serif;">Excellence</p>
                <p style="color:#DC5F00;font-size:56px;font-weight:900;line-height:1;margin:0;text-shadow:0 2px 20px rgba(0,0,0,0.5);">3D</p>
                <p style="color:#fff;font-size:44px;font-weight:400;line-height:1;margin:0 0 16px;font-family:Georgia,serif;">Ami</p>
                <div style="width:40px;height:2px;background:#DC5F00;margin:0 auto;"></div>
            </div>
            <div style="position:absolute;bottom:32px;left:0;right:0;text-align:center;">
                <p style="color:rgba(255,255,255,0.45);font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0;font-family:Arial,sans-serif;">Artisanat Martinik</p>
            </div>
        </div>
        <div style="flex:1;height:1080px;background:#FEFDF6;display:flex;flex-direction:column;justify-content:center;padding:64px 52px;box-sizing:border-box;position:relative;">
            <div style="position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(to right,#DC5F00,#FF8C42);"></div>
            <p style="font-size:12px;color:#DC5F00;letter-spacing:5px;text-transform:uppercase;margin:0 0 18px;font-family:Arial,sans-serif;">Événement</p>
            <h1 style="font-size:46px;font-weight:700;color:#2B1F42;line-height:1.2;margin:0 0 24px;word-wrap:break-word;overflow-wrap:break-word;font-family:Georgia,serif;">${ev.nom}</h1>
            <div style="width:56px;height:3px;background:#DC5F00;margin-bottom:26px;border-radius:2px;"></div>
            <p style="font-size:18px;color:#DC5F00;font-weight:600;margin:0 0 14px;font-family:Arial,sans-serif;">📅 ${date}</p>
            ${lieuBlock}
            ${qrBlock}
            <div style="margin-top:auto;padding-top:28px;border-top:1px solid rgba(43,31,66,0.12);">
                <p style="font-size:15px;font-weight:700;color:#2B1F42;margin:0 0 3px;font-family:Arial,sans-serif;">@nath.ami3d972</p>
                <p style="font-size:13px;color:#8B7355;margin:0;font-family:Arial,sans-serif;">06 96 80 29 73</p>
            </div>
            <div style="position:absolute;bottom:0;left:0;right:0;height:5px;background:linear-gradient(to right,#DC5F00,#FF8C42);"></div>
        </div>
    </div>`;
}

// ─── Template 3 : Simple ─────────────────────────────────────────────────────
// Fond blanc, centré, typographie Urban, header sombre, cards de données
function generateSimple(ev) {
    const date = dateRange(ev);
    const src  = qrSrc(ev);

    const lieuCard = ev.lieu
        ? `<div style="background:#EEEEEE;border-radius:16px;padding:20px 32px;min-width:180px;flex:1;">
               <p style="font-size:11px;color:#666C7B;letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;font-family:Arial,sans-serif;">Lieu</p>
               <p style="font-size:18px;font-weight:700;color:#3A3F43;margin:0;font-family:Arial,sans-serif;">${ev.lieu}</p>
           </div>`
        : '';

    const qrBlock = src
        ? `<div style="padding:14px;background:#EEEEEE;border-radius:12px;display:inline-block;margin-top:32px;">
               <img src="${src}" style="width:120px;height:120px;display:block;margin:0 auto;" crossorigin="anonymous" alt="QR">
               <p style="font-size:10px;color:#666C7B;text-align:center;margin:8px 0 0;font-family:Arial,sans-serif;">Scanner pour voir le catalogue</p>
           </div>`
        : '';

    return `<div style="width:1080px;height:1080px;background:#fff;font-family:Arial,sans-serif;overflow:hidden;box-sizing:border-box;display:flex;flex-direction:column;">
        <div style="background:#3A3F43;padding:32px 60px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
            <span style="font-size:54px;font-weight:900;color:#DC5F00;font-family:Georgia,serif;line-height:1;">3D Ami</span>
            <div style="text-align:right;">
                <p style="color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 2px;">Agence de Modélisation</p>
                <p style="color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0;">et d'Impression</p>
            </div>
        </div>
        <div style="height:6px;background:#DC5F00;flex-shrink:0;"></div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 60px;box-sizing:border-box;text-align:center;">
            <p style="font-size:13px;color:#DC5F00;letter-spacing:5px;text-transform:uppercase;margin:0 0 22px;">Événement à venir</p>
            <h1 style="font-size:52px;font-weight:900;color:#3A3F43;line-height:1.2;margin:0 0 36px;max-width:900px;word-wrap:break-word;overflow-wrap:break-word;">${ev.nom}</h1>
            <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;max-width:800px;">
                <div style="background:#3A3F43;border-radius:16px;padding:20px 32px;flex:1;min-width:180px;">
                    <p style="font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;">Date</p>
                    <p style="font-size:18px;font-weight:700;color:#DC5F00;margin:0;">${date}</p>
                </div>
                ${lieuCard}
            </div>
            ${qrBlock}
        </div>
        <div style="background:#EEEEEE;padding:24px 60px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
            <div>
                <p style="font-size:16px;font-weight:700;color:#3A3F43;margin:0 0 2px;">@nath.ami3d972</p>
                <p style="font-size:14px;color:#666C7B;margin:0;">06 96 80 29 73</p>
            </div>
            <p style="font-size:13px;color:#DC5F00;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0;">Artisanat Martinik</p>
        </div>
    </div>`;
}

// ─── Template 4 : Géo ────────────────────────────────────────────────────────
// Fond blanc, bande orange diagonale en haut-droite, card dark au centre
function generateGeo(ev) {
    const date = dateRange(ev);
    const src  = qrSrc(ev);

    const qrBlock = src
        ? `<div style="text-align:center;flex-shrink:0;">
               <img src="${src}" style="width:140px;height:140px;display:block;margin:0 auto;border-radius:8px;" crossorigin="anonymous" alt="QR">
               <p style="font-size:10px;color:rgba(255,255,255,0.45);text-align:center;margin:8px 0 0;font-family:Arial,sans-serif;">Scanner le catalogue</p>
           </div>`
        : '';

    const lieuBlock = ev.lieu
        ? `<p style="font-size:14px;color:rgba(255,255,255,0.55);margin:10px 0 0;font-family:Arial,sans-serif;">📍 ${ev.lieu}</p>`
        : '';

    return `<div style="width:1080px;height:1080px;background:#fff;font-family:Arial,sans-serif;overflow:hidden;position:relative;">
        <div style="position:absolute;top:-150px;right:-120px;width:620px;height:760px;background:#DC5F00;transform:rotate(15deg);z-index:0;"></div>
        <div style="position:relative;z-index:1;width:100%;height:100%;display:flex;flex-direction:column;">
            <div style="padding:52px 60px 0;flex-shrink:0;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                    <div style="line-height:1;">
                        <span style="font-size:84px;font-weight:900;color:#fff;font-family:Georgia,serif;text-shadow:0 4px 20px rgba(0,0,0,0.25);">3D</span>
                        <span style="font-size:84px;font-weight:400;color:#fff;font-family:Georgia,serif;text-shadow:0 4px 20px rgba(0,0,0,0.25);"> Ami</span>
                    </div>
                    <div style="text-align:right;padding-top:16px;">
                        <p style="font-size:12px;color:rgba(255,255,255,0.75);letter-spacing:3px;text-transform:uppercase;margin:0 0 3px;">Agence de</p>
                        <p style="font-size:12px;color:rgba(255,255,255,0.75);letter-spacing:3px;text-transform:uppercase;margin:0;">Modélisation &amp; Impression</p>
                    </div>
                </div>
            </div>
            <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:32px 60px;">
                <div style="background:#3A3F43;border-radius:24px;padding:48px;box-shadow:0 24px 64px rgba(0,0,0,0.18);">
                    <p style="font-size:12px;color:#DC5F00;letter-spacing:4px;text-transform:uppercase;margin:0 0 16px;">Événement</p>
                    <h1 style="font-size:46px;font-weight:900;color:#fff;line-height:1.2;margin:0 0 32px;word-wrap:break-word;overflow-wrap:break-word;">${ev.nom}</h1>
                    <div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap;">
                        <div style="flex:1;min-width:220px;">
                            <p style="font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:3px;text-transform:uppercase;margin:0 0 6px;">Date</p>
                            <p style="font-size:18px;font-weight:700;color:#DC5F00;margin:0;">${date}</p>
                            ${lieuBlock}
                        </div>
                        ${qrBlock}
                    </div>
                </div>
            </div>
            <div style="padding:0 60px 48px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
                <div>
                    <p style="font-size:16px;font-weight:700;color:#3A3F43;margin:0 0 2px;">@nath.ami3d972</p>
                    <p style="font-size:14px;color:#666C7B;margin:0;">06 96 80 29 73</p>
                </div>
                <p style="font-size:13px;color:#DC5F00;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0;">Artisanat Martinik</p>
            </div>
        </div>
    </div>`;
}

// ─── Export ───────────────────────────────────────────────────────────────────
export const TEMPLATES = [
    {
        id: 'prestige',
        label: 'Prestige',
        preview: '🌿',
        previewBg: '#1C3830',
        previewText: '#fff',
        generateHTML: generatePrestige,
    },
    {
        id: 'alpinia',
        label: 'Alpinia',
        preview: '🌺',
        previewBg: '#2B1F42',
        previewText: '#fff',
        generateHTML: generateAlpinia,
    },
    {
        id: 'simple',
        label: 'Simple',
        preview: '⬜',
        previewBg: '#EEEEEE',
        previewText: '#3A3F43',
        generateHTML: generateSimple,
    },
    {
        id: 'geo',
        label: 'Géo',
        preview: '◆',
        previewBg: '#DC5F00',
        previewText: '#fff',
        generateHTML: generateGeo,
    },
];
