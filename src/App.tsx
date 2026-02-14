import { useState, useEffect, useRef, ReactNode } from "react";

/* ═══════════════════════════════════════════
   SCROLL REVEAL HOOK — IntersectionObserver
   ═══════════════════════════════════════════ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`rv ${visible ? "rv-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ═══ ICONS ═══ */
const I = {
  home: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  grid: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  flutter: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.3 12 6.35 16.05 22.364 0H14.314zm-3.96 14.7L6.4 18.654 10.354 22.6H18.4l-3.96-3.95-4.084-3.95z"/></svg>,
  blog: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  about: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  contact: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
  moon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  sun: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  gh: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  ig: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  li: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  mail: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  globe: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  send: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  check: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  bot: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="3"/><circle cx="9" cy="16" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="16" r="1.5" fill="currentColor" stroke="none"/><path d="M8.5 11V7.5a3.5 3.5 0 017 0V11"/><line x1="12" y1="4" x2="12" y2="2"/><circle cx="12" cy="1.5" r="1" fill="currentColor" stroke="none"/></svg>,
  close: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  whatsapp: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  expand: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>,
};

/* ═══ DATA ═══ */
const CATS = ["Restaurant Tech", "FinTech", "E-Commerce", "AI / SaaS", "Mobile Money"];
const PRODUCTS = [
  { id: "bonresto", name: "Bonresto", cat: "Restaurant Tech", sub: "Plateforme de Gestion de Restaurants | Solution Complète", desc: "Solution tout-en-un pour la gestion de restaurants avec commandes, menus digitaux, réservations, analytics et gestion du personnel.", grad: "linear-gradient(135deg,#FF6B35,#F7931E,#F7C948)" },
  { id: "kolo", name: "Kolo", cat: "FinTech", sub: "Application de Tontine Digitale & Épargne | Mobile Money", desc: "Plateforme de tontine numérique avec cercles d'épargne, intégration Mobile Money (Airtel, MTN, Orange), comptes personnels et entreprise.", grad: "linear-gradient(135deg,#10B981,#059669,#047857)" },
  { id: "marketplace", name: "Marketplace", cat: "E-Commerce", sub: "Plateforme E-Commerce Multi-Vendeurs | Marketplace Africaine", desc: "Solution e-commerce complète avec gestion de vendeurs, paiement intégré, suivi de livraison.", grad: "linear-gradient(135deg,#6366F1,#8B5CF6,#A855F7)" },
  { id: "lamu", name: "Lamu AI", cat: "AI / SaaS", sub: "Chatbot IA Support Client | Assistant Intelligent Multilingue", desc: "Assistant propulsé par l'IA pour le support client. Réponses multilingues et analytics conversationnels.", grad: "linear-gradient(135deg,#EC4899,#F43F5E,#EF4444)" },
  { id: "kolopay", name: "Kolo Pay", cat: "Mobile Money", sub: "Passerelle de Paiement Mobile Money | Airtel, MTN, Orange", desc: "Infrastructure de paiement pour accepter les paiements Mobile Money. SDK simple et dashboard temps réel.", grad: "linear-gradient(135deg,#F59E0B,#D97706,#B45309)" },
  { id: "bonresto-pos", name: "Bonresto POS", cat: "Restaurant Tech", sub: "Caisse Enregistreuse Digitale | Point de Vente Restaurant", desc: "Système de caisse moderne pour restaurants avec gestion de tables, tickets et synchronisation cloud.", grad: "linear-gradient(135deg,#EF4444,#DC2626,#B91C1C)" },
];
const PROJECTS = [
  { id: 1, title: "React Native - Kolo Profil & Gestion Biométrique - Jour 30", type: "UI", tag: "Example" },
  { id: 2, title: "React Native - Bonresto Dashboard Analytics - Jour 29", type: "UI", tag: "Example" },
  { id: 3, title: "React Native - Kolo Tiers & Badges - Jour 28", type: "UI", tag: "Example" },
  { id: 4, title: "React Native - Marketplace Interface Vendeur - Jour 27", type: "UI", tag: "Design" },
  { id: 5, title: "Node.js - API Mobile Money Airtel/MTN - Jour 26", type: "API", tag: "Example" },
  { id: 6, title: "React Native - Bonresto Réservation - Jour 25", type: "UI", tag: "Example" },
  { id: 7, title: "React Native - Kolo Corporate PDF/Excel - Jour 24", type: "Feature", tag: "Example" },
  { id: 8, title: "React - Lamuka Tech Landing - Jour 23", type: "Web", tag: "Design" },
  { id: 9, title: "Python - Lamu AI Chatbot - Jour 22", type: "AI", tag: "Example" },
  { id: 10, title: "React Native - Kolo Messagerie - Jour 21", type: "UI", tag: "Example" },
];
const EXP = [{ company: "Lamuka Tech", period: "2023 - Présent", role: "Fondateur & Lead Developer", bullets: ["Conception et développement de Bonresto, Kolo et Marketplace avec React Native et Node.js.", "Architecture backend avec PostgreSQL, Prisma ORM, Express.js, JWT et audit logging.", "Intégration Mobile Money (Airtel, MTN, Orange), auth biométrique, multilingue."] }];
const SKL = [{ t: "Développement Mobile", d: "Expert React Native, cross-platform iOS/Android. APIs REST, auth biométrique." }, { t: "Développement Web & Backend", d: "Node.js, Express.js, React, Next.js. PostgreSQL, Prisma ORM, JWT, microservices." }, { t: "DevOps & Infrastructure", d: "CI/CD, Docker, cloud. Déploiement automatisé, monitoring." }];

/* Tech Stack */
const STACK = [
  { name: "React Native", color: "#61DAFB", cat: "Mobile" },
  { name: "React", color: "#61DAFB", cat: "Frontend" },
  { name: "Next.js", color: "#EDEDED", cat: "Frontend" },
  { name: "Node.js", color: "#68A063", cat: "Backend" },
  { name: "Express.js", color: "#EDEDED", cat: "Backend" },
  { name: "PostgreSQL", color: "#336791", cat: "Database" },
  { name: "Prisma", color: "#5A67D8", cat: "Database" },
  { name: "TypeScript", color: "#3178C6", cat: "Language" },
  { name: "Python", color: "#FFD43B", cat: "Language" },
  { name: "Docker", color: "#2496ED", cat: "DevOps" },
  { name: "Git", color: "#F05032", cat: "DevOps" },
  { name: "Firebase", color: "#FFCA28", cat: "Cloud" },
];

/* Timeline */
const TIMELINE = [
  { year: "2023", q: "Q1", title: "Création de Lamuka Tech", desc: "Fondation de l'entreprise à Brazzaville. Études de marché et premières ébauches.", icon: "🚀" },
  { year: "2023", q: "Q3", title: "Lancement de Bonresto v1", desc: "Première version de la plateforme de gestion de restaurants. Tests en conditions réelles.", icon: "🍽️" },
  { year: "2024", q: "Q1", title: "Kolo — Tontine Digitale", desc: "Début du développement de Kolo. Intégration Mobile Money (Airtel, MTN, Orange).", icon: "💰" },
  { year: "2024", q: "Q3", title: "Marketplace & APIs", desc: "Lancement de la plateforme e-commerce multi-vendeurs et des APIs de paiement.", icon: "🛒" },
  { year: "2025", q: "Q1", title: "Kolo 2.0 & Mode Corporate", desc: "Ajout comptes entreprise, exports PDF/Excel, reporting avancé, authentification biométrique.", icon: "📊" },
  { year: "2025", q: "Q3", title: "Lamu AI — Chatbot Multilingue", desc: "Assistant IA pour support client en Français, English, Lingala et Kikongo.", icon: "🤖" },
  { year: "2026", q: "Q1", title: "Expansion Internationale", desc: "Ouverture vers l'Afrique de l'Ouest. Nouveaux partenariats et scaling de l'infrastructure.", icon: "🌍" },
];

