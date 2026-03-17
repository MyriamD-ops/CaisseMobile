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
// Bicolonne : panel gauche vert #0f2f1f→#1e4a2a avec bijoux.png,
// panel droit blanc, logo "✧AMI OFFICIEL / AMI 3D / Modélisation•Impression"
function generatePrestige(ev) {
    const date = dateRange(ev);
    const src  = qrSrc(ev);

    const lieuBlock = ev.lieu
        ? `<p style="font-size:14px;color:#666C7B;margin:0 0 28px;font-family:Arial,sans-serif;">🌺 ${ev.lieu}</p>`
        : `<div style="margin-bottom:28px;"></div>`;

    const qrImg = src
        ? `<div style="border:2px solid #EEEEEE;border-radius:10px;padding:10px;flex-shrink:0;">
               <img src="${src}" style="width:110px;height:110px;display:block;" crossorigin="anonymous" alt="QR">
           </div>`
        : '';

    return `<div style="width:1080px;height:1080px;display:flex;font-family:Georgia,serif;overflow:hidden;">

        <!-- Panel gauche 45% -->
        <div style="width:486px;min-width:486px;height:1080px;background:linear-gradient(180deg,#0f2f1f 0%,#1e4a2a 100%);position:relative;overflow:hidden;">
            <img src="/images/bijoux.png" style="width:100%;height:75%;object-fit:cover;opacity:0.65;display:block;" alt="">
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(15,47,31,0.25) 50%,rgba(15,47,31,0.95) 100%);"></div>
            <!-- Citation bas -->
            <div style="position:absolute;bottom:0;left:0;right:0;padding:44px 38px;text-align:center;">
                <p style="color:rgba(255,255,255,0.6);font-size:15px;font-style:italic;line-height:1.7;margin:0 0 18px;font-family:Georgia,serif;">"L'élégance naturelle<br>à votre portée"</p>
                <div style="width:40px;height:1px;background:#DC5F00;margin:0 auto 14px;"></div>
                <p style="color:#DC5F00;font-size:11px;letter-spacing:5px;text-transform:uppercase;margin:0;font-family:Arial,sans-serif;">ALPINIA • MARTINIQUE</p>
            </div>
        </div>

        <!-- Panel droit 55% -->
        <div style="flex:1;height:1080px;background:#ffffff;display:flex;flex-direction:column;padding:52px 50px;box-sizing:border-box;">

            <!-- Logo — original -->
            <div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:10px;">
                <img src="/images/logo.jpg" style="width:70px;height:70px;object-fit:contain;flex-shrink:0;" alt="Logo AMI 3D">
                <div>
                    <p style="font-size:9px;color:#888;letter-spacing:6px;text-transform:uppercase;margin:0 0 3px;font-family:Arial,sans-serif;">OFFICIEL</p>
                    <p style="font-size:20px;font-weight:700;color:#3A3F43;letter-spacing:1px;margin:0 0 2px;font-family:Arial,sans-serif;">AMI 3D</p>
                    <p style="font-size:11px;color:#aaa;letter-spacing:2px;margin:0;font-family:Arial,sans-serif;">Modélisation•Impression</p>
                </div>
            </div>

            <div style="width:44px;height:3px;background:#DC5F00;margin-bottom:32px;border-radius:2px;"></div>

            <!-- Section événement — original -->
            <div style="background:#f8f8f8;border-left:4px solid #DC5F00;padding:26px 30px;border-radius:0 14px 14px 0;margin-bottom:22px;">
                <h2 style="font-size:32px;font-weight:700;color:#3A3F43;line-height:1.25;margin:0 0 14px;word-wrap:break-word;overflow-wrap:break-word;font-family:Georgia,serif;">${ev.nom}</h2>
                <p style="font-size:16px;color:#DC5F00;font-weight:600;margin:0;font-family:Arial,sans-serif;">${date}</p>
            </div>

            <!-- Adresse -->
            ${lieuBlock}

            <!-- QR + Contact — original -->
            <div style="display:flex;align-items:center;gap:22px;margin-bottom:auto;">
                ${qrImg}
                <div>
                    <p style="font-size:14px;font-weight:700;color:#3A3F43;margin:0 0 5px;font-family:Arial,sans-serif;">@nath.ami3d972</p>
                    <p style="font-size:13px;color:#666C7B;margin:0;font-family:Arial,sans-serif;">☎ 06 96 80 29 73</p>
                </div>
            </div>

            <!-- Footer — original -->
            <div style="margin-top:32px;padding-top:20px;border-top:1px solid #EEEEEE;display:flex;align-items:center;">
                <p style="font-size:11px;color:#DC5F00;letter-spacing:2px;text-transform:uppercase;margin:0;font-family:Arial,sans-serif;">Qualité Antillaise</p>
            </div>
        </div>
    </div>`;
}

