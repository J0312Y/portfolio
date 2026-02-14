import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════ */
const I = {
  home: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  grid: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  code: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  blog: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  about: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  moon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  sun: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  gh: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  ig: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  li: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  mail: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  globe: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
};

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */
const CATEGORIES = ["Restaurant Tech", "FinTech", "E-Commerce", "AI / SaaS", "Mobile Money"];

const PRODUCTS = [
  { id: "bonresto", name: "Bonresto", cat: "Restaurant Tech", subtitle: "Plateforme de Gestion de Restaurants | Solution Complète", desc: "Solution tout-en-un pour la gestion de restaurants avec commandes, menus digitaux, réservations, analytics et gestion du personnel. Conçue pour l'Afrique francophone.", grad: "linear-gradient(135deg,#FF6B35,#F7931E,#F7C948)" },
  { id: "kolo", name: "Kolo", cat: "FinTech", subtitle: "Application de Tontine Digitale & Épargne | Mobile Money", desc: "Plateforme de tontine numérique avec cercles d'épargne, intégration Mobile Money (Airtel, MTN, Orange), comptes personnels et entreprise, badges.", grad: "linear-gradient(135deg,#10B981,#059669,#047857)" },
  { id: "marketplace", name: "Marketplace", cat: "E-Commerce", subtitle: "Plateforme E-Commerce Multi-Vendeurs | Marketplace Africaine", desc: "Solution e-commerce complète avec gestion de vendeurs, paiement intégré, suivi de livraison, interface optimisée pour les marchés africains.", grad: "linear-gradient(135deg,#6366F1,#8B5CF6,#A855F7)" },
  { id: "lamu", name: "Lamu AI", cat: "AI / SaaS", subtitle: "Chatbot IA Support Client | Assistant Intelligent Multilingue", desc: "Assistant propulsé par l'IA pour le support client. Intégration web, réponses multilingues (FR, EN, Lingala, Kikongo), analytics.", grad: "linear-gradient(135deg,#EC4899,#F43F5E,#EF4444)" },
  { id: "kolopay", name: "Kolo Pay", cat: "Mobile Money", subtitle: "Passerelle de Paiement Mobile Money | Airtel, MTN, Orange", desc: "Infrastructure de paiement intégrée pour accepter les paiements Mobile Money. SDK simple, dashboard temps réel, et réconciliation automatique.", grad: "linear-gradient(135deg,#F59E0B,#D97706,#B45309)" },
  { id: "bonresto-pos", name: "Bonresto POS", cat: "Restaurant Tech", subtitle: "Caisse Enregistreuse Digitale | Point de Vente Restaurant", desc: "Système de caisse moderne pour restaurants avec gestion de tables, tickets, pourboires, et synchronisation cloud en temps réel.", grad: "linear-gradient(135deg,#EF4444,#DC2626,#B91C1C)" },
];

const PROJECTS = [
  { id: 1, title: "React Native - Kolo Profil & Gestion Biométrique - Jour 30", type: "UI", tag: "Example" },
  { id: 2, title: "React Native - Bonresto Dashboard Analytics - Jour 29", type: "UI", tag: "Example" },
  { id: 3, title: "React Native - Kolo Tiers & Badges - Jour 28", type: "UI", tag: "Example" },
  { id: 4, title: "React Native - Marketplace Interface Vendeur - Jour 27", type: "UI", tag: "Design" },
  { id: 5, title: "Node.js - API Mobile Money Airtel/MTN - Jour 26", type: "API", tag: "Example" },
  { id: 6, title: "React Native - Bonresto Réservation - Jour 25 #shorts", type: "UI", tag: "Example" },
  { id: 7, title: "React Native - Kolo Corporate PDF/Excel - Jour 24", type: "Feature", tag: "Example" },
  { id: 8, title: "React - Lamuka Tech Landing - Jour 23", type: "Web", tag: "Design" },
  { id: 9, title: "Python - Lamu AI Chatbot - Jour 22", type: "AI", tag: "Example" },
  { id: 10, title: "React Native - Kolo Messagerie - Jour 21 #shorts", type: "UI", tag: "Example" },
];