/* ═══ LAMU AI CHATBOT DATA ═══ */
type Lang = "fr" | "en" | "ln";

const FAQ: Record<Lang, Array<{ q: string; a: string; keys: string[] }>> = {
  fr: [
    { q: "Qu'est-ce que Bonresto ?", a: "Bonresto est notre plateforme tout-en-un de gestion de restaurants : commandes, menus digitaux, réservations, analytics et gestion du personnel. Conçue pour l'Afrique francophone avec des prix en FCFA.", keys: ["bonresto", "restaurant", "menu", "commande", "réservation"] },
    { q: "Comment fonctionne Kolo ?", a: "Kolo est une application de tontine digitale. Vous créez ou rejoignez des cercles d'épargne, avec intégration Mobile Money (Airtel, MTN, Orange). Disponible en mode personnel et corporate avec badges, tiers et reporting.", keys: ["kolo", "tontine", "épargne", "cercle", "savings"] },
    { q: "C'est quoi le Marketplace ?", a: "Notre Marketplace est une plateforme e-commerce multi-vendeurs pensée pour l'Afrique. Les vendeurs gèrent leurs boutiques, les acheteurs paient via Mobile Money, et le suivi de livraison est intégré.", keys: ["marketplace", "e-commerce", "vendeur", "boutique", "acheter"] },
    { q: "Qu'est-ce que Lamu AI ?", a: "Lamu AI est notre assistant intelligent multilingue (Français, English, Lingala, Kikongo). Il gère le support client automatisé, s'intègre sur le web et fournit des analytics conversationnels.", keys: ["lamu", "chatbot", "ia", "ai", "assistant", "intelligence"] },
    { q: "Quels moyens de paiement acceptez-vous ?", a: "Nous intégrons Mobile Money via Kolo Pay : Airtel Money, MTN Mobile Money et Orange Money. Le SDK est simple à intégrer et le dashboard offre un suivi en temps réel.", keys: ["paiement", "payment", "mobile money", "airtel", "mtn", "orange", "argent", "prix"] },
    { q: "Comment vous contacter ?", a: "Vous pouvez nous écrire à joeldytsina94@gmail.com, nous contacter via WhatsApp, ou remplir le formulaire sur la page Contact. Nous répondons sous 24h !", keys: ["contact", "email", "joindre", "écrire", "téléphone"] },
    { q: "Où êtes-vous basés ?", a: "Lamuka Tech est basée à Brazzaville, au Congo 🇨🇬. Nous servons l'Afrique francophone et nous nous étendons vers l'Afrique de l'Ouest.", keys: ["où", "basé", "localisation", "brazzaville", "congo", "adresse"] },
    { q: "Je veux un devis", a: "Super ! Pour un devis personnalisé, envoyez-nous un message avec votre besoin via le formulaire Contact ou par email à joeldytsina94@gmail.com. Nous vous répondrons avec une proposition détaillée.", keys: ["devis", "prix", "tarif", "coût", "combien", "gratuit"] },
  ],
  en: [
    { q: "What is Bonresto?", a: "Bonresto is our all-in-one restaurant management platform: orders, digital menus, reservations, analytics and staff management. Built for Francophone Africa with FCFA pricing.", keys: ["bonresto", "restaurant", "menu", "order"] },
    { q: "How does Kolo work?", a: "Kolo is a digital tontine/savings circle app. Create or join savings circles with Mobile Money integration (Airtel, MTN, Orange). Available in personal and corporate modes.", keys: ["kolo", "tontine", "savings", "circle"] },
    { q: "What is the Marketplace?", a: "Our Marketplace is a multi-vendor e-commerce platform built for Africa. Vendors manage shops, buyers pay via Mobile Money, with integrated delivery tracking.", keys: ["marketplace", "e-commerce", "vendor", "shop", "buy"] },
    { q: "What is Lamu AI?", a: "Lamu AI is our multilingual intelligent assistant (French, English, Lingala, Kikongo). It handles automated customer support, web integration and conversational analytics.", keys: ["lamu", "chatbot", "ai", "assistant"] },
    { q: "How to contact you?", a: "Email us at joeldytsina94@gmail.com, reach out via WhatsApp, or fill the Contact form. We respond within 24h!", keys: ["contact", "email", "reach", "phone"] },
    { q: "I want a quote", a: "Great! For a custom quote, send us a message via the Contact form or email joeldytsina94@gmail.com. We'll reply with a detailed proposal.", keys: ["quote", "price", "cost", "how much", "free"] },
  ],
  ln: [
    { q: "Bonresto ezali nini?", a: "Bonresto ezali plateforme ya gestion ya ba restaurants : ba commandes, ba menus digitaux, ba réservations, analytics pe gestion ya ba employés. Esalamá pona Afrique francophone.", keys: ["bonresto", "restaurant", "mesa"] },
    { q: "Kolo esalaka ndenge nini?", a: "Kolo ezali application ya tontine digitale. Okoki kosala to kokota na cercle ya épargne na Mobile Money (Airtel, MTN, Orange). Ezali pona bato pe ba entreprises.", keys: ["kolo", "tontine", "mbongo", "épargne"] },
    { q: "Marketplace ezali nini?", a: "Marketplace na biso ezali plateforme ya e-commerce pona ba vendeurs mingi na Afrique. Ba vendeurs bakoki kotia biloko, ba acheteurs bafutaka na Mobile Money.", keys: ["marketplace", "vendeur", "acheter", "biloko"] },
    { q: "Ndenge nini nakoki kokutana na bino?", a: "Okoki kotinda email na joeldytsina94@gmail.com, kokutana na biso na WhatsApp, to kotondisa formulaire na page Contact. Toyanolaka na 24h!", keys: ["contact", "kokutana", "email", "téléphone"] },
  ],
};

const LAMU_SYSTEM = `Tu es Lamu, l'assistant IA de Lamuka Tech, une entreprise technologique basée à Brazzaville, Congo. 

PRODUITS:
- Bonresto: plateforme gestion restaurants (commandes, menus digitaux, réservations, analytics, personnel). Prix en FCFA.
- Kolo: tontine digitale avec Mobile Money (Airtel, MTN, Orange). Mode personnel et corporate. Badges, tiers, reporting.
- Marketplace: e-commerce multi-vendeurs pour l'Afrique. Paiement Mobile Money, suivi livraison.
- Lamu AI: chatbot multilingue (FR, EN, Lingala, Kikongo) pour support client.
- Kolo Pay: passerelle paiement Mobile Money. SDK simple, dashboard temps réel.
- Bonresto POS: caisse enregistreuse digitale pour restaurants.

FONDATEUR: Joeldy, développeur Full-Stack (React Native, Node.js, PostgreSQL).
CONTACT: joeldytsina94@gmail.com | WhatsApp: +242 064 663 469 | Brazzaville, Congo 🇨🇬
GitHub: github.com/J0312Y | LinkedIn: linkedin.com/in/joeldy-tsina-84a1b9227 | Instagram: @joeldyofficiel

RÈGLES:
- Réponds dans la langue du message (français, english, ou lingala).
- Sois concis, professionnel et chaleureux.
- Si on demande un devis/prix, propose de contacter par email ou WhatsApp.
- Si la question dépasse ton domaine, redirige poliment vers le contact.
- Maximum 3-4 phrases par réponse.`;

