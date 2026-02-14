import { useState, useEffect } from "react";

/* ═══ ICONS ═══ */
const I = {
  home: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  grid: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  flutter: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.3 12 6.35 16.05 22.364 0H14.314zm-3.96 14.7L6.4 18.654 10.354 22.6H18.4l-3.96-3.95-4.084-3.95z"/></svg>,
  blog: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  about: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  moon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  sun: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  gh: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  ig: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  li: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  mail: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  globe: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
};

/* ═══ DATA ═══ */
const CATS=["Restaurant Tech","FinTech","E-Commerce","AI / SaaS","Mobile Money"];
const PRODUCTS=[
  {id:"bonresto",name:"Bonresto",cat:"Restaurant Tech",sub:"Plateforme de Gestion de Restaurants | Solution Complète",desc:"Solution tout-en-un pour la gestion de restaurants avec commandes, menus digitaux, réservations, analytics et gestion du personnel.",grad:"linear-gradient(135deg,#FF6B35,#F7931E,#F7C948)"},
  {id:"kolo",name:"Kolo",cat:"FinTech",sub:"Application de Tontine Digitale & Épargne | Mobile Money",desc:"Plateforme de tontine numérique avec cercles d'épargne, intégration Mobile Money (Airtel, MTN, Orange), comptes personnels et entreprise.",grad:"linear-gradient(135deg,#10B981,#059669,#047857)"},
  {id:"marketplace",name:"Marketplace",cat:"E-Commerce",sub:"Plateforme E-Commerce Multi-Vendeurs | Marketplace Africaine",desc:"Solution e-commerce complète avec gestion de vendeurs, paiement intégré, suivi de livraison.",grad:"linear-gradient(135deg,#6366F1,#8B5CF6,#A855F7)"},
  {id:"lamu",name:"Lamu AI",cat:"AI / SaaS",sub:"Chatbot IA Support Client | Assistant Intelligent Multilingue",desc:"Assistant propulsé par l'IA pour le support client. Réponses multilingues et analytics conversationnels.",grad:"linear-gradient(135deg,#EC4899,#F43F5E,#EF4444)"},
  {id:"kolopay",name:"Kolo Pay",cat:"Mobile Money",sub:"Passerelle de Paiement Mobile Money | Airtel, MTN, Orange",desc:"Infrastructure de paiement pour accepter les paiements Mobile Money. SDK simple et dashboard temps réel.",grad:"linear-gradient(135deg,#F59E0B,#D97706,#B45309)"},
  {id:"bonresto-pos",name:"Bonresto POS",cat:"Restaurant Tech",sub:"Caisse Enregistreuse Digitale | Point de Vente Restaurant",desc:"Système de caisse moderne pour restaurants avec gestion de tables, tickets et synchronisation cloud.",grad:"linear-gradient(135deg,#EF4444,#DC2626,#B91C1C)"},
];
const PROJECTS=[
  {id:1,title:"React Native - Kolo Profil & Gestion Biométrique - Jour 30",type:"UI",tag:"Example"},
  {id:2,title:"React Native - Bonresto Dashboard Analytics - Jour 29",type:"UI",tag:"Example"},
  {id:3,title:"React Native - Kolo Tiers & Badges - Jour 28",type:"UI",tag:"Example"},
  {id:4,title:"React Native - Marketplace Interface Vendeur - Jour 27",type:"UI",tag:"Design"},
  {id:5,title:"Node.js - API Mobile Money Airtel/MTN - Jour 26",type:"API",tag:"Example"},
  {id:6,title:"React Native - Bonresto Réservation - Jour 25",type:"UI",tag:"Example"},
  {id:7,title:"React Native - Kolo Corporate PDF/Excel - Jour 24",type:"Feature",tag:"Example"},
  {id:8,title:"React - Lamuka Tech Landing - Jour 23",type:"Web",tag:"Design"},
  {id:9,title:"Python - Lamu AI Chatbot - Jour 22",type:"AI",tag:"Example"},
  {id:10,title:"React Native - Kolo Messagerie - Jour 21",type:"UI",tag:"Example"},
];
const EXP=[{company:"Lamuka Tech",period:"2023 - Présent",role:"Fondateur & Lead Developer",bullets:["Conception et développement de Bonresto, Kolo et Marketplace avec React Native et Node.js.","Architecture backend avec PostgreSQL, Prisma ORM, Express.js, JWT et audit logging.","Intégration Mobile Money (Airtel, MTN, Orange), auth biométrique, multilingue."]}];
const SKL=[{t:"Développement Mobile",d:"Expert React Native, cross-platform iOS/Android. APIs REST, auth biométrique."},{t:"Développement Web & Backend",d:"Node.js, Express.js, React, Next.js. PostgreSQL, Prisma ORM, JWT, microservices."},{t:"DevOps & Infrastructure",d:"CI/CD, Docker, cloud. Déploiement automatisé, monitoring."}];