const EXPERIENCE = [{ company: "Lamuka Tech", period: "2023 - Présent", role: "Fondateur & Lead Developer", bullets: [
  "Conception et développement de Bonresto, Kolo et Marketplace avec React Native et Node.js.",
  "Architecture backend avec PostgreSQL, Prisma ORM, Express.js, JWT et audit logging.",
  "Intégration Mobile Money (Airtel, MTN, Orange), auth biométrique, multilingue (FR, EN, Lingala, Kikongo).",
]}];

const SKILLS = [
  { title: "Développement Mobile", desc: "Expert React Native, cross-platform iOS/Android. APIs REST, gestion d'état, auth biométrique, optimisation performances." },
  { title: "Développement Web & Backend", desc: "Node.js, Express.js, React, Next.js. APIs RESTful, PostgreSQL, Prisma ORM, JWT, microservices." },
  { title: "DevOps & Infrastructure", desc: "CI/CD, Docker, cloud. Déploiement automatisé, monitoring, applications scalables." },
];

/* ═══════════════════════════════════════════════════════
   CSS — Once UI dark warm theme matching afgprogrammer.com
   ═══════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}

/* ── DARK (default) ── */
:root,[data-theme="dark"]{
  --bg:#0A0A08;
  --bg-glow:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(120,90,40,0.12),transparent 70%);
  --surface:rgba(255,255,255,0.03);
  --surface-solid:#131210;
  --surface-hover:rgba(255,255,255,0.06);
  --border:rgba(255,255,255,0.07);
  --border-h:rgba(255,255,255,0.13);
  --text:#EDEBE6;
  --text-2:#9C9889;
  --text-3:#68645A;
  --tag-a:rgba(99,102,241,.12);--tag-ac:#818CF8;
  --tag-b:rgba(255,255,255,.05);
  --shadow:0 24px 64px rgba(0,0,0,.45);
}

/* ── LIGHT ── */
[data-theme="light"]{
  --bg:#FAF9F6;
  --bg-glow:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(180,150,80,0.06),transparent 70%);
  --surface:rgba(0,0,0,0.025);
  --surface-solid:#FFFFFF;
  --surface-hover:rgba(0,0,0,0.05);
  --border:rgba(0,0,0,0.07);
  --border-h:rgba(0,0,0,0.14);
  --text:#191815;
  --text-2:#5E5B53;
  --text-3:#908C82;
  --tag-a:rgba(99,102,241,.07);--tag-ac:#6366F1;
  --tag-b:rgba(0,0,0,.04);
  --shadow:0 24px 64px rgba(0,0,0,.06);
}

html{scroll-behavior:smooth}
body,html{
  background:var(--bg);color:var(--text);
  font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
  -webkit-font-smoothing:antialiased;line-height:1.55;
  transition:background .35s,color .35s;
}

/* warm glow behind content */
.glow{position:fixed;inset:0;background:var(--bg-glow);pointer-events:none;z-index:0;transition:background .35s}

/* ════════════════════════════════════════════
   TOPBAR — centered pill, tz left, no right element
   ════════════════════════════════════════════ */
.topbar{
  position:sticky;top:0;z-index:100;height:68px;
  display:flex;align-items:center;justify-content:center;
  padding:0 40px;
  background:color-mix(in srgb,var(--bg) 82%,transparent);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
}
.tb-tz{position:absolute;left:40px;top:50%;transform:translateY(-50%);font-size:14px;color:var(--text-3);font-weight:500}