// ─── Template 2 : Alpinia ────────────────────────────────────────────────────
// Bicolonne : panel gauche vert #1a3f2c→#2a5a3a avec bijoux.png,
// panel droit crème, "EXCELLENCE 3D / AMI 3D. / Agence de Modélisation..."
function generateAlpinia(ev) {
    const date = dateRange(ev);
    const src  = qrSrc(ev);

    const lieuBlock = ev.lieu
        ? `<p style="font-size:18px;color:#666C7B;margin:0 0 20px;font-family:Arial,sans-serif;">🌿 ${ev.lieu}</p>`
        : `<div style="margin-bottom:20px;"></div>`;

    const qrImg = src
        ? `<div style="border:1px solid #e8e0d0;border-radius:12px;padding:14px;flex-shrink:0;display:flex;align-items:center;">
               <img src="${src}" style="width:220px;height:220px;display:block;" crossorigin="anonymous" alt="QR">
           </div>`
        : '';

    return `<div style="width:1080px;height:1080px;display:flex;font-family:Georgia,serif;overflow:hidden;">

        <!-- Panel gauche 45% -->
        <div style="width:486px;min-width:486px;height:1080px;background:linear-gradient(180deg,#1a3f2c 0%,#2a5a3a 100%);position:relative;overflow:hidden;">
            <img src="/images/bijoux.png" style="width:100%;height:75%;object-fit:cover;opacity:0.55;mix-blend-mode:multiply;display:block;" alt="">
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(26,63,44,0.35) 45%,rgba(26,63,44,0.95) 100%);"></div>
            <!-- Citation bas -->
            <div style="position:absolute;bottom:0;left:0;right:0;padding:44px 38px;text-align:center;">
                <p style="color:rgba(255,255,255,0.6);font-size:15px;font-style:italic;line-height:1.7;margin:0 0 18px;font-family:Georgia,serif;">"La beauté des Antilles<br>sublimée en 3D"</p>
                <div style="width:40px;height:1px;background:#DC5F00;margin:0 auto 14px;"></div>
                <p style="color:#DC5F00;font-size:11px;letter-spacing:5px;text-transform:uppercase;margin:0;font-family:Arial,sans-serif;">✧ FLEUR D'ALPINIA ✧</p>
            </div>
        </div>

        <!-- Panel droit 55% -->
        <div style="flex:1;height:1080px;background:#FEFDF6;display:flex;flex-direction:column;padding:52px 50px;box-sizing:border-box;position:relative;">
            <div style="position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(to right,#DC5F00,#FF8C42);"></div>

            <!-- Logo — style noir/gris, taille augmentée -->
            <div style="display:flex;align-items:flex-start;gap:20px;margin-bottom:10px;">
                <img src="/images/logo.jpg" style="width:90px;height:90px;object-fit:contain;flex-shrink:0;" alt="Logo AMI 3D">
                <div>
                    <p style="font-size:13px;color:#888;letter-spacing:6px;text-transform:uppercase;margin:0 0 4px;font-family:Arial,sans-serif;">OFFICIEL</p>
                    <p style="font-size:28px;font-weight:700;color:#3A3F43;letter-spacing:1px;margin:0 0 4px;font-family:Arial,sans-serif;">AMI 3D</p>
                    <p style="font-size:16px;color:#aaa;letter-spacing:2px;margin:0;font-family:Arial,sans-serif;">Modélisation•Impression</p>
                </div>
            </div>

            <div style="width:44px;height:3px;background:#DC5F00;margin-bottom:100px;border-radius:2px;"></div>
            <div style="background:#f8f8f8;border-left:6px solid #DC5F00;border-radius:0 14px 14px 0;padding:36px 40px;margin-bottom:28px;">
                <h2 style="font-size:42px;font-weight:700;color:#3A3F43;line-height:1.25;margin:0 0 18px;word-wrap:break-word;overflow-wrap:break-word;font-family:Georgia,serif;">${ev.nom}</h2>
                <p style="font-size:20px;color:#DC5F00;font-weight:600;margin:0;font-family:Arial,sans-serif;">✦ ${date}</p>
            </div>

            <!-- QR + Colonne droite : adresse en haut, contact en bas -->
            <div style="display:flex;align-items:flex-end;gap:28px;margin-top:auto;">
                ${qrImg}
                <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;align-self:stretch;">
                    <div>
                        <p style="font-size:18px;color:#666C7B;margin:0;font-family:Arial,sans-serif;">🌿 ${ev.lieu || ''}</p>
                    </div>
                    <div>
                        <p style="font-size:18px;font-weight:700;color:#3A3F43;margin:0 0 8px;font-family:Arial,sans-serif;">@nath.ami3d972</p>
                        <p style="font-size:16px;color:#666C7B;margin:0;font-family:Arial,sans-serif;">📞 06 96 80 29 73</p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(42,90,58,0.15);display:flex;align-items:center;">
                <p style="font-size:13px;color:#2a5a3a;letter-spacing:2px;text-transform:uppercase;margin:0;font-family:Arial,sans-serif;">Impression locale</p>
            </div>

            <div style="position:absolute;bottom:0;left:0;right:0;height:5px;background:linear-gradient(to right,#DC5F00,#FF8C42);"></div>
        </div>
    </div>`;
}