/* ═══ CSS ═══ */
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}

:root,[data-theme="dark"]{
  --bg:#0A0A08;
  --glow:radial-gradient(ellipse 80% 50% at 50% 0%,rgba(140,80,50,0.18),rgba(100,60,30,0.06) 45%,transparent 70%);
  --surface:#131210;
  --sh:rgba(255,255,255,0.05);
  --border:rgba(255,255,255,0.07);
  --bh:rgba(255,255,255,0.14);
  --text:#EDEBE6;
  --t2:#9C9889;
  --t3:#68645A;
  --shadow:0 20px 60px rgba(0,0,0,.4);
  --taga:rgba(99,102,241,.12);--tagac:#818CF8;
  --tagb:rgba(255,255,255,.05);
  --bb-bg:rgba(19,18,16,0.92);
  --bb-border:rgba(255,255,255,0.1);
}
[data-theme="light"]{
  --bg:#FAF8F5;
  --glow:linear-gradient(180deg,rgba(245,180,155,0.55) 0%,rgba(248,200,175,0.3) 30%,rgba(250,220,200,0.1) 55%,transparent 70%);
  --surface:#FFFFFF;
  --sh:rgba(0,0,0,0.04);
  --border:rgba(0,0,0,0.08);
  --bh:rgba(0,0,0,0.15);
  --text:#191815;
  --t2:#5E5B53;
  --t3:#908C82;
  --shadow:0 20px 60px rgba(0,0,0,.06);
  --taga:rgba(99,102,241,.08);--tagac:#6366F1;
  --tagb:rgba(0,0,0,.04);
  --bb-bg:rgba(255,255,255,0.92);
  --bb-border:rgba(0,0,0,0.1);
}

html{scroll-behavior:smooth}
body,html{background:var(--bg);color:var(--text);font-family:'Inter',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.55;transition:background .3s,color .3s}
.glow{position:fixed;inset:0;background:var(--glow);pointer-events:none;z-index:0;transition:background .3s}

/* ═══ DESKTOP TOPBAR ═══ */
.topbar{position:sticky;top:0;z-index:100;height:68px;display:flex;align-items:center;justify-content:center;padding:0 40px;background:color-mix(in srgb,var(--bg) 80%,transparent);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}
.tz{position:absolute;left:40px;top:50%;transform:translateY(-50%);font-size:14px;color:var(--t3);font-weight:500}
.pill{display:inline-flex;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:100px;padding:4px}
.ni{display:flex;align-items:center;gap:7px;padding:10px 18px;border-radius:100px;border:none;background:transparent;color:var(--t3);font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .2s;white-space:nowrap}
.ni:hover{color:var(--t2);background:var(--sh)}
.ni.on{color:var(--text);background:var(--sh);box-shadow:inset 0 0 0 1px var(--border)}
.ni svg{opacity:.5;flex-shrink:0}.ni.on svg{opacity:1}
.ni.ico{padding:10px 14px}
.sep{width:1px;height:22px;background:var(--border);margin:0 2px;flex-shrink:0}
.tbtn{display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;border:none;background:transparent;color:var(--t3);cursor:pointer;transition:all .2s}
.tbtn:hover{color:var(--t2);background:var(--sh)}

/* ═══ MOBILE BOTTOM FLOATING PILL BAR ═══ */
.bb{
  display:none;
  position:fixed;
  bottom:20px;
  left:50%;
  transform:translateX(-50%);
  z-index:200;
  background:var(--bb-bg);
  border:1px solid var(--bb-border);
  border-radius:100px;
  padding:8px 12px;
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  box-shadow:0 8px 32px rgba(0,0,0,0.25);
}
.bb-inner{display:flex;align-items:center;gap:4px}
.bbi{
  display:flex;align-items:center;justify-content:center;
  width:42px;height:42px;
  border-radius:50%;border:none;
  background:transparent;color:var(--t3);
  cursor:pointer;transition:all .2s;padding:0;
}
.bbi.on{color:var(--text);background:var(--sh)}
.bbi svg{opacity:.55}.bbi.on svg{opacity:1}