.nav-pill{
  display:inline-flex;align-items:center;gap:0;
  background:var(--surface-solid);
  border:1px solid var(--border);
  border-radius:100px;padding:4px;
}
.ni{
  display:flex;align-items:center;gap:7px;
  padding:10px 18px;border-radius:100px;border:none;
  background:transparent;color:var(--text-3);
  font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;
  transition:all .2s;white-space:nowrap;
}
.ni:hover{color:var(--text-2);background:var(--surface-hover)}
.ni.on{color:var(--text);background:var(--surface-hover);box-shadow:inset 0 0 0 1px var(--border)}
.ni svg{opacity:.5;flex-shrink:0}.ni.on svg{opacity:1}
.ni.ico{padding:10px 14px}
.nav-sep{width:1px;height:22px;background:var(--border);margin:0 2px;flex-shrink:0}
.theme-btn{display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;border:none;background:transparent;color:var(--text-3);cursor:pointer;transition:all .2s}
.theme-btn:hover{color:var(--text-2);background:var(--surface-hover)}

/* mobile */
.hamburger{display:none;background:none;border:none;color:var(--text);cursor:pointer;padding:8px;position:absolute;right:20px;top:50%;transform:translateY(-50%)}
.mob-nav{display:none;position:fixed;top:68px;left:0;right:0;z-index:99;background:var(--bg);border-bottom:1px solid var(--border);padding:12px 20px;flex-direction:column;gap:4px}
.mob-nav.open{display:flex}
.mob-nav .ni{border-radius:12px;padding:12px 16px;width:100%;justify-content:flex-start}

/* ════════════════════════════════════════════
   LAYOUT — centered like afgprogrammer
   ════════════════════════════════════════════ */
.wrap{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:0 40px}
.content-center{display:flex;flex-direction:column;align-items:center}

/* ════════════════════════════════════════════
   HOME PAGE — centered hero + cards + cats + teaser
   ════════════════════════════════════════════ */
.home-recent{
  display:inline-flex;align-items:center;gap:4px;
  margin-top:56px;padding:8px 18px;border-radius:100px;
  border:1px solid var(--border);font-size:14px;
  color:var(--text-2);cursor:pointer;text-decoration:none;
  transition:border-color .2s;
}
.home-recent:hover{border-color:var(--border-h)}
.home-recent strong{color:var(--text);margin-left:4px}

.home-hero{text-align:center;padding:28px 0;max-width:680px;margin:0 auto}
.home-hero h1{font-size:clamp(32px,5.5vw,56px);font-weight:600;letter-spacing:-.04em;line-height:1.08;margin-bottom:18px}
.home-hero p{font-size:17px;color:var(--text-2);line-height:1.6;max-width:520px;margin:0 auto}

.home-stats{display:flex;justify-content:center;gap:56px;padding:32px 0 56px}
.home-stats .sn{font-size:22px;font-weight:600;letter-spacing:-.02em;display:block}
.home-stats .sl{font-size:13px;color:var(--text-3)}