// ─── Template 3 : Simple ─────────────────────────────────────────────────────
// Carte 3D Ami : fond #eeeeee, carte blanche border-radius:40px,
// header "AMI 3D" 120px, section événement, photo + QR, footer
function generateSimple(ev) {
    const date = dateRange(ev);
    const src  = qrSrc(ev);

    const lieuLine = ev.lieu
        ? `<p style="font-size:20px;color:#666C7B;margin:10px 0 0;font-family:Arial,sans-serif;">📍 ${ev.lieu}</p>`
        : '';

    const qrBlock = src
        ? `<img src="${src}" style="width:180px;height:180px;display:block;margin:0 auto 14px;" crossorigin="anonymous" alt="QR">
           <p style="font-size:14px;font-weight:700;color:#3A3F43;text-align:center;margin:0;letter-spacing:1px;font-family:Arial,sans-serif;">Scannez-moi !</p>`
        : `<p style="font-size:13px;color:#666C7B;text-align:center;margin:0;font-family:Arial,sans-serif;">Pas de QR disponible</p>`;

    return `<div style="width:1080px;height:1080px;background:#eeeeee;padding:40px;box-sizing:border-box;font-family:Arial,sans-serif;">
        <div style="width:100%;height:100%;background:#ffffff;border-radius:40px;padding:30px 50px 50px;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;">

            <!-- Header centré — "3D AMI" remonté, sous-titre plus bas et lisible -->
            <div style="text-align:center;margin-bottom:10px;flex-shrink:0;">
                <img src="/images/logo.jpg" style="width:100px;height:100px;object-fit:contain;margin-bottom:16px;" alt="Logo AMI 3D">
                <p style="font-size:120px;font-weight:900;color:#3A3F43;line-height:0.9;margin:0 0 48px;font-family:Georgia,serif;">AMI 3D</p>
                <p style="font-size:18px;color:#666C7B;letter-spacing:5px;text-transform:uppercase;margin:0 0 16px;font-family:Arial,sans-serif;">Modélisation &amp; Impression 3D</p>
                <div style="width:80px;height:4px;background:#DC5F00;margin:0 auto;border-radius:2px;"></div>
            </div>

            <!-- Section événement — espace agrandi avant le nom -->
            <div style="text-align:center;margin-top:32px;margin-bottom:24px;flex-shrink:0;">
                <h2 style="font-size:64px;font-weight:900;color:#3A3F43;line-height:1.1;margin:0 0 14px;word-wrap:break-word;overflow-wrap:break-word;">${ev.nom}</h2>
                <p style="font-size:24px;color:#DC5F00;font-weight:700;margin:0;">${date}</p>
                ${lieuLine}
            </div>

            <!-- Section media : photo réduite + QR agrandi -->
            <div style="flex:1;display:flex;gap:20px;min-height:0;">
                <!-- Zone photo — réduite -->
                <div style="flex:1;border-radius:20px;overflow:hidden;position:relative;background:linear-gradient(135deg,#d8d8d8,#b8b8b8);">
                    <img src="/images/bijoux.png" style="width:100%;height:100%;object-fit:cover;display:block;" alt="">
                    <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(58,63,67,0.25),transparent);"></div>
                </div>
                <!-- QR code — plus grand -->
                <div style="flex:1.4;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#EEEEEE;border-radius:20px;padding:24px;box-sizing:border-box;">
                    ${qrBlock}
                </div>
            </div>

            <!-- Footer -->
            <div style="margin-top:24px;padding-top:20px;border-top:2px solid #EEEEEE;display:flex;align-items:center;flex-shrink:0;">
                <p style="font-size:15px;color:#666C7B;margin:0;">@nath.ami3d972 &nbsp;•&nbsp; 📞 06 96 80 29 73</p>
            </div>
        </div>
    </div>`;
}