/* ═══ LAYOUT ═══ */
.wrap{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:0 40px}
.cc{display:flex;flex-direction:column;align-items:center}

/* ═══ HOME ═══ */
.hbadge{display:inline-flex;align-items:center;gap:4px;margin-top:56px;padding:8px 18px;border-radius:100px;border:1px solid var(--border);font-size:14px;color:var(--t2);cursor:pointer;text-decoration:none;transition:border-color .2s;background:var(--surface)}
.hbadge:hover{border-color:var(--bh)}
.hbadge strong{color:var(--text);margin-left:4px}

.hhero{text-align:center;padding:28px 0;max-width:680px;margin:0 auto}
.hhero h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(30px,6vw,58px);font-weight:700;letter-spacing:-.03em;line-height:1.08;margin-bottom:18px}
.hhero p{font-size:17px;color:var(--t2);line-height:1.6;max-width:480px;margin:0 auto}

/* Social icons — simple row like screenshot */
.hsoc{display:flex;justify-content:center;gap:20px;padding:28px 0 12px}
.hsoc-i{color:var(--text);opacity:.6;transition:opacity .2s;cursor:pointer;display:flex}
.hsoc-i:hover{opacity:1}

/* Stats in bordered pills */
.hstats{display:flex;justify-content:center;gap:14px;padding:20px 0 52px;flex-wrap:wrap}
.hst{display:flex;align-items:center;gap:8px;padding:14px 28px;border-radius:100px;border:1px solid var(--border);background:var(--surface)}
.hst .n{font-size:18px;font-weight:700;letter-spacing:-.02em}
.hst .l{font-size:14px;color:var(--t2)}