/* ═══ CSS ═══ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}

:root,[data-theme="dark"]{
  --bg:#0A0A08;--glow:radial-gradient(ellipse 80% 50% at 50% 0%,rgba(140,80,50,0.18),rgba(100,60,30,0.06) 45%,transparent 70%);
  --surface:#131210;--sh:rgba(255,255,255,0.05);--border:rgba(255,255,255,0.07);--bh:rgba(255,255,255,0.14);
  --text:#EDEBE6;--t2:#9C9889;--t3:#68645A;--shadow:0 20px 60px rgba(0,0,0,.4);
  --taga:rgba(99,102,241,.12);--tagac:#818CF8;--tagb:rgba(255,255,255,.05);
  --bb-bg:rgba(19,18,16,0.92);--bb-border:rgba(255,255,255,0.1);
  --accent:#C9A84C;--accent2:#D4A843;
  --input-bg:rgba(255,255,255,0.04);--input-border:rgba(255,255,255,0.1);
}
[data-theme="light"]{
  --bg:#FAF8F5;--glow:linear-gradient(180deg,rgba(245,180,155,0.55) 0%,rgba(248,200,175,0.3) 30%,rgba(250,220,200,0.1) 55%,transparent 70%);
  --surface:#FFFFFF;--sh:rgba(0,0,0,0.04);--border:rgba(0,0,0,0.08);--bh:rgba(0,0,0,0.15);
  --text:#191815;--t2:#5E5B53;--t3:#908C82;--shadow:0 20px 60px rgba(0,0,0,.06);
  --taga:rgba(99,102,241,.08);--tagac:#6366F1;--tagb:rgba(0,0,0,.04);
  --bb-bg:rgba(255,255,255,0.92);--bb-border:rgba(0,0,0,0.1);
  --accent:#B8942B;--accent2:#A07E20;
  --input-bg:rgba(0,0,0,0.03);--input-border:rgba(0,0,0,0.12);
}

html{scroll-behavior:smooth}
body,html{background:var(--bg);color:var(--text);font-family:'Inter',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.55;transition:background .3s,color .3s}
.glow{position:fixed;inset:0;background:var(--glow);pointer-events:none;z-index:0;transition:background .3s}

/* ═══ SCROLL REVEAL ANIMATIONS ═══ */
.rv{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.rv-in{opacity:1;transform:translateY(0)}

/* ═══ TOPBAR ═══ */
.topbar{position:sticky;top:0;z-index:100;height:68px;display:flex;align-items:center;justify-content:center;padding:0 40px;background:color-mix(in srgb,var(--bg) 80%,transparent);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}
.tz{position:absolute;left:40px;top:50%;transform:translateY(-50%);font-size:14px;color:var(--t3);font-weight:500}
.pill{display:inline-flex;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:100px;padding:4px}
.ni{display:flex;align-items:center;gap:7px;padding:10px 18px;border-radius:100px;border:none;background:transparent;color:var(--t3);font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .2s;white-space:nowrap}
.ni:hover{color:var(--t2);background:var(--sh)}.ni.on{color:var(--text);background:var(--sh);box-shadow:inset 0 0 0 1px var(--border)}
.ni svg{opacity:.5;flex-shrink:0}.ni.on svg{opacity:1}.ni.ico{padding:10px 14px}
.sep{width:1px;height:22px;background:var(--border);margin:0 2px;flex-shrink:0}
.tbtn{display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;border:none;background:transparent;color:var(--t3);cursor:pointer;transition:all .2s}
.tbtn:hover{color:var(--t2);background:var(--sh)}

/* ═══ MOBILE BOTTOM BAR ═══ */
.bb{display:none;position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:200;background:var(--bb-bg);border:1px solid var(--bb-border);border-radius:100px;padding:8px 12px;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);box-shadow:0 8px 32px rgba(0,0,0,0.25)}
.bb-inner{display:flex;align-items:center;gap:4px}
.bbi{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;border:none;background:transparent;color:var(--t3);cursor:pointer;transition:all .2s;padding:0}
.bbi.on{color:var(--text);background:var(--sh)}.bbi svg{opacity:.55}.bbi.on svg{opacity:1}

/* ═══ LAYOUT ═══ */
.wrap{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:0 40px}
.cc{display:flex;flex-direction:column;align-items:center}

/* ═══ HOME ═══ */
.hbadge{display:inline-flex;align-items:center;gap:4px;margin-top:56px;padding:8px 18px;border-radius:100px;border:1px solid var(--border);font-size:14px;color:var(--t2);cursor:pointer;text-decoration:none;transition:border-color .2s;background:var(--surface)}
.hbadge:hover{border-color:var(--bh)}.hbadge strong{color:var(--text);margin-left:4px}
.hhero{text-align:center;padding:28px 0;max-width:680px;margin:0 auto}
.hhero h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(30px,6vw,58px);font-weight:700;letter-spacing:-.03em;line-height:1.08;margin-bottom:18px}
.hhero p{font-size:17px;color:var(--t2);line-height:1.6;max-width:480px;margin:0 auto}
.hsoc{display:flex;justify-content:center;gap:20px;padding:28px 0 12px}
.hsoc-i{color:var(--text);opacity:.6;transition:opacity .2s;cursor:pointer;display:flex}.hsoc-i:hover{opacity:1}
.hstats{display:flex;justify-content:center;gap:14px;padding:20px 0 52px;flex-wrap:wrap}
.hst{display:flex;align-items:center;gap:8px;padding:14px 28px;border-radius:100px;border:1px solid var(--border);background:var(--surface)}
.hst .n{font-size:18px;font-weight:700;letter-spacing:-.02em}.hst .l{font-size:14px;color:var(--t2)}