// ─── Template 4 : Géo ────────────────────────────────────────────────────────
// Fond blanc, bande orange diagonale, titre "3D AMI" 100px,
// event-box border-radius:80px 20px 80px 20px, address-box, photo + QR grille
function generateGeo(ev) {
    const date = dateRange(ev);
    const src  = qrSrc(ev);

    const qrTopRight = src
        ? `<div style="background:#fff;border-radius:12px;padding:10px;flex-shrink:0;box-shadow:0 4px 16px rgba(0,0,0,0.15);">
               <img src="${src}" style="width:100px;height:100px;display:block;" crossorigin="anonymous" alt="QR">
           </div>`
        : '';

    const addressBox = ev.lieu
        ? `<p style="font-size:17px;color:#DC5F00;font-weight:700;margin:50px 0 0;text-align:center;font-family:Arial,sans-serif;">📍 ${ev.lieu}</p>`
        : '';

    const qrBottomRight = src
        ? `<img src="${src}" style="width:180px;height:180px;display:block;" crossorigin="anonymous" alt="QR">
           <p style="font-size:11px;color:#666C7B;margin:0;text-align:center;font-family:Arial,sans-serif;">Scanner le catalogue</p>`
        : '';

    return `<div style="width:1080px;height:1080px;background:#ffffff;font-family:Arial,sans-serif;overflow:hidden;position:relative;">

        <!-- Bande orange diagonale -->
        <div style="position:absolute;top:-200px;right:-150px;width:620px;height:760px;background:#DC5F00;transform:rotate(15deg);z-index:0;"></div>

        <!-- Contenu -->
        <div style="position:relative;z-index:1;width:100%;height:100%;display:flex;flex-direction:column;padding:52px 60px;box-sizing:border-box;">

            <!-- Header : logo au plus haut, éléments sous lui -->
            <div style="display:flex;justify-content:flex-start;align-items:flex-start;margin-bottom:0;flex-shrink:0;">
                <div style="display:flex;align-items:flex-start;gap:24px;">
                    <img src="/images/logo.jpg" style="width:80px;height:80px;object-fit:contain;flex-shrink:0;" alt="Logo AMI 3D">
                    <div>
                        <p style="font-size:100px;font-weight:900;color:#3A3F43;font-family:Georgia,serif;line-height:1;margin:0 0 48px;text-shadow:0 2px 8px rgba(255,255,255,0.8);">AMI 3D</p>
                        <p style="font-size:14px;color:#DC5F00;letter-spacing:3px;text-transform:uppercase;margin:0;font-weight:700;">Modélisation &amp; Impression</p>
                    </div>
                </div>
            </div>

            <!-- Event box centrée entre "Modélisation" et la card grise — même espace haut/bas -->
            <div style="flex:1;display:flex;align-items:center;min-height:0;">
                <div style="background:#3A3F43;border-radius:80px 20px 80px 20px;padding:42px 52px;width:100%;box-sizing:border-box;">
                    <h1 style="font-size:50px;font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 18px;word-wrap:break-word;overflow-wrap:break-word;">${ev.nom}</h1>
                    <p style="font-size:20px;color:#DC5F00;font-weight:700;margin:0;">${date}</p>
                </div>
            </div>

            <!-- Card grise réduite -->
            <div style="flex:1;min-height:0;background:#EEEEEE;border-radius:20px;padding:12px;box-sizing:border-box;display:flex;gap:12px;align-items:stretch;">
                <!-- Photo -->
                <div style="flex:1;border-radius:14px;overflow:hidden;">
                    <img src="/images/bijoux.png" style="width:100%;height:100%;object-fit:cover;display:block;" alt="">
                </div>
                <!-- Moitié droite : QR → adresse → contact -->
                <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-between;">
                    <div style="background:#ffffff;border-radius:14px;padding:16px;display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;box-sizing:border-box;">
                        ${qrBottomRight}
                        ${addressBox}
                    </div>
                    <div style="text-align:center;width:100%;">
                        <p style="font-size:13px;font-weight:700;color:#3A3F43;margin:0 0 2px;">@nath.ami3d972</p>
                        <p style="font-size:12px;color:#666C7B;margin:0;">☎ 06 96 80 29 73</p>
                    </div>
                </div>
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