/* product cards grid */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px;width:100%;padding-bottom:64px}
.card{background:var(--surface-solid);border:1px solid var(--border);border-radius:20px;overflow:hidden;cursor:pointer;transition:all .25s}
.card:hover{border-color:var(--border-h);transform:translateY(-3px);box-shadow:var(--shadow)}
.card-img{height:220px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
.pm{width:88px;height:150px;border-radius:18px;background:rgba(255,255,255,.14);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);box-shadow:0 16px 48px rgba(0,0,0,.3)}
.pm.s{transform:translateX(-14px) scale(.88);opacity:.5}
.card-body{padding:20px 24px 24px}
.card-body h3{font-size:16px;font-weight:600;line-height:1.4;margin-bottom:10px;letter-spacing:-.01em}
.card-body p{font-size:14px;color:var(--text-2);line-height:1.6;margin-bottom:20px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.ca{display:flex;gap:12px}
.bp{padding:10px 20px;border-radius:12px;background:var(--text);color:var(--bg);font-size:13px;font-weight:600;border:none;cursor:pointer;font-family:inherit}
.bp:hover{opacity:.85}
.bs{padding:10px 20px;border-radius:12px;background:transparent;border:1px solid var(--border);color:var(--text-2);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
.bs:hover{border-color:var(--border-h);color:var(--text)}

/* Browse by Category */
.cat-sec{border-top:1px solid var(--border);padding:56px 0;width:100%;text-align:center}
.cat-sec h2{font-size:28px;font-weight:600;letter-spacing:-.03em;margin-bottom:24px}
.cat-row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.cat-pill{padding:10px 24px;border-radius:100px;border:1px solid var(--border);color:var(--text-2);font-size:14px;font-weight:500;cursor:pointer;background:none;font-family:inherit;transition:all .2s}
.cat-pill:hover,.cat-pill.on{border-color:var(--border-h);color:var(--text);background:var(--surface-hover)}

/* About teaser */
.home-teaser{border-top:1px solid var(--border);padding:64px 0 40px;text-align:center;max-width:620px;margin:0 auto}
.home-teaser h2{font-size:28px;font-weight:600;letter-spacing:-.03em;line-height:1.25;margin-bottom:16px}
.home-teaser p{font-size:16px;color:var(--text-2);line-height:1.65;margin-bottom:20px}
.home-teaser a{color:var(--text-2);font-size:14px;font-weight:500;text-decoration:underline;text-underline-offset:4px;cursor:pointer;background:none;border:none;font-family:inherit}

/* ════════════════════════════════════════════
   PRODUCTS PAGE (separate from home)
   ════════════════════════════════════════════ */
.prod-header{text-align:center;padding:64px 0 32px;max-width:620px;margin:0 auto}
.prod-header h1{font-size:40px;font-weight:600;letter-spacing:-.04em;margin-bottom:12px}
.prod-header p{font-size:16px;color:var(--text-2);line-height:1.6}
.prod-filters{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:32px}
.pf{padding:8px 20px;border-radius:100px;border:1px solid var(--border);background:transparent;color:var(--text-2);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
.pf:hover{border-color:var(--border-h)}
.pf.on{background:var(--text);color:var(--bg);border-color:var(--text)}

/* ════════════════════════════════════════════
   PROJECTS
   ════════════════════════════════════════════ */
.pg-header{text-align:center;padding:64px 0 32px;max-width:620px;margin:0 auto}
.pg-header h1{font-size:40px;font-weight:600;letter-spacing:-.04em;margin-bottom:12px}
.pg-header p{font-size:16px;color:var(--text-2);line-height:1.6}
.filters{display:flex;gap:4px;margin-bottom:16px;flex-wrap:wrap;justify-content:center}
.ft{padding:8px 18px;border-radius:100px;border:1px solid var(--border);background:transparent;color:var(--text-2);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
.ft:hover{border-color:var(--border-h)}.ft.on{background:var(--text);color:var(--bg);border-color:var(--text)}
.show{font-size:13px;color:var(--text-3);margin-bottom:24px;font-style:italic;text-align:center}
.pl{display:flex;flex-direction:column;gap:8px;width:100%}
.pr{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;background:var(--surface-solid);border:1px solid var(--border);border-radius:20px;transition:border-color .15s;flex-wrap:wrap;gap:12px}
.pr:hover{border-color:var(--border-h)}
.pr h3{font-size:15px;font-weight:500;margin-bottom:8px;line-height:1.4}
.pt{display:flex;gap:6px}
.ta{padding:3px 10px;border-radius:6px;background:var(--tag-a);color:var(--tag-ac);font-size:11px;font-weight:600}
.tb2{padding:3px 10px;border-radius:6px;background:var(--tag-b);color:var(--text-2);font-size:11px;font-weight:600}
.pk{display:flex;gap:16px}
.pk a{font-size:13px;color:var(--text-2);text-decoration:none;font-weight:500;transition:color .15s}
.pk a:hover{color:var(--text)}
.lb{display:block;width:100%;margin-top:24px;padding:14px;border-radius:20px;border:1px solid var(--border);background:transparent;color:var(--text-2);font-size:14px;font-weight:500;cursor:pointer;font-family:inherit}

/* ════════════════════════════════════════════
   BLOG
   ════════════════════════════════════════════ */
.bl-header{text-align:center;padding:64px 0 32px;max-width:620px;margin:0 auto}
.bl-header h1{font-size:40px;font-weight:600;letter-spacing:-.04em;margin-bottom:12px}
.bl-header p{font-size:16px;color:var(--text-2);line-height:1.6}
.br{padding:28px 0;border-bottom:1px solid var(--border);cursor:pointer}
.br:hover h3{opacity:.7}
.bd{font-size:12px;color:var(--text-3);font-weight:500;margin-bottom:8px}
.br h3{font-size:18px;font-weight:600;letter-spacing:-.02em;line-height:1.35;margin-bottom:8px;transition:opacity .15s}
.br p{font-size:14px;color:var(--text-2);line-height:1.6}

/* ════════════════════════════════════════════
   ABOUT
   ════════════════════════════════════════════ */
.abt{display:grid;grid-template-columns:300px 1fr;gap:56px;padding:56px 0 80px;align-items:start;width:100%}
.abt-l{position:sticky;top:96px}
.at{display:flex;flex-direction:column;gap:20px;margin-bottom:40px}
.ati{display:flex;align-items:center;gap:14px;background:none;border:none;cursor:pointer;font-family:inherit;font-size:15px;font-weight:500;color:var(--text-3);transition:color .2s;padding:0;text-align:left}
.ati.on{color:var(--text)}.ati:hover{color:var(--text-2)}
.tdash{width:28px;height:1.5px;background:var(--text-3);flex-shrink:0;transition:background .2s}
.ati.on .tdash{background:var(--text)}
.avc{width:160px;height:160px;border-radius:50%;background:var(--surface-hover);display:flex;align-items:center;justify-content:center;margin-bottom:24px;border:2px solid var(--border)}
.avc span{font-size:64px;font-weight:700;color:var(--text);opacity:.22}
.ami{display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:14px;color:var(--text-2)}
.ami svg{opacity:.5;flex-shrink:0}
.lps{display:flex;gap:8px;margin-top:14px}
.lpi{padding:6px 16px;border-radius:100px;border:1px solid var(--border);color:var(--text-2);font-size:13px;font-weight:500}
.an{font-family:'Playfair Display',Georgia,serif;font-size:clamp(40px,5vw,66px);font-weight:400;letter-spacing:-.03em;line-height:1.05;margin-bottom:8px}
.ar{font-size:24px;color:var(--text-3);font-weight:400;margin-bottom:32px}
.sr{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:48px}
.sp{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:100px;border:1px solid var(--border);background:var(--surface-solid);color:var(--text-2);font-size:14px;font-weight:500;text-decoration:none;transition:all .2s}
.sp:hover{border-color:var(--border-h);color:var(--text)}
.sp svg{opacity:.7}
.ab{font-size:17px;color:var(--text-2);line-height:1.75;margin-bottom:20px}
.ash{font-size:22px;font-weight:600;letter-spacing:-.02em;margin:48px 0 24px;padding-top:32px;border-top:1px solid var(--border)}
.ec{margin-bottom:16px;padding:24px;background:var(--surface-solid);border:1px solid var(--border);border-radius:20px}
.et{display:flex;justify-content:space-between;margin-bottom:4px}.eco{font-size:16px;font-weight:600}.epe{font-size:13px;color:var(--text-3)}
.ert{font-size:14px;color:var(--text-2);margin-bottom:16px}
.eu{padding-left:18px}.eu li{font-size:14px;color:var(--text-2);line-height:1.65;margin-bottom:8px}
.skc{padding:24px;background:var(--surface-solid);border:1px solid var(--border);border-radius:20px;margin-bottom:12px}
.skc h3{font-size:15px;font-weight:600;margin-bottom:8px}
.skc p{font-size:14px;color:var(--text-2);line-height:1.65;margin:0}

/* ════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════ */
.footer{border-top:1px solid var(--border);padding:28px 40px;text-align:center;font-size:13px;color:var(--text-3)}
.footer a{color:var(--text-2);text-decoration:underline;text-underline-offset:3px}

::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}

@media(max-width:900px){
  .topbar{padding:0 20px}.tb-tz{left:20px;font-size:12px}
  .nav-pill{display:none}.hamburger{display:block!important}
  .wrap{padding:0 20px}
  .pgrid{grid-template-columns:1fr}
  .home-stats{gap:28px}
  .abt{grid-template-columns:1fr;gap:32px}.abt-l{position:static}
  .avc{width:120px;height:120px}.avc span{font-size:48px}
  .an{font-size:36px}.ar{font-size:18px}
  .pr{flex-direction:column;align-items:flex-start}
  .footer{padding:20px}
}
`;

/* ═══════════════════════════════════════════════════════
   PAGES
   ═══════════════════════════════════════════════════════ */

/* ── HOME — like afgprogrammer.com main page ── */
function Home({ go }) {
  return (
    <div className="content-center">
      <a className="home-recent" onClick={() => go("products")}>
        Projet récent : <strong>Kolo 2.0 🚀</strong>
      </a>

      <section className="home-hero">
        <h1>Construire des solutions technologiques pour l'Afrique</h1>
        <p>Je conçois pour la différence — en priorisant la clarté, l'accessibilité et une connexion authentique avec les utilisateurs.</p>
      </section>

      <div className="home-stats">
        <div><span className="sn">4+</span><span className="sl">Produits</span></div>
        <div><span className="sn">120+</span><span className="sl">Écrans conçus</span></div>
      </div>

      <section className="pgrid">
        {PRODUCTS.slice(0, 4).map(p => (
          <div key={p.id} className="card" onClick={() => go("products")}>
            <div className="card-img" style={{ background: p.grad }}>
              <div className="pm s" /><div className="pm" />
            </div>
            <div className="card-body">
              <h3>{p.name}: {p.subtitle}</h3>
              <p>{p.desc}</p>
              <div className="ca"><button className="bp">Découvrir</button><button className="bs">Démo live</button></div>
            </div>
          </div>
        ))}
      </section>

      <section className="cat-sec">
        <h2>Explorer par catégorie</h2>
        <div className="cat-row">
          {CATEGORIES.map(c => (
            <button key={c} className="cat-pill" onClick={() => go("products", c)}>{c}</button>
          ))}
        </div>
      </section>

      <section className="home-teaser">
        <h2>Transformer les idées en solutions digitales élégantes et fonctionnelles.</h2>
        <p>Je suis développeur Full-Stack basé à Brazzaville 🇨🇬, fondateur de Lamuka Tech. Je crée des produits technologiques pensés pour les réalités africaines — accessibles, performants et conçus avec soin.</p>
        <a onClick={() => go("about")}>À propos de moi</a>
      </section>
    </div>
  );
}

/* ── PRODUCTS — separate page with category filter ── */
function ProductsPage({ initCat }) {
  const [cat, setCat] = useState(initCat || "Tous");
  const filtered = cat === "Tous" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

  return (
    <div className="content-center">
      <div className="prod-header">
        <h1>Nos Produits</h1>
        <p>Tous les produits développés par Lamuka Tech pour les marchés africains et internationaux.</p>
      </div>

      <div className="prod-filters">
        <button className={`pf ${cat === "Tous" ? "on" : ""}`} onClick={() => setCat("Tous")}>Tous</button>
        {CATEGORIES.map(c => (
          <button key={c} className={`pf ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <section className="pgrid">
        {filtered.map(p => (
          <div key={p.id} className="card">
            <div className="card-img" style={{ background: p.grad }}>
              <div className="pm s" /><div className="pm" />
            </div>
            <div className="card-body">
              <h3>{p.name}: {p.subtitle}</h3>
              <p>{p.desc}</p>
              <div className="ca"><button className="bp">Découvrir</button><button className="bs">Démo live</button></div>
            </div>
          </div>
        ))}
      </section>
      {filtered.length === 0 && <p style={{ color: "var(--text-3)", textAlign: "center", padding: "40px 0" }}>Aucun produit dans cette catégorie pour le moment.</p>}
    </div>
  );
}

/* ── PROJECTS ── */
function ProjectsPage() {
  const [f, sF] = useState("all");
  const tabs = [{ key: "all", label: "Tous les projets" }, { key: "UI", label: "UI Designs" }, { key: "API", label: "APIs" }, { key: "Feature", label: "Features" }];
  const list = f === "all" ? PROJECTS : PROJECTS.filter(p => p.type === f);
  return (
    <div className="content-center">
      <div className="pg-header"><h1>Projets & Réalisations</h1><p>Découvrez mon parcours avec des designs UI, APIs et applications réelles.</p></div>
      <div className="filters">{tabs.map(t => (<button key={t.key} className={`ft ${f === t.key ? "on" : ""}`} onClick={() => sF(t.key)}>{t.label}</button>))}</div>
      <p className="show">Showing {list.length} of {PROJECTS.length} projects ({PROJECTS.length - list.length} more available)</p>
      <div className="pl">{list.map(p => (
        <div key={p.id} className="pr">
          <div style={{ flex: 1, minWidth: 200 }}><h3>{p.title}</h3><div className="pt"><span className="ta">{p.type}</span><span className="tb2">{p.tag}</span></div></div>
          <div className="pk"><a href="#">Voir le code</a><a href="#">Détails</a></div>
        </div>
      ))}</div>
      <button className="lb">Charger plus ({PROJECTS.length - list.length} restants)</button>
    </div>
  );
}

/* ── BLOG ── */
function BlogPage() {
  const posts = [
    { id: 1, title: "Pourquoi le Mobile Money est l'avenir du paiement en Afrique", date: "10 Février 2026", desc: "Analyse des tendances de paiement mobile en Afrique." },
    { id: 2, title: "Construire une app de tontine digitale : leçons de Kolo", date: "28 Janvier 2026", desc: "Retour d'expérience sur le développement de Kolo." },
    { id: 3, title: "React Native vs Flutter pour le marché africain", date: "15 Janvier 2026", desc: "Comparaison pour choisir le bon framework mobile." },
  ];
  return (
    <div className="content-center">
      <div className="bl-header"><h1>Blog</h1><p>Réflexions sur le développement tech en Afrique.</p></div>
      <div style={{ width: "100%" }}>{posts.map(p => (<div key={p.id} className="br"><div className="bd">{p.date}</div><h3>{p.title}</h3><p>{p.desc}</p></div>))}</div>
    </div>
  );
}

/* ── ABOUT ── */
function AboutPage() {
  const [tab, sT] = useState("intro");
  const tabs = [{ key: "intro", label: "Introduction" }, { key: "work", label: "Work Experience" }, { key: "skills", label: "Technical skills" }];
  return (
    <div className="abt">
      <aside className="abt-l">
        <div className="at">{tabs.map(t => (<button key={t.key} className={`ati ${tab === t.key ? "on" : ""}`} onClick={() => sT(t.key)}><span className="tdash" />{t.label}</button>))}</div>
        <div className="avc"><span>J</span></div>
        <div className="ami">{I.globe}<span>Africa/Brazzaville</span></div>
        <div className="lps"><span className="lpi">Français</span><span className="lpi">English</span><span className="lpi">Lingala</span></div>
      </aside>
      <main>
        <h1 className="an">Joeldy</h1>
        <p className="ar">Full-Stack Developer</p>
        <div className="sr">
          <a href="#" className="sp">{I.gh} GitHub</a>
          <a href="#" className="sp">{I.ig} Instagram</a>
          <a href="#" className="sp">{I.li} LinkedIn</a>
          <a href="#" className="sp">{I.mail} Email</a>
        </div>
        {tab === "intro" && (<>
          <p className="ab">Je suis Joeldy, développeur Full-Stack et fondateur de Lamuka Tech, une entreprise technologique basée au Congo qui développe des solutions innovantes pour les marchés africains.</p>
          <p className="ab">Passionné par la création de produits qui répondent aux besoins réels des utilisateurs africains, je travaille sur Bonresto pour la restauration, Kolo pour la tontine digitale, et une plateforme marketplace — tous pensés pour l'écosystème mobile et les réalités locales.</p>
          <p className="ab">Avec un engagement pour l'excellence et l'innovation, je transforme les idées en réalité à travers le code. J'apporte expertise et rigueur pour assurer le succès de chaque projet.</p>
        </>)}
        {tab === "work" && (<>
          <h2 className="ash" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>Work Experience</h2>
          {EXPERIENCE.map(e => (<div key={e.company} className="ec"><div className="et"><span className="eco">{e.company}</span><span className="epe">{e.period}</span></div><p className="ert">{e.role}</p><ul className="eu">{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul></div>))}
        </>)}
        {tab === "skills" && (<>
          <h2 className="ash" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>Technical Skills</h2>
          {SKILLS.map(s => (<div key={s.title} className="skc"><h3>{s.title}</h3><p>{s.desc}</p></div>))}
        </>)}
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [mob, setMob] = useState(false);
  const [initCat, setInitCat] = useState(null);

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  const go = (p, cat) => {
    if (cat) setInitCat(cat); else setInitCat(null);
    setPage(p);
    setMob(false);
  };

  const navItems = [
    { key: "home", label: null, icon: I.home, ico: true },
    { key: "products", label: "Produits", icon: I.grid },
    { key: "projects", label: "Projets", icon: I.code },
    { key: "blog", label: "Blog", icon: I.blog },
    { key: "about", label: "À propos", icon: I.about },
  ];
  const isOn = k => page === k;

  return (
    <>
      <style>{CSS}</style>
      <div>
        {/* Warm glow background */}
        <div className="glow" />

        {/* ── TOPBAR ── */}
        <header className="topbar">
          <span className="tb-tz">Africa/Brazzaville</span>
          <nav className="nav-pill">
            {navItems.map(n => (
              <button key={n.key} className={`ni ${n.ico ? "ico" : ""} ${isOn(n.key) ? "on" : ""}`} onClick={() => go(n.key)}>
                {n.icon}{n.label && <span>{n.label}</span>}
              </button>
            ))}
            <span className="nav-sep" />
            <button className="theme-btn" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} title={theme === "dark" ? "Mode jour" : "Mode nuit"}>
              {theme === "dark" ? I.moon : I.sun}
            </button>
          </nav>
          <button className="hamburger" style={{ display: "none" }} onClick={() => setMob(!mob)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mob ? <path d="M6 6l12 12M18 6L6 18" /> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
            </svg>
          </button>
        </header>

        <div className={`mob-nav ${mob ? "open" : ""}`}>
          {navItems.filter(n => n.label).map(n => (
            <button key={n.key} className={`ni ${isOn(n.key) ? "on" : ""}`} onClick={() => go(n.key)}>{n.icon}<span>{n.label}</span></button>
          ))}
          <button className="ni" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
            {theme === "dark" ? I.moon : I.sun}<span>{theme === "dark" ? "Mode jour" : "Mode nuit"}</span>
          </button>
        </div>

        {/* ── CONTENT ── */}
        <div className="wrap" style={{ paddingBottom: 80 }}>
          {page === "home" && <Home go={go} />}
          {page === "products" && <ProductsPage initCat={initCat} />}
          {page === "projects" && <ProjectsPage />}
          {page === "blog" && <BlogPage />}
          {page === "about" && <AboutPage />}
        </div>

        <footer className="footer">© 2026 /Joeldy/ Built with ❤️ <a href="#">React</a> & <a href="#">Node.js</a></footer>
      </div>
    </>
  );
}