/* Product cards */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px;width:100%;padding-bottom:64px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:20px;overflow:hidden;cursor:pointer;transition:all .25s}
.card:hover{border-color:var(--bh);transform:translateY(-3px);box-shadow:var(--shadow)}
.cimg{height:220px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.pm{width:88px;height:150px;border-radius:18px;background:rgba(255,255,255,.14);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);box-shadow:0 16px 48px rgba(0,0,0,.3)}.pm.s{transform:translateX(-14px) scale(.88);opacity:.5}
.cbody{padding:20px 24px 24px}.cbody h3{font-size:16px;font-weight:600;line-height:1.4;margin-bottom:10px}
.cbody p{font-size:14px;color:var(--t2);line-height:1.6;margin-bottom:20px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.cact{display:flex;gap:12px}
.bp{padding:10px 20px;border-radius:12px;background:var(--text);color:var(--bg);font-size:13px;font-weight:600;border:none;cursor:pointer;font-family:inherit}.bp:hover{opacity:.85}
.bs{padding:10px 20px;border-radius:12px;background:transparent;border:1px solid var(--border);color:var(--t2);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}.bs:hover{border-color:var(--bh);color:var(--text)}

/* ═══ TECH STACK SECTION ═══ */
.stack-sec{border-top:1px solid var(--border);padding:56px 0;width:100%;text-align:center}
.stack-sec h2{font-size:28px;font-weight:600;letter-spacing:-.03em;margin-bottom:8px}
.stack-sec>p{font-size:15px;color:var(--t2);margin-bottom:32px}
.stack-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.stack-chip{display:flex;align-items:center;gap:10px;padding:12px 22px;border-radius:14px;border:1px solid var(--border);background:var(--surface);transition:all .25s;cursor:default}
.stack-chip:hover{border-color:var(--bh);transform:translateY(-2px);box-shadow:var(--shadow)}
.stack-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.stack-chip span{font-size:14px;font-weight:500}
.stack-chip small{font-size:11px;color:var(--t3);font-weight:500}

/* ═══ TIMELINE ═══ */
.tl-sec{border-top:1px solid var(--border);padding:56px 0;width:100%}
.tl-sec h2{font-size:28px;font-weight:600;letter-spacing:-.03em;margin-bottom:8px;text-align:center}
.tl-sec>p{font-size:15px;color:var(--t2);margin-bottom:40px;text-align:center}
.tl{position:relative;padding-left:40px}
.tl::before{content:'';position:absolute;left:15px;top:8px;bottom:8px;width:2px;background:var(--border);border-radius:2px}
.tl-item{position:relative;margin-bottom:36px}
.tl-item:last-child{margin-bottom:0}
.tl-dot{position:absolute;left:-40px;top:4px;width:30px;height:30px;border-radius:50%;background:var(--surface);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:14px;z-index:1;transition:border-color .3s}
.tl-item:hover .tl-dot{border-color:var(--accent)}
.tl-year{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--accent);font-weight:600;margin-bottom:6px;letter-spacing:.04em;text-transform:uppercase}
.tl-item h3{font-size:17px;font-weight:600;margin-bottom:6px;line-height:1.35}
.tl-item p{font-size:14px;color:var(--t2);line-height:1.6}