/* product grid */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px;width:100%;padding-bottom:64px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:20px;overflow:hidden;cursor:pointer;transition:all .25s}
.card:hover{border-color:var(--bh);transform:translateY(-3px);box-shadow:var(--shadow)}
.cimg{height:220px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.pm{width:88px;height:150px;border-radius:18px;background:rgba(255,255,255,.14);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);box-shadow:0 16px 48px rgba(0,0,0,.3)}
.pm.s{transform:translateX(-14px) scale(.88);opacity:.5}
.cbody{padding:20px 24px 24px}
.cbody h3{font-size:16px;font-weight:600;line-height:1.4;margin-bottom:10px}
.cbody p{font-size:14px;color:var(--t2);line-height:1.6;margin-bottom:20px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.cact{display:flex;gap:12px}
.bp{padding:10px 20px;border-radius:12px;background:var(--text);color:var(--bg);font-size:13px;font-weight:600;border:none;cursor:pointer;font-family:inherit}
.bs{padding:10px 20px;border-radius:12px;background:transparent;border:1px solid var(--border);color:var(--t2);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
.bs:hover{border-color:var(--bh);color:var(--text)}

.catsec{border-top:1px solid var(--border);padding:56px 0;width:100%;text-align:center}
.catsec h2{font-size:28px;font-weight:600;letter-spacing:-.03em;margin-bottom:24px}
.catrow{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.cpil{padding:10px 24px;border-radius:100px;border:1px solid var(--border);color:var(--t2);font-size:14px;font-weight:500;cursor:pointer;background:none;font-family:inherit;transition:all .2s}
.cpil:hover,.cpil.on{border-color:var(--bh);color:var(--text);background:var(--sh)}

.htease{border-top:1px solid var(--border);padding:64px 0 40px;text-align:center;max-width:620px;margin:0 auto}
.htease h2{font-size:28px;font-weight:600;letter-spacing:-.03em;line-height:1.25;margin-bottom:16px}
.htease p{font-size:16px;color:var(--t2);line-height:1.65;margin-bottom:20px}
.htease a{color:var(--t2);font-size:14px;font-weight:500;text-decoration:underline;text-underline-offset:4px;cursor:pointer}

/* ═══ PRODUCTS PAGE ═══ */
.prodh{text-align:center;padding:64px 0 32px;max-width:620px;margin:0 auto}
.prodh h1{font-size:40px;font-weight:600;letter-spacing:-.04em;margin-bottom:12px}
.prodh p{font-size:16px;color:var(--t2)}
.pfrow{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:32px}
.pf{padding:8px 20px;border-radius:100px;border:1px solid var(--border);background:transparent;color:var(--t2);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
.pf:hover{border-color:var(--bh)}.pf.on{background:var(--text);color:var(--bg);border-color:var(--text)}

/* ═══ PROJECTS ═══ */
.pjh{text-align:center;padding:64px 0 32px;max-width:620px;margin:0 auto}
.pjh h1{font-size:40px;font-weight:600;letter-spacing:-.04em;margin-bottom:12px}
.pjh p{font-size:16px;color:var(--t2)}
.frow{display:flex;gap:4px;margin-bottom:16px;flex-wrap:wrap;justify-content:center}
.ft{padding:8px 18px;border-radius:100px;border:1px solid var(--border);background:transparent;color:var(--t2);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
.ft:hover{border-color:var(--bh)}.ft.on{background:var(--text);color:var(--bg);border-color:var(--text)}
.shw{font-size:13px;color:var(--t3);margin-bottom:24px;font-style:italic;text-align:center}
.plist{display:flex;flex-direction:column;gap:8px;width:100%}
.prow{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;background:var(--surface);border:1px solid var(--border);border-radius:20px;transition:border-color .15s;flex-wrap:wrap;gap:12px}
.prow:hover{border-color:var(--bh)}
.prow h3{font-size:15px;font-weight:500;margin-bottom:8px;line-height:1.4}
.ptg{display:flex;gap:6px}
.tga{padding:3px 10px;border-radius:6px;background:var(--taga);color:var(--tagac);font-size:11px;font-weight:600}
.tgb{padding:3px 10px;border-radius:6px;background:var(--tagb);color:var(--t2);font-size:11px;font-weight:600}
.plk{display:flex;gap:16px}
.plk a{font-size:13px;color:var(--t2);text-decoration:none;font-weight:500;transition:color .15s}
.plk a:hover{color:var(--text)}
.lmb{display:block;width:100%;margin-top:24px;padding:14px;border-radius:20px;border:1px solid var(--border);background:transparent;color:var(--t2);font-size:14px;font-weight:500;cursor:pointer;font-family:inherit}

/* ═══ BLOG ═══ */
.blh{text-align:center;padding:64px 0 32px;max-width:620px;margin:0 auto}
.blh h1{font-size:40px;font-weight:600;letter-spacing:-.04em;margin-bottom:12px}
.blh p{font-size:16px;color:var(--t2)}
.brow{padding:28px 0;border-bottom:1px solid var(--border);cursor:pointer}
.brow:hover h3{opacity:.7}
.brow .bd{font-size:12px;color:var(--t3);font-weight:500;margin-bottom:8px}
.brow h3{font-size:18px;font-weight:600;letter-spacing:-.02em;line-height:1.35;margin-bottom:8px;transition:opacity .15s}
.brow p{font-size:14px;color:var(--t2);line-height:1.6}

/* ═══ ABOUT ═══ */
.abt{display:grid;grid-template-columns:300px 1fr;gap:56px;padding:56px 0 80px;align-items:start;width:100%}
.abtl{position:sticky;top:96px}
.atabs{display:flex;flex-direction:column;gap:20px;margin-bottom:40px}
.ati{display:flex;align-items:center;gap:14px;background:none;border:none;cursor:pointer;font-family:inherit;font-size:15px;font-weight:500;color:var(--t3);transition:color .2s;padding:0;text-align:left}
.ati.on{color:var(--text)}.ati:hover{color:var(--t2)}
.tds{width:28px;height:1.5px;background:var(--t3);flex-shrink:0;transition:background .2s}
.ati.on .tds{background:var(--text)}
.avc{width:160px;height:160px;border-radius:50%;background:var(--sh);display:flex;align-items:center;justify-content:center;margin-bottom:24px;border:2px solid var(--border)}
.avc span{font-size:64px;font-weight:700;color:var(--text);opacity:.22}
.ami{display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:14px;color:var(--t2)}
.ami svg{opacity:.5}
.lps{display:flex;gap:8px;margin-top:14px}
.lpi{padding:6px 16px;border-radius:100px;border:1px solid var(--border);color:var(--t2);font-size:13px;font-weight:500}
.aname{font-family:'Playfair Display',Georgia,serif;font-size:clamp(40px,5vw,66px);font-weight:400;letter-spacing:-.03em;line-height:1.05;margin-bottom:8px}
.arole{font-size:24px;color:var(--t3);font-weight:400;margin-bottom:32px}
.srow{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:48px}
.spil{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:100px;border:1px solid var(--border);background:var(--surface);color:var(--t2);font-size:14px;font-weight:500;text-decoration:none;transition:all .2s}
.spil:hover{border-color:var(--bh);color:var(--text)}
.abio{font-size:17px;color:var(--t2);line-height:1.75;margin-bottom:20px}
.ash{font-size:22px;font-weight:600;letter-spacing:-.02em;margin:48px 0 24px;padding-top:32px;border-top:1px solid var(--border)}
.exc{margin-bottom:16px;padding:24px;background:var(--surface);border:1px solid var(--border);border-radius:20px}
.ext{display:flex;justify-content:space-between;margin-bottom:4px}.exco{font-size:16px;font-weight:600}.expe{font-size:13px;color:var(--t3)}
.exrt{font-size:14px;color:var(--t2);margin-bottom:16px}
.exu{padding-left:18px}.exu li{font-size:14px;color:var(--t2);line-height:1.65;margin-bottom:8px}
.skc{padding:24px;background:var(--surface);border:1px solid var(--border);border-radius:20px;margin-bottom:12px}
.skc h3{font-size:15px;font-weight:600;margin-bottom:8px}.skc p{font-size:14px;color:var(--t2);line-height:1.65;margin:0}

/* ═══ FOOTER ═══ */
.footer{border-top:1px solid var(--border);padding:28px 40px;text-align:center;font-size:13px;color:var(--t3)}
.footer a{color:var(--t2);text-decoration:underline;text-underline-offset:3px}

::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}

/* ═══ RESPONSIVE ═══ */
@media(max-width:900px){
  .topbar{display:none!important}
  .bb{display:block!important}
  .wrap{padding:0 20px;padding-bottom:100px}
  .pgrid{grid-template-columns:1fr}
  .hstats{gap:10px}.hst{padding:12px 20px}.hst .n{font-size:16px}.hst .l{font-size:12px}
  .hhero h1{font-size:clamp(26px,8vw,40px)}
  .prodh h1,.pjh h1,.blh h1{font-size:28px}
  .catsec h2,.htease h2{font-size:22px}
  .abt{grid-template-columns:1fr;gap:32px}.abtl{position:static}
  .avc{width:120px;height:120px}.avc span{font-size:48px}
  .aname{font-size:36px}.arole{font-size:18px}
  .prow{flex-direction:column;align-items:flex-start}
  .footer{padding:20px;margin-bottom:70px}
}
`;

/* ═══ PAGES ═══ */
function Home({go}: {go: (p: string, cat?: string) => void}){
  return(
    <div className="cc">
      <a className="hbadge" onClick={()=>go("products")}>Projet récent : <strong>Kolo 2.0 🚀</strong></a>
      <section className="hhero">
        <h1>Construire des solutions technologiques pour l'Afrique</h1>
        <p>Je conçois pour la différence — en priorisant la clarté, l'accessibilité et une connexion authentique avec les utilisateurs.</p>
      </section>
      <div className="hsoc">
        <a className="hsoc-i" href="#">{I.gh}</a>
        <a className="hsoc-i" href="#">{I.ig}</a>
        <a className="hsoc-i" href="#">{I.li}</a>
        <a className="hsoc-i" href="#">{I.mail}</a>
      </div>
      <div className="hstats">
        <div className="hst"><span className="n">4+</span><span className="l">Produits</span></div>
        <div className="hst"><span className="n">120+</span><span className="l">Écrans conçus</span></div>
      </div>
      <section className="pgrid">
        {PRODUCTS.slice(0,4).map(p=>(
          <div key={p.id} className="card" onClick={()=>go("products")}>
            <div className="cimg" style={{background:p.grad}}><div className="pm s"/><div className="pm"/></div>
            <div className="cbody"><h3>{p.name}: {p.sub}</h3><p>{p.desc}</p><div className="cact"><button className="bp">Découvrir</button><button className="bs">Démo live</button></div></div>
          </div>
        ))}
      </section>
      <section className="catsec">
        <h2>Explorer par catégorie</h2>
        <div className="catrow">{CATS.map(c=>(<button key={c} className="cpil" onClick={()=>go("products",c)}>{c}</button>))}</div>
      </section>
      <section className="htease">
        <h2>Transformer les idées en solutions digitales élégantes et fonctionnelles.</h2>
        <p>Je suis développeur Full-Stack basé à Brazzaville 🇨🇬, fondateur de Lamuka Tech. Je crée des produits pensés pour les réalités africaines.</p>
        <a onClick={()=>go("about")}>À propos de moi</a>
      </section>
    </div>
  );
}

function Prods({initCat}: {initCat: string | null}){
  const[cat,sC]=useState(initCat||"Tous");
  const list=cat==="Tous"?PRODUCTS:PRODUCTS.filter(p=>p.cat===cat);
  return(
    <div className="cc">
      <div className="prodh"><h1>Nos Produits</h1><p>Tous les produits Lamuka Tech pour les marchés africains.</p></div>
      <div className="pfrow">
        <button className={`pf ${cat==="Tous"?"on":""}`} onClick={()=>sC("Tous")}>Tous</button>
        {CATS.map(c=>(<button key={c} className={`pf ${cat===c?"on":""}`} onClick={()=>sC(c)}>{c}</button>))}
      </div>
      <section className="pgrid">{list.map(p=>(
        <div key={p.id} className="card">
          <div className="cimg" style={{background:p.grad}}><div className="pm s"/><div className="pm"/></div>
          <div className="cbody"><h3>{p.name}: {p.sub}</h3><p>{p.desc}</p><div className="cact"><button className="bp">Découvrir</button><button className="bs">Démo live</button></div></div>
        </div>
      ))}</section>
      {list.length===0&&<p style={{color:"var(--t3)",textAlign:"center",padding:"40px 0"}}>Aucun produit dans cette catégorie.</p>}
    </div>
  );
}

function Proj(){
  const[f,sF]=useState("all");
  const tabs=[{k:"all",l:"Tous"},{k:"UI",l:"UI Designs"},{k:"API",l:"APIs"},{k:"Feature",l:"Features"}];
  const list=f==="all"?PROJECTS:PROJECTS.filter(p=>p.type===f);
  return(
    <div className="cc">
      <div className="pjh"><h1>Projets & Réalisations</h1><p>Designs UI, APIs et applications réelles.</p></div>
      <div className="frow">{tabs.map(t=>(<button key={t.k} className={`ft ${f===t.k?"on":""}`} onClick={()=>sF(t.k)}>{t.l}</button>))}</div>
      <p className="shw">Showing {list.length} of {PROJECTS.length} projects</p>
      <div className="plist">{list.map(p=>(
        <div key={p.id} className="prow">
          <div style={{flex:1,minWidth:200}}><h3>{p.title}</h3><div className="ptg"><span className="tga">{p.type}</span><span className="tgb">{p.tag}</span></div></div>
          <div className="plk"><a href="#">Voir le code</a><a href="#">Détails</a></div>
        </div>
      ))}</div>
      <button className="lmb">Charger plus</button>
    </div>
  );
}

function Blg(){
  const posts=[{id:1,t:"Pourquoi le Mobile Money est l'avenir du paiement en Afrique",d:"10 Fév 2026",p:"Analyse des tendances de paiement mobile."},{id:2,t:"Construire une tontine digitale : leçons de Kolo",d:"28 Jan 2026",p:"Retour d'expérience sur Kolo."},{id:3,t:"React Native vs Flutter pour le marché africain",d:"15 Jan 2026",p:"Comparaison des frameworks mobiles."}];
  return(
    <div className="cc">
      <div className="blh"><h1>Blog</h1><p>Tech en Afrique, tutoriels et retours d'expérience.</p></div>
      <div style={{width:"100%"}}>{posts.map(p=>(<div key={p.id} className="brow"><div className="bd">{p.d}</div><h3>{p.t}</h3><p>{p.p}</p></div>))}</div>
    </div>
  );
}

function Abt(){
  const[tab,sT]=useState("intro");
  const tabs=[{k:"intro",l:"Introduction"},{k:"work",l:"Work Experience"},{k:"skills",l:"Technical skills"}];
  return(
    <div className="abt">
      <aside className="abtl">
        <div className="atabs">{tabs.map(t=>(<button key={t.k} className={`ati ${tab===t.k?"on":""}`} onClick={()=>sT(t.k)}><span className="tds"/>{t.l}</button>))}</div>
        <div className="avc"><span>J</span></div>
        <div className="ami">{I.globe}<span>Africa/Brazzaville</span></div>
        <div className="lps"><span className="lpi">Français</span><span className="lpi">English</span><span className="lpi">Lingala</span></div>
      </aside>
      <main>
        <h1 className="aname">Joeldy</h1>
        <p className="arole">Full-Stack Developer</p>
        <div className="srow"><a href="#" className="spil">{I.gh} GitHub</a><a href="#" className="spil">{I.ig} Instagram</a><a href="#" className="spil">{I.li} LinkedIn</a><a href="#" className="spil">{I.mail} Email</a></div>
        {tab==="intro"&&(<><p className="abio">Je suis Joeldy, développeur Full-Stack et fondateur de Lamuka Tech, une entreprise technologique au Congo qui développe des solutions innovantes pour les marchés africains.</p><p className="abio">Passionné par les produits qui répondent aux besoins réels — Bonresto pour la restauration, Kolo pour la tontine digitale, et une plateforme marketplace.</p><p className="abio">Avec un engagement pour l'excellence, je transforme les idées en réalité à travers le code.</p></>)}
        {tab==="work"&&(<><h2 className="ash" style={{marginTop:0,paddingTop:0,borderTop:"none"}}>Work Experience</h2>{EXP.map(e=>(<div key={e.company} className="exc"><div className="ext"><span className="exco">{e.company}</span><span className="expe">{e.period}</span></div><p className="exrt">{e.role}</p><ul className="exu">{e.bullets.map((b,i)=><li key={i}>{b}</li>)}</ul></div>))}</>)}
        {tab==="skills"&&(<><h2 className="ash" style={{marginTop:0,paddingTop:0,borderTop:"none"}}>Technical Skills</h2>{SKL.map(s=>(<div key={s.t} className="skc"><h3>{s.t}</h3><p>{s.d}</p></div>))}</>)}
      </main>
    </div>
  );
}

/* ═══ APP ═══ */
export default function App(){
  const[page,setPage]=useState("home");
  const[theme,setTheme]=useState("dark");
  const[initCat,setIC]=useState<string | null>(null);

  useEffect(()=>{document.documentElement.setAttribute("data-theme",theme)},[theme]);

  const go=(p: string, cat?: string)=>{if(cat)setIC(cat);else setIC(null);setPage(p);window.scrollTo(0,0)};
  const toggle=()=>setTheme((t: string)=>t==="dark"?"light":"dark");

  const navs: Array<{k: string; icon: JSX.Element; lbl: string | null; ico?: boolean}> =[
    {k:"home",icon:I.home,lbl:null,ico:true},
    {k:"products",icon:I.grid,lbl:"Produits"},
    {k:"projects",icon:I.flutter,lbl:"Projets"},
    {k:"blog",icon:I.blog,lbl:"Blog"},
    {k:"about",icon:I.about,lbl:"À propos"},
  ];

  return(
    <>
      <style>{CSS}</style>
      <div>
        <div className="glow"/>

        {/* Desktop topbar */}
        <header className="topbar">
          <span className="tz">Africa/Brazzaville</span>
          <nav className="pill">
            {navs.map(n=>(<button key={n.k} className={`ni ${n.ico?"ico":""} ${page===n.k?"on":""}`} onClick={()=>go(n.k)}>{n.icon}{n.lbl&&<span>{n.lbl}</span>}</button>))}
            <span className="sep"/>
            <button className="tbtn" onClick={toggle}>{theme==="dark"?I.moon:I.sun}</button>
          </nav>
        </header>

        {/* Mobile floating pill bottom bar */}
        <nav className="bb">
          <div className="bb-inner">
            {navs.map(n=>(<button key={n.k} className={`bbi ${page===n.k?"on":""}`} onClick={()=>go(n.k)}>{n.icon}</button>))}
            <button className="bbi" onClick={toggle}>{theme==="dark"?I.moon:I.sun}</button>
          </div>
        </nav>

        {/* Content */}
        <div className="wrap">
          {page==="home"&&<Home go={go}/>}
          {page==="products"&&<Prods initCat={initCat}/>}
          {page==="projects"&&<Proj/>}
          {page==="blog"&&<Blg/>}
          {page==="about"&&<Abt/>}
        </div>

        <footer className="footer">© 2026 /Joeldy/ Built with ❤️ <a href="#">React</a> & <a href="#">Node.js</a></footer>
      </div>
    </>
  );
}