/* Categories */
.catsec{border-top:1px solid var(--border);padding:56px 0;width:100%;text-align:center}
.catsec h2{font-size:28px;font-weight:600;letter-spacing:-.03em;margin-bottom:24px}
.catrow{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.cpil{padding:10px 24px;border-radius:100px;border:1px solid var(--border);color:var(--t2);font-size:14px;font-weight:500;cursor:pointer;background:none;font-family:inherit;transition:all .2s}
.cpil:hover,.cpil.on{border-color:var(--bh);color:var(--text);background:var(--sh)}

/* Teaser */
.htease{border-top:1px solid var(--border);padding:64px 0 40px;text-align:center;max-width:620px;margin:0 auto}
.htease h2{font-size:28px;font-weight:600;letter-spacing:-.03em;line-height:1.25;margin-bottom:16px}
.htease p{font-size:16px;color:var(--t2);line-height:1.65;margin-bottom:20px}
.htease a{color:var(--t2);font-size:14px;font-weight:500;text-decoration:underline;text-underline-offset:4px;cursor:pointer}

/* ═══ PRODUCTS PAGE ═══ */
.prodh{text-align:center;padding:64px 0 32px;max-width:620px;margin:0 auto}
.prodh h1{font-size:40px;font-weight:600;letter-spacing:-.04em;margin-bottom:12px}.prodh p{font-size:16px;color:var(--t2)}
.pfrow{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:32px}
.pf{padding:8px 20px;border-radius:100px;border:1px solid var(--border);background:transparent;color:var(--t2);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
.pf:hover{border-color:var(--bh)}.pf.on{background:var(--text);color:var(--bg);border-color:var(--text)}

/* ═══ PROJECTS ═══ */
.pjh{text-align:center;padding:64px 0 32px;max-width:620px;margin:0 auto}
.pjh h1{font-size:40px;font-weight:600;letter-spacing:-.04em;margin-bottom:12px}.pjh p{font-size:16px;color:var(--t2)}
.frow{display:flex;gap:4px;margin-bottom:16px;flex-wrap:wrap;justify-content:center}
.ft{padding:8px 18px;border-radius:100px;border:1px solid var(--border);background:transparent;color:var(--t2);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s}
.ft:hover{border-color:var(--bh)}.ft.on{background:var(--text);color:var(--bg);border-color:var(--text)}
.shw{font-size:13px;color:var(--t3);margin-bottom:24px;font-style:italic;text-align:center}
.plist{display:flex;flex-direction:column;gap:8px;width:100%}
.prow{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;background:var(--surface);border:1px solid var(--border);border-radius:20px;transition:border-color .15s;flex-wrap:wrap;gap:12px}
.prow:hover{border-color:var(--bh)}.prow h3{font-size:15px;font-weight:500;margin-bottom:8px;line-height:1.4}
.ptg{display:flex;gap:6px}.tga{padding:3px 10px;border-radius:6px;background:var(--taga);color:var(--tagac);font-size:11px;font-weight:600}
.tgb{padding:3px 10px;border-radius:6px;background:var(--tagb);color:var(--t2);font-size:11px;font-weight:600}
.plk{display:flex;gap:16px}.plk a{font-size:13px;color:var(--t2);text-decoration:none;font-weight:500;transition:color .15s}.plk a:hover{color:var(--text)}
.lmb{display:block;width:100%;margin-top:24px;padding:14px;border-radius:20px;border:1px solid var(--border);background:transparent;color:var(--t2);font-size:14px;font-weight:500;cursor:pointer;font-family:inherit}

/* ═══ BLOG ═══ */
.blh{text-align:center;padding:64px 0 32px;max-width:620px;margin:0 auto}
.blh h1{font-size:40px;font-weight:600;letter-spacing:-.04em;margin-bottom:12px}.blh p{font-size:16px;color:var(--t2)}
.brow{padding:28px 0;border-bottom:1px solid var(--border);cursor:pointer}.brow:hover h3{opacity:.7}
.brow .bd{font-size:12px;color:var(--t3);font-weight:500;margin-bottom:8px}
.brow h3{font-size:18px;font-weight:600;letter-spacing:-.02em;line-height:1.35;margin-bottom:8px;transition:opacity .15s}
.brow p{font-size:14px;color:var(--t2);line-height:1.6}

/* ═══ CONTACT FORM ═══ */
.cth{text-align:center;padding:64px 0 32px;max-width:620px;margin:0 auto}
.cth h1{font-size:40px;font-weight:600;letter-spacing:-.04em;margin-bottom:12px}.cth p{font-size:16px;color:var(--t2)}
.ct-form{width:100%;max-width:600px;display:flex;flex-direction:column;gap:20px}
.ct-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.ct-field{display:flex;flex-direction:column;gap:6px}
.ct-field label{font-size:13px;font-weight:600;color:var(--t2)}
.ct-field input,.ct-field textarea,.ct-field select{
  padding:14px 16px;border-radius:14px;border:1px solid var(--input-border);background:var(--input-bg);
  color:var(--text);font-size:14px;font-family:inherit;outline:none;transition:border-color .2s;resize:vertical;
}
.ct-field input:focus,.ct-field textarea:focus,.ct-field select:focus{border-color:var(--accent)}
.ct-field textarea{min-height:140px}
.ct-send{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  padding:16px 32px;border-radius:14px;border:none;
  background:var(--text);color:var(--bg);font-size:15px;font-weight:600;
  cursor:pointer;font-family:inherit;transition:all .2s;align-self:flex-start;
}
.ct-send:hover{opacity:.85;transform:translateY(-1px)}
.ct-success{display:flex;align-items:center;gap:12px;padding:20px 24px;border-radius:16px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);color:#10B981;font-size:15px;font-weight:500}
.ct-info{display:flex;gap:24px;margin-top:32px;flex-wrap:wrap}
.ct-info-item{display:flex;align-items:center;gap:10px;padding:14px 22px;border-radius:14px;border:1px solid var(--border);background:var(--surface);font-size:14px;color:var(--t2)}
.ct-info-item svg{opacity:.6}

/* ═══ ABOUT ═══ */
.abt{display:grid;grid-template-columns:300px 1fr;gap:56px;padding:56px 0 80px;align-items:start;width:100%}
.abtl{position:sticky;top:96px}
.atabs{display:flex;flex-direction:column;gap:20px;margin-bottom:40px}
.ati{display:flex;align-items:center;gap:14px;background:none;border:none;cursor:pointer;font-family:inherit;font-size:15px;font-weight:500;color:var(--t3);transition:color .2s;padding:0;text-align:left}
.ati.on{color:var(--text)}.ati:hover{color:var(--t2)}
.tds{width:28px;height:1.5px;background:var(--t3);flex-shrink:0;transition:background .2s}.ati.on .tds{background:var(--text)}
.avc{width:160px;height:160px;border-radius:50%;background:var(--sh);display:flex;align-items:center;justify-content:center;margin-bottom:24px;border:2px solid var(--border)}
.avc span{font-size:64px;font-weight:700;color:var(--text);opacity:.22}
.ami{display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:14px;color:var(--t2)}.ami svg{opacity:.5}
.lps{display:flex;gap:8px;margin-top:14px}.lpi{padding:6px 16px;border-radius:100px;border:1px solid var(--border);color:var(--t2);font-size:13px;font-weight:500}
.aname{font-family:'Playfair Display',Georgia,serif;font-size:clamp(40px,5vw,66px);font-weight:400;letter-spacing:-.03em;line-height:1.05;margin-bottom:8px}
.arole{font-size:24px;color:var(--t3);font-weight:400;margin-bottom:32px}
.srow{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:48px}
.spil{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:100px;border:1px solid var(--border);background:var(--surface);color:var(--t2);font-size:14px;font-weight:500;text-decoration:none;transition:all .2s}.spil:hover{border-color:var(--bh);color:var(--text)}
.abio{font-size:17px;color:var(--t2);line-height:1.75;margin-bottom:20px}
.ash{font-size:22px;font-weight:600;letter-spacing:-.02em;margin:48px 0 24px;padding-top:32px;border-top:1px solid var(--border)}
.exc{margin-bottom:16px;padding:24px;background:var(--surface);border:1px solid var(--border);border-radius:20px}
.ext{display:flex;justify-content:space-between;margin-bottom:4px}.exco{font-size:16px;font-weight:600}.expe{font-size:13px;color:var(--t3)}
.exrt{font-size:14px;color:var(--t2);margin-bottom:16px}.exu{padding-left:18px}.exu li{font-size:14px;color:var(--t2);line-height:1.65;margin-bottom:8px}
.skc{padding:24px;background:var(--surface);border:1px solid var(--border);border-radius:20px;margin-bottom:12px}
.skc h3{font-size:15px;font-weight:600;margin-bottom:8px}.skc p{font-size:14px;color:var(--t2);line-height:1.65;margin:0}

/* ═══ FOOTER ═══ */
.footer{border-top:1px solid var(--border);padding:28px 40px;text-align:center;font-size:13px;color:var(--t3)}
.footer a{color:var(--t2);text-decoration:underline;text-underline-offset:3px}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}

/* ═══ LAMU CHATBOT ═══ */
.lamu-float{position:fixed;bottom:28px;right:28px;z-index:150}
.lamu-fab{width:58px;height:58px;border-radius:50%;border:none;background:linear-gradient(135deg,#EC4899,#F43F5E);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(244,63,94,0.4);transition:all .25s}
.lamu-fab:hover{transform:scale(1.08);box-shadow:0 8px 32px rgba(244,63,94,0.5)}
.lamu-fab .pulse{position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(244,63,94,0.4);animation:lamu-pulse 2s infinite}
@keyframes lamu-pulse{0%{transform:scale(1);opacity:1}100%{transform:scale(1.4);opacity:0}}

.lamu-win{
  position:fixed;bottom:100px;right:28px;z-index:151;
  width:400px;max-height:560px;
  background:var(--surface);border:1px solid var(--border);border-radius:24px;
  display:flex;flex-direction:column;overflow:hidden;
  box-shadow:0 24px 80px rgba(0,0,0,.35);
  animation:lamu-in .3s cubic-bezier(.16,1,.3,1);
}
.lamu-full{
  width:100%;max-width:700px;max-height:none;
  position:relative;bottom:auto;right:auto;
  margin:0 auto;min-height:500px;
  box-shadow:var(--shadow);animation:none;
}
@keyframes lamu-in{from{opacity:0;transform:translateY(16px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}

.lamu-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--border);flex-shrink:0}
.lamu-head-l{display:flex;align-items:center;gap:12px}
.lamu-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#EC4899,#F43F5E);display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0}
.lamu-head-l h3{font-size:15px;font-weight:600;line-height:1.2}
.lamu-head-l small{font-size:12px;color:var(--t3)}
.lamu-head-r{display:flex;gap:6px}
.lamu-head-r button{width:32px;height:32px;border-radius:8px;border:none;background:transparent;color:var(--t2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}
.lamu-head-r button:hover{background:var(--sh)}
.lamu-lang{padding:4px 10px;border-radius:8px;border:1px solid var(--border);background:transparent;color:var(--t2);font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s}
.lamu-lang.on{background:var(--text);color:var(--bg);border-color:var(--text)}

.lamu-body{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;min-height:280px}
.lamu-body::-webkit-scrollbar{width:4px}.lamu-body::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}

.lm{max-width:85%;padding:12px 16px;border-radius:18px;font-size:14px;line-height:1.55;animation:lm-in .25s ease}
@keyframes lm-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.lm.bot{align-self:flex-start;background:var(--sh);border:1px solid var(--border);color:var(--text);border-bottom-left-radius:6px}
.lm.user{align-self:flex-end;background:linear-gradient(135deg,#EC4899,#F43F5E);color:#fff;border-bottom-right-radius:6px}
.lm.typing{color:var(--t3);font-style:italic;border:1px dashed var(--border)}

.lamu-faq{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.lamu-faq button{padding:8px 14px;border-radius:12px;border:1px solid var(--border);background:transparent;color:var(--t2);font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s;text-align:left}
.lamu-faq button:hover{border-color:var(--bh);color:var(--text);background:var(--sh)}

.lamu-actions{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}
.lamu-act{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:12px;border:1px solid var(--border);background:transparent;color:var(--t2);font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .15s;text-decoration:none}
.lamu-act:hover{border-color:var(--bh);color:var(--text)}
.lamu-act.wa{border-color:rgba(37,211,102,0.3);color:#25D366}.lamu-act.wa:hover{background:rgba(37,211,102,0.08)}

.lamu-input{display:flex;align-items:center;gap:10px;padding:12px 16px;border-top:1px solid var(--border);flex-shrink:0}
.lamu-input input{flex:1;padding:10px 14px;border-radius:12px;border:1px solid var(--input-border);background:var(--input-bg);color:var(--text);font-size:14px;font-family:inherit;outline:none;transition:border-color .2s}
.lamu-input input:focus{border-color:var(--accent)}
.lamu-input button{width:40px;height:40px;border-radius:12px;border:none;background:linear-gradient(135deg,#EC4899,#F43F5E);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:opacity .15s;flex-shrink:0}
.lamu-input button:hover{opacity:.85}

.lamu-page-h{text-align:center;padding:64px 0 32px;max-width:620px;margin:0 auto}
.lamu-page-h h1{font-size:40px;font-weight:600;letter-spacing:-.04em;margin-bottom:12px}
.lamu-page-h p{font-size:16px;color:var(--t2)}

@media(max-width:900px){
  .lamu-float{bottom:90px;right:16px}
  .lamu-win{right:16px;left:16px;width:auto;bottom:160px;max-height:420px}
  .lamu-fab{width:52px;height:52px}
  .topbar{display:none!important}.bb{display:block!important}
  .wrap{padding:0 20px;padding-bottom:100px}
  .pgrid{grid-template-columns:1fr}.hstats{gap:10px}.hst{padding:12px 20px}.hst .n{font-size:16px}.hst .l{font-size:12px}
  .hhero h1{font-size:clamp(26px,8vw,40px)}
  .prodh h1,.pjh h1,.blh h1,.cth h1{font-size:28px}
  .catsec h2,.htease h2,.stack-sec h2,.tl-sec h2{font-size:22px}
  .abt{grid-template-columns:1fr;gap:32px}.abtl{position:static}
  .avc{width:120px;height:120px}.avc span{font-size:48px}
  .aname{font-size:36px}.arole{font-size:18px}
  .prow{flex-direction:column;align-items:flex-start}
  .ct-row{grid-template-columns:1fr}
  .ct-info{flex-direction:column;gap:10px}
  .footer{padding:20px;margin-bottom:70px}
}
`;

/* ═══ PAGES ═══ */
function Home({ go }: { go: (p: string, cat?: string) => void }) {
  return (
    <div className="cc">
      <Reveal><a className="hbadge" onClick={() => go("products")}>Projet récent : <strong>Kolo 2.0 🚀</strong></a></Reveal>
      <Reveal delay={100}>
        <section className="hhero">
          <h1>Construire des solutions technologiques pour l'Afrique</h1>
          <p>Je conçois pour la différence — en priorisant la clarté, l'accessibilité et une connexion authentique avec les utilisateurs.</p>
        </section>
      </Reveal>
      <Reveal delay={200}>
        <div className="hsoc">
          <a className="hsoc-i" href="https://github.com/J0312Y" target="_blank" rel="noreferrer">{I.gh}</a><a className="hsoc-i" href="https://www.instagram.com/joeldyofficiel" target="_blank" rel="noreferrer">{I.ig}</a>
          <a className="hsoc-i" href="https://www.linkedin.com/in/joeldy-tsina-84a1b9227" target="_blank" rel="noreferrer">{I.li}</a><a className="hsoc-i" href="mailto:joeldytsina94@gmail.com">{I.mail}</a>
        </div>
      </Reveal>
      <Reveal delay={250}>
        <div className="hstats">
          <div className="hst"><span className="n">4+</span><span className="l">Produits</span></div>
          <div className="hst"><span className="n">120+</span><span className="l">Écrans conçus</span></div>
        </div>
      </Reveal>
      <section className="pgrid">
        {PRODUCTS.slice(0, 4).map((p, i) => (
          <Reveal key={p.id} delay={300 + i * 100}>
            <div className="card" onClick={() => go("products")}>
              <div className="cimg" style={{ background: p.grad }}><div className="pm s" /><div className="pm" /></div>
              <div className="cbody"><h3>{p.name}: {p.sub}</h3><p>{p.desc}</p><div className="cact"><button className="bp">Découvrir</button><button className="bs">Démo live</button></div></div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── TECH STACK ── */}
      <Reveal>
        <section className="stack-sec">
          <h2>Stack Technique</h2>
          <p>Les technologies que j'utilise au quotidien</p>
          <div className="stack-grid">
            {STACK.map((s, i) => (
              <Reveal key={s.name} delay={i * 50}>
                <div className="stack-chip">
                  <div className="stack-dot" style={{ background: s.color }} />
                  <span>{s.name}</span>
                  <small>{s.cat}</small>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── TIMELINE ── */}
      <Reveal>
        <section className="tl-sec">
          <h2>Parcours Lamuka Tech</h2>
          <p>Du concept à la réalité — notre roadmap</p>
          <div className="tl">
            {TIMELINE.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="tl-item">
                  <div className="tl-dot">{t.icon}</div>
                  <div className="tl-year">{t.year} · {t.q}</div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="catsec">
          <h2>Explorer par catégorie</h2>
          <div className="catrow">{CATS.map(c => (<button key={c} className="cpil" onClick={() => go("products", c)}>{c}</button>))}</div>
        </section>
      </Reveal>
      <Reveal>
        <section className="htease">
          <h2>Transformer les idées en solutions digitales élégantes et fonctionnelles.</h2>
          <p>Je suis développeur Full-Stack basé à Brazzaville 🇨🇬, fondateur de Lamuka Tech. Je crée des produits pensés pour les réalités africaines.</p>
          <a onClick={() => go("about")}>À propos de moi</a>
        </section>
      </Reveal>
    </div>
  );
}

function Prods({ initCat }: { initCat: string | null }) {
  const [cat, sC] = useState(initCat || "Tous");
  const list = cat === "Tous" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  return (
    <div className="cc">
      <Reveal><div className="prodh"><h1>Nos Produits</h1><p>Tous les produits Lamuka Tech pour les marchés africains.</p></div></Reveal>
      <Reveal delay={100}>
        <div className="pfrow">
          <button className={`pf ${cat === "Tous" ? "on" : ""}`} onClick={() => sC("Tous")}>Tous</button>
          {CATS.map(c => (<button key={c} className={`pf ${cat === c ? "on" : ""}`} onClick={() => sC(c)}>{c}</button>))}
        </div>
      </Reveal>
      <section className="pgrid">{list.map((p, i) => (
        <Reveal key={p.id} delay={i * 80}>
          <div className="card">
            <div className="cimg" style={{ background: p.grad }}><div className="pm s" /><div className="pm" /></div>
            <div className="cbody"><h3>{p.name}: {p.sub}</h3><p>{p.desc}</p><div className="cact"><button className="bp">Découvrir</button><button className="bs">Démo live</button></div></div>
          </div>
        </Reveal>
      ))}</section>
      {list.length === 0 && <p style={{ color: "var(--t3)", textAlign: "center", padding: "40px 0" }}>Aucun produit dans cette catégorie.</p>}
    </div>
  );
}

function Proj() {
  const [f, sF] = useState("all");
  const [show, setShow] = useState(5);
  const tabs = [{ k: "all", l: "Tous" }, { k: "UI", l: "UI Designs" }, { k: "API", l: "APIs" }, { k: "Feature", l: "Features" }];
  const filtered = f === "all" ? PROJECTS : PROJECTS.filter(p => p.type === f);
  const visible = filtered.slice(0, show);
  const remaining = filtered.length - visible.length;

  const changeFilter = (key: string) => { sF(key); setShow(5); };

  return (
    <div className="cc">
      <Reveal><div className="pjh"><h1>Projets & Réalisations</h1><p>Designs UI, APIs et applications réelles.</p></div></Reveal>
      <Reveal delay={100}><div className="frow">{tabs.map(t => (<button key={t.k} className={`ft ${f === t.k ? "on" : ""}`} onClick={() => changeFilter(t.k)}>{t.l}</button>))}</div></Reveal>
      <p className="shw">Showing {visible.length} of {filtered.length} projects{remaining > 0 ? ` (${remaining} more available)` : ""}</p>
      <div className="plist">{visible.map((p, i) => (
        <Reveal key={p.id} delay={i * 60}>
          <div className="prow">
            <div style={{ flex: 1, minWidth: 200 }}><h3>{p.title}</h3><div className="ptg"><span className="tga">{p.type}</span><span className="tgb">{p.tag}</span></div></div>
            <div className="plk"><a href="#">Voir le code</a><a href="#">Détails</a></div>
          </div>
        </Reveal>
      ))}</div>
      {remaining > 0 && (
        <button className="lmb" onClick={() => setShow(s => s + 5)}>
          Charger plus ({remaining} restant{remaining > 1 ? "s" : ""})
        </button>
      )}
    </div>
  );
}

function Blg() {
  const posts = [{ id: 1, t: "Pourquoi le Mobile Money est l'avenir du paiement en Afrique", d: "10 Fév 2026", p: "Analyse des tendances de paiement mobile." }, { id: 2, t: "Construire une tontine digitale : leçons de Kolo", d: "28 Jan 2026", p: "Retour d'expérience sur Kolo." }, { id: 3, t: "React Native vs Flutter pour le marché africain", d: "15 Jan 2026", p: "Comparaison des frameworks mobiles." }];
  return (
    <div className="cc">
      <Reveal><div className="blh"><h1>Blog</h1><p>Tech en Afrique, tutoriels et retours d'expérience.</p></div></Reveal>
      <div style={{ width: "100%" }}>{posts.map((p, i) => (<Reveal key={p.id} delay={i * 100}><div className="brow"><div className="bd">{p.d}</div><h3>{p.t}</h3><p>{p.p}</p></div></Reveal>))}</div>
    </div>
  );
}

/* ═══ CONTACT PAGE ═══ */
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }, 4000);
  };

  return (
    <div className="cc">
      <Reveal><div className="cth"><h1>Me Contacter</h1><p>Une idée de projet ? Une collaboration ? N'hésitez pas à me contacter.</p></div></Reveal>

      {sent ? (
        <Reveal><div className="ct-success">{I.check} Message envoyé avec succès ! Je vous répondrai rapidement.</div></Reveal>
      ) : (
        <Reveal delay={100}>
          <div className="ct-form">
            <div className="ct-row">
              <div className="ct-field">
                <label>Nom complet</label>
                <input type="text" placeholder="Votre nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="ct-field">
                <label>Email</label>
                <input type="email" placeholder="votre@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="ct-field">
              <label>Sujet</label>
              <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                <option value="">Choisir un sujet</option>
                <option value="project">Nouveau projet</option>
                <option value="collab">Collaboration</option>
                <option value="product">Question sur un produit</option>
                <option value="other">Autre</option>
              </select>
            </div>
            <div className="ct-field">
              <label>Message</label>
              <textarea placeholder="Décrivez votre projet ou votre demande..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <button className="ct-send" onClick={handleSubmit}>{I.send} Envoyer le message</button>
          </div>
        </Reveal>
      )}

      <Reveal delay={200}>
        <div className="ct-info">
          <div className="ct-info-item">{I.mail} joeldytsina94@gmail.com</div>
          <div className="ct-info-item">{I.globe} Brazzaville, Congo 🇨🇬</div>
          <div className="ct-info-item">{I.gh} github.com/J0312Y</div>
        </div>
      </Reveal>
    </div>
  );
}

/* ═══ LAMU AI CHATBOT COMPONENT ═══ */
interface Msg { role: "bot" | "user"; text: string; faq?: boolean; actions?: boolean }

function LamuChat({ embedded = false, onExpand }: { embedded?: boolean; onExpand?: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<Lang>("fr");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const greetings: Record<Lang, string> = {
    fr: "Bonjour ! 👋 Je suis Lamu, l'assistant IA de Lamuka Tech. Comment puis-je vous aider ?",
    en: "Hello! 👋 I'm Lamu, the AI assistant of Lamuka Tech. How can I help you?",
    ln: "Mbote! 👋 Ngai Lamu, assistant IA ya Lamuka Tech. Ndenge nini nakoki kosalisa yo?",
  };

  useEffect(() => {
    setMsgs([{ role: "bot", text: greetings[lang], faq: true }]);
  }, [lang]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs]);

  const findFAQ = (text: string): string | null => {
    const lower = text.toLowerCase();
    const faqs = FAQ[lang] || FAQ.fr;
    for (const f of faqs) {
      if (f.keys.some(k => lower.includes(k))) return f.a;
    }
    return null;
  };

  const callAI = async (userMsg: string): Promise<string> => {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: LAMU_SYSTEM,
          messages: [
            ...msgs.filter(m => !m.faq).slice(-6).map(m => ({
              role: m.role === "bot" ? "assistant" as const : "user" as const,
              content: m.text
            })),
            { role: "user" as const, content: userMsg }
          ],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((c: any) => c.type === "text" ? c.text : "").filter(Boolean).join("\n");
      return text || fallback(lang);
    } catch {
      return fallback(lang);
    }
  };

  const fallback = (l: Lang) => ({
    fr: "Je suis désolé, je ne peux pas répondre pour le moment. Contactez-nous à joeldytsina94@gmail.com ou via WhatsApp !",
    en: "Sorry, I can't respond right now. Please contact us at joeldytsina94@gmail.com or via WhatsApp!",
    ln: "Bolimbisi, nakoki te koyanola sikoyo. Kotinda email na joeldytsina94@gmail.com to na WhatsApp!",
  }[l]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");

    setMsgs(prev => [...prev, { role: "user", text: msg }]);

    const faqAnswer = findFAQ(msg);
    if (faqAnswer) {
      setTimeout(() => {
        setMsgs(prev => [...prev, { role: "bot", text: faqAnswer, actions: true }]);
      }, 400);
      return;
    }

    setLoading(true);
    setMsgs(prev => [...prev, { role: "bot", text: "...", faq: false }]);

    const answer = await callAI(msg);
    setMsgs(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = { role: "bot", text: answer, actions: true };
      return updated;
    });
    setLoading(false);
  };

  const faqButtons = (FAQ[lang] || FAQ.fr).slice(0, 4);

  return (
    <div className={`lamu-win ${embedded ? "lamu-full" : ""}`}>
      <div className="lamu-head">
        <div className="lamu-head-l">
          <div className="lamu-avatar">{I.bot}</div>
          <div><h3>Lamu AI</h3><small>Lamuka Tech Assistant</small></div>
        </div>
        <div className="lamu-head-r">
          {(["fr", "en", "ln"] as Lang[]).map(l => (
            <button key={l} className={`lamu-lang ${lang === l ? "on" : ""}`} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
          ))}
          {!embedded && onExpand && <button onClick={onExpand} title="Page dédiée">{I.expand}</button>}
          {!embedded && <button onClick={() => {
            const ev = new CustomEvent("lamu-close");
            window.dispatchEvent(ev);
          }}>{I.close}</button>}
        </div>
      </div>

      <div className="lamu-body" ref={bodyRef}>
        {msgs.map((m, i) => (
          <div key={i}>
            <div className={`lm ${m.role} ${m.text === "..." ? "typing" : ""}`}>
              {m.text === "..." ? (lang === "ln" ? "Nazali kokanisa..." : lang === "en" ? "Thinking..." : "Réflexion...") : m.text}
            </div>
            {m.faq && m.role === "bot" && i === 0 && (
              <div className="lamu-faq">
                {faqButtons.map((f, j) => (
                  <button key={j} onClick={() => send(f.q)}>{f.q}</button>
                ))}
              </div>
            )}
            {m.actions && m.role === "bot" && i === msgs.length - 1 && (
              <div className="lamu-actions">
                <a className="lamu-act wa" href="https://wa.me/242064663469" target="_blank" rel="noreferrer">
                  {I.whatsapp} WhatsApp
                </a>
                <a className="lamu-act" href="mailto:joeldytsina94@gmail.com">
                  {I.mail} Email
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="lamu-input">
        <input
          placeholder={lang === "ln" ? "Komá motuna na yo..." : lang === "en" ? "Type your message..." : "Écrivez votre message..."}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          disabled={loading}
        />
        <button onClick={() => send()} disabled={loading}>{I.send}</button>
      </div>
    </div>
  );
}

/* ═══ LAMU PAGE (dedicated) ═══ */
function LamuPage() {
  return (
    <div className="cc">
      <Reveal>
        <div className="lamu-page-h">
          <h1>🤖 Lamu AI</h1>
          <p>Posez vos questions sur nos produits, demandez un devis ou discutez en Français, English ou Lingala.</p>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <LamuChat embedded={true} />
      </Reveal>
    </div>
  );
}

function Abt() {
  const [tab, sT] = useState("intro");
  const tabs = [{ k: "intro", l: "Introduction" }, { k: "work", l: "Work Experience" }, { k: "skills", l: "Technical skills" }];
  return (
    <div className="abt">
      <aside className="abtl">
        <div className="atabs">{tabs.map(t => (<button key={t.k} className={`ati ${tab === t.k ? "on" : ""}`} onClick={() => sT(t.k)}><span className="tds" />{t.l}</button>))}</div>
        <div className="avc"><span>J</span></div>
        <div className="ami">{I.globe}<span>Africa/Brazzaville</span></div>
        <div className="lps"><span className="lpi">Français</span><span className="lpi">English</span><span className="lpi">Lingala</span></div>
      </aside>
      <main>
        <Reveal><h1 className="aname">Joeldy</h1></Reveal>
        <Reveal delay={50}><p className="arole">Full-Stack Developer</p></Reveal>
        <Reveal delay={100}><div className="srow"><a href="https://github.com/J0312Y" target="_blank" rel="noreferrer" className="spil">{I.gh} GitHub</a><a href="https://www.instagram.com/joeldyofficiel" target="_blank" rel="noreferrer" className="spil">{I.ig} Instagram</a><a href="https://www.linkedin.com/in/joeldy-tsina-84a1b9227" target="_blank" rel="noreferrer" className="spil">{I.li} LinkedIn</a><a href="mailto:joeldytsina94@gmail.com" className="spil">{I.mail} Email</a></div></Reveal>
        {tab === "intro" && (<><Reveal delay={150}><p className="abio">Je suis Joeldy, développeur Full-Stack et fondateur de Lamuka Tech, une entreprise technologique au Congo qui développe des solutions innovantes pour les marchés africains.</p></Reveal><Reveal delay={200}><p className="abio">Passionné par les produits qui répondent aux besoins réels — Bonresto pour la restauration, Kolo pour la tontine digitale, et une plateforme marketplace.</p></Reveal><Reveal delay={250}><p className="abio">Avec un engagement pour l'excellence, je transforme les idées en réalité à travers le code.</p></Reveal></>)}
        {tab === "work" && (<><h2 className="ash" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>Work Experience</h2>{EXP.map(e => (<Reveal key={e.company}><div className="exc"><div className="ext"><span className="exco">{e.company}</span><span className="expe">{e.period}</span></div><p className="exrt">{e.role}</p><ul className="exu">{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul></div></Reveal>))}</>)}
        {tab === "skills" && (<><h2 className="ash" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>Technical Skills</h2>{SKL.map((s, i) => (<Reveal key={s.t} delay={i * 80}><div className="skc"><h3>{s.t}</h3><p>{s.d}</p></div></Reveal>))}</>)}
      </main>
    </div>
  );
}

/* ═══ APP ═══ */
export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [initCat, setIC] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  // Listen for close event from chat widget
  useEffect(() => {
    const handler = () => setChatOpen(false);
    window.addEventListener("lamu-close", handler);
    return () => window.removeEventListener("lamu-close", handler);
  }, []);

  const go = (p: string, cat?: string) => { if (cat) setIC(cat); else setIC(null); setPage(p); window.scrollTo(0, 0); };
  const toggle = () => setTheme((t: string) => t === "dark" ? "light" : "dark");

  const navs: Array<{ k: string; icon: JSX.Element; lbl: string | null; ico?: boolean }> = [
    { k: "home", icon: I.home, lbl: null, ico: true },
    { k: "products", icon: I.grid, lbl: "Produits" },
    { k: "projects", icon: I.flutter, lbl: "Projets" },
    { k: "blog", icon: I.blog, lbl: "Blog" },
    { k: "about", icon: I.about, lbl: "À propos" },
    { k: "contact", icon: I.contact, lbl: "Contact" },
    { k: "lamu", icon: I.bot, lbl: "Lamu AI" },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div>
        <div className="glow" />
        <header className="topbar">
          <span className="tz">Africa/Brazzaville</span>
          <nav className="pill">
            {navs.map(n => (<button key={n.k} className={`ni ${n.ico ? "ico" : ""} ${page === n.k ? "on" : ""}`} onClick={() => go(n.k)}>{n.icon}{n.lbl && <span>{n.lbl}</span>}</button>))}
            <span className="sep" />
            <button className="tbtn" onClick={toggle}>{theme === "dark" ? I.moon : I.sun}</button>
          </nav>
        </header>
        <nav className="bb">
          <div className="bb-inner">
            {navs.map(n => (<button key={n.k} className={`bbi ${page === n.k ? "on" : ""}`} onClick={() => go(n.k)}>{n.icon}</button>))}
            <button className="bbi" onClick={toggle}>{theme === "dark" ? I.moon : I.sun}</button>
          </div>
        </nav>
        <div className="wrap">
          {page === "home" && <Home go={go} />}
          {page === "products" && <Prods initCat={initCat} />}
          {page === "projects" && <Proj />}
          {page === "blog" && <Blg />}
          {page === "about" && <Abt />}
          {page === "contact" && <Contact />}
          {page === "lamu" && <LamuPage />}
        </div>
        <footer className="footer">© 2026 /Joeldy/ Built with ❤️ <a href="#">React</a> & <a href="#">Node.js</a></footer>

        {/* Floating chat bubble — hidden when on Lamu page */}
        {page !== "lamu" && (
          <div className="lamu-float">
            {chatOpen && (
              <LamuChat
                onExpand={() => { setChatOpen(false); go("lamu"); }}
              />
            )}
            <button className="lamu-fab" onClick={() => setChatOpen(!chatOpen)} title="Chat avec Lamu AI">
              {chatOpen ? I.close : I.bot}
              {!chatOpen && <span className="pulse" />}
            </button>
          </div>
        )}
      </div>
    </>
  );
}