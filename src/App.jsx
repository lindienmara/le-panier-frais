import React, { useState, useMemo } from "react";
import {
  ChevronLeft, ChevronRight, Search, ShoppingCart, Plus, Minus, X,
  Home, Info, Link2, Star, MessageCircle, Maximize2,
} from "lucide-react";
import { BOUTIQUE, COULEURS } from "./config.js";
import { FAMILLES, SELECTION_CHEF } from "./catalogue.js";
import { visuelFamille, visuelProduit } from "./visuels.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap');`;

const { fond, fondCarte, bordure, texte, texteDoux, rose, violet, vert, jaune, cyan } = COULEURS;
const DEGRADE = `linear-gradient(90deg, ${rose}, ${violet})`;
const TITRE = "'Anton', 'Arial Narrow', Impact, sans-serif";
const CORPS = "'Inter', -apple-system, 'Segoe UI', sans-serif";

document.title = BOUTIQUE.nom;

const telegram = window.Telegram && window.Telegram.WebApp;
if (telegram) {
  telegram.ready();
  telegram.expand();
}

const euros = (n) => n.toFixed(2).replace(".", ",") + " €";

function cartTotal(items) {
  return items.reduce((s, i) => s + i.prix * i.qty, 0);
}

function buildWhatsAppOrder(items) {
  const lignes = items.map(
    (i) => `• ${i.nom} — ${i.unite} (réf. ${i.ref}) x${i.qty} — ${euros(i.prix * i.qty)}`
  );
  const message = `${BOUTIQUE.accroche}\n\n${lignes.join("\n")}\n\nTotal : ${euros(cartTotal(items))}`;
  return `https://wa.me/${BOUTIQUE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ─────────────────────────── petits éléments ─────────────────────────── */

function Etiquette({ children, couleur = vert }) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded"
      style={{ background: couleur, color: "#0B0B0B", fontFamily: CORPS }}
    >
      {children}
    </span>
  );
}

function Prix({ valeur, taille = 18 }) {
  return (
    <span
      style={{
        fontFamily: TITRE, fontSize: taille, letterSpacing: ".5px",
        backgroundImage: `linear-gradient(90deg, ${jaune}, ${vert})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}
    >
      {euros(valeur)}
    </span>
  );
}

// Grande barre rose en haut de chaque écran : retour + nom de la section.
function BarreSection({ titre, onRetour }) {
  return (
    <div
      className="mx-3 mt-3 rounded-2xl px-3 py-3 flex items-center gap-2"
      style={{ backgroundImage: DEGRADE, boxShadow: `0 6px 22px ${rose}44` }}
    >
      {onRetour ? (
        <button onClick={onRetour} aria-label="Revenir en arrière" className="active:scale-90 transition-transform">
          <ChevronLeft size={22} color="#fff" />
        </button>
      ) : (
        <span className="w-[22px]" />
      )}
      <p className="flex-1 text-right pr-1" style={{ fontFamily: TITRE, fontSize: 17, color: "#fff", letterSpacing: ".5px" }}>
        {titre}
      </p>
    </div>
  );
}

/* ─────────────────────────── écrans ─────────────────────────── */

function EcranAccueil({ onFamille, onProduit }) {
  return (
    <>
      <div className="mx-3 mt-3">
        <div
          className="rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ background: "#0E0E0E", border: `1px solid ${bordure}` }}
        >
          <Star size={18} color={jaune} />
          <p className="flex-1 text-center" style={{ fontFamily: TITRE, fontSize: 15, color: texte, letterSpacing: "1px" }}>
            SÉLECTION DU CHEF
          </p>
          <span style={{ color: texteDoux, fontSize: 12 }}>▾</span>
        </div>

        <div className="flex gap-2 mt-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {SELECTION_CHEF.map((p) => (
            <button
              key={p.ref}
              onClick={() => onProduit(p.famille, p.gamme, p)}
              className="flex-shrink-0 rounded-xl px-3 py-2 text-left active:scale-95 transition-transform"
              style={{ background: fondCarte, border: `1px solid ${bordure}`, minWidth: 148 }}
            >
              <p className="text-[12px] font-bold truncate" style={{ color: texte, fontFamily: CORPS }}>{p.nom}</p>
              <Prix valeur={p.prix} taille={15} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-3 mt-4">
        {FAMILLES.map((f) => (
          <button
            key={f.id}
            onClick={() => onFamille(f)}
            className="relative rounded-2xl overflow-hidden active:scale-[0.98] transition-transform"
            style={{ border: `2px solid ${f.couleurs[0]}`, boxShadow: `0 0 24px ${f.couleurs[0]}33` }}
          >
            <img src={visuelFamille(f)} alt={f.nom} className="w-full block" />
            <span className="absolute top-2 right-2 text-[22px]">{f.emoji}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function EcranGammes({ famille, onGamme, onRetour }) {
  return (
    <>
      <BarreSection titre={`${famille.emoji} ${famille.nom}`} onRetour={onRetour} />
      <div className="flex flex-col gap-3 px-3 mt-4">
        {famille.gammes.map((g) => (
          <button
            key={g.id}
            onClick={() => onGamme(g)}
            className="rounded-2xl px-4 py-4 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
            style={{ backgroundImage: `linear-gradient(100deg, ${violet}, ${rose})`, boxShadow: `0 6px 22px ${violet}44` }}
          >
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: TITRE, fontSize: 21, color: "#fff", letterSpacing: ".5px" }}>
                {g.nom} <span style={{ fontSize: 13, color: cyan }}>{g.etiquette}</span>
              </p>
              <p className="text-[11px] uppercase tracking-wider" style={{ color: "#FFFFFFCC", fontFamily: CORPS }}>
                {g.sousTitre}
              </p>
            </div>
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "#2E5BFF" }}
            >
              <ChevronRight size={18} color="#fff" />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function EcranProduits({ famille, gamme, onProduit, onRetour }) {
  const [recherche, setRecherche] = useState("");
  const [gammeFiltre, setGammeFiltre] = useState(gamme.id);

  const produits = useMemo(() => {
    const source =
      gammeFiltre === "toutes"
        ? famille.gammes.flatMap((g) => g.produits.map((p) => ({ ...p, gamme: g })))
        : famille.gammes.find((g) => g.id === gammeFiltre).produits.map((p) => ({ ...p, gamme: famille.gammes.find((g) => g.id === gammeFiltre) }));
    const q = recherche.trim().toLowerCase();
    return q ? source.filter((p) => p.nom.toLowerCase().includes(q)) : source;
  }, [famille, gammeFiltre, recherche]);

  return (
    <>
      <BarreSection titre={gammeFiltre === "toutes" ? famille.nom : famille.gammes.find((g) => g.id === gammeFiltre).nom} onRetour={onRetour} />

      <div className="mx-3 mt-3 flex items-center gap-2 rounded-xl px-3 py-2.5"
        style={{ background: "#1C1C1C", border: `1px solid ${bordure}` }}>
        <Search size={16} color={texteDoux} />
        <input
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un produit..."
          className="flex-1 bg-transparent outline-none text-[13px]"
          style={{ color: texte, fontFamily: CORPS }}
        />
        {recherche && (
          <button onClick={() => setRecherche("")} aria-label="Effacer">
            <X size={14} color={texteDoux} />
          </button>
        )}
      </div>

      <div className="mx-3 mt-2">
        <select
          value={gammeFiltre}
          onChange={(e) => setGammeFiltre(e.target.value)}
          className="w-full rounded-xl px-3 py-2.5 text-[13px] outline-none appearance-none"
          style={{ background: "#1C1C1C", border: `1px solid ${bordure}`, color: texte, fontFamily: CORPS }}
        >
          <option value="toutes">🧑‍🌾 — Toutes les gammes</option>
          {famille.gammes.map((g) => (
            <option key={g.id} value={g.id}>{g.nom}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 px-3 mt-4">
        {produits.map((p) => (
          <button
            key={p.ref}
            onClick={() => onProduit(famille, p.gamme, p)}
            className="relative rounded-xl overflow-hidden text-left active:scale-[0.97] transition-transform"
            style={{ background: fondCarte, border: `2px solid ${violet}` }}
          >
            <div className="relative">
              <img
                src={visuelProduit({ glyphe: famille.glyphe }, famille.couleurs)}
                alt={p.nom}
                className="w-full aspect-square object-cover block"
                style={{ opacity: p.dispo ? 1 : 0.4 }}
              />
              <span className="absolute top-1.5 right-1.5">
                {p.dispo ? <Etiquette couleur={cyan}>{p.gamme.etiquette}</Etiquette> : <Etiquette couleur="#888">Épuisé</Etiquette>}
              </span>
            </div>
            <div className="p-2.5">
              <p className="text-[12.5px] font-bold leading-tight" style={{ color: texte, fontFamily: CORPS }}>{p.nom}</p>
              <p className="text-[10px] mt-0.5" style={{ color: texteDoux, fontFamily: CORPS }}>{p.unite}</p>
              <div className="mt-1"><Prix valeur={p.prix} taille={16} /></div>
            </div>
          </button>
        ))}
      </div>

      {produits.length === 0 && (
        <p className="text-center text-[13px] mt-8 px-6" style={{ color: texteDoux }}>
          Aucun produit ne correspond à ta recherche.
        </p>
      )}
    </>
  );
}

function EcranFiche({ famille, gamme, produit, onRetour, onAjouter, onZoom }) {
  const [qte, setQte] = useState(1);
  const image = visuelProduit({ glyphe: famille.glyphe }, famille.couleurs);

  return (
    <>
      <BarreSection titre={produit.nom} onRetour={onRetour} />

      <div className="px-3 mt-3">
        <button
          onClick={() => onZoom({ image, nom: produit.nom })}
          className="relative w-full rounded-2xl overflow-hidden block"
          style={{ border: `2px solid ${famille.couleurs[0]}`, boxShadow: `0 0 24px ${famille.couleurs[0]}33` }}
        >
          <img src={image} alt={produit.nom} className="w-full aspect-square object-cover block" />
          <span
            className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
            style={{ background: "#000000AA", color: texte, border: `1px solid ${bordure}` }}
          >
            <Maximize2 size={12} /> Agrandir
          </span>
          {!produit.dispo && (
            <span className="absolute top-3 left-3"><Etiquette couleur="#888">Épuisé</Etiquette></span>
          )}
        </button>
      </div>

      <div className="px-4 mt-4">
        <p style={{ fontFamily: TITRE, fontSize: 28, color: texte, lineHeight: 1.1 }}>{produit.nom}</p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <Etiquette couleur={vert}>{famille.nom}</Etiquette>
          <Etiquette couleur={cyan}>{gamme.nom}</Etiquette>
        </div>

        <p className="text-[14px] mt-4" style={{ color: "#D6E8CC", fontFamily: CORPS, lineHeight: 1.6 }}>
          {produit.description}
        </p>

        <div className="mt-5 rounded-2xl p-4" style={{ background: fondCarte, border: `1px solid ${bordure}` }}>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider" style={{ color: texteDoux, fontFamily: CORPS }}>Prix</p>
              <Prix valeur={produit.prix} taille={32} />
              <p className="text-[12px]" style={{ color: texteDoux, fontFamily: CORPS }}>{produit.unite}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider mb-1 text-right" style={{ color: texteDoux, fontFamily: CORPS }}>Quantité</p>
              <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: fond, border: `1px solid ${bordure}` }}>
                <button onClick={() => setQte((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg flex items-center justify-center active:scale-90" aria-label="Moins">
                  <Minus size={14} color={texte} />
                </button>
                <span className="w-7 text-center font-bold" style={{ color: texte, fontFamily: CORPS }}>{qte}</span>
                <button onClick={() => setQte((q) => q + 1)} className="w-8 h-8 rounded-lg flex items-center justify-center active:scale-90" aria-label="Plus">
                  <Plus size={14} color={texte} />
                </button>
              </div>
            </div>
          </div>

          {produit.dispo ? (
            <button
              onClick={() => onAjouter(produit, qte)}
              className="w-full mt-4 py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              style={{ backgroundImage: DEGRADE, color: "#fff", fontFamily: TITRE, fontSize: 17, letterSpacing: ".5px" }}
            >
              <Plus size={18} /> AJOUTER AU PANIER · {euros(produit.prix * qte)}
            </button>
          ) : (
            <p className="w-full mt-4 py-3.5 rounded-xl text-center text-[13px] font-bold"
              style={{ background: "#262626", color: texteDoux, border: `1px solid ${bordure}` }}>
              Bientôt de retour
            </p>
          )}
        </div>
      </div>
    </>
  );
}

function EcranInfo() {
  return (
    <>
      <BarreSection titre="INFOS PRATIQUES" />
      <div className="px-3 mt-4 flex flex-col gap-3">
        {BOUTIQUE.info.map((bloc) => (
          <div key={bloc.titre} className="rounded-2xl p-4" style={{ background: fondCarte, border: `1px solid ${bordure}` }}>
            <p style={{ fontFamily: TITRE, fontSize: 17, color: jaune }}>{bloc.titre.toUpperCase()}</p>
            <p className="text-[14px] mt-1" style={{ color: "#D6E8CC", fontFamily: CORPS }}>{bloc.texte}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function EcranLiens() {
  const liens = BOUTIQUE.liens.filter((l) => l.url);
  return (
    <>
      <BarreSection titre="LIENS" />
      <div className="px-3 mt-4 flex flex-col gap-3">
        {liens.length === 0 ? (
          <p className="text-center text-[13px] px-6 mt-4" style={{ color: texteDoux, fontFamily: CORPS }}>
            Aucun lien pour le moment. Ajoute-les dans <span style={{ color: jaune }}>src/config.js</span>.
          </p>
        ) : (
          liens.map((l) => (
            <a
              key={l.titre}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl px-4 py-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
              style={{ backgroundImage: `linear-gradient(100deg, ${violet}, ${rose})` }}
            >
              <Link2 size={18} color="#fff" />
              <span className="flex-1" style={{ fontFamily: TITRE, fontSize: 17, color: "#fff" }}>{l.titre}</span>
              <ChevronRight size={18} color="#fff" />
            </a>
          ))
        )}
      </div>
    </>
  );
}

function EcranAvis() {
  return (
    <>
      <BarreSection titre="AVIS" />
      <div className="px-3 mt-4">
        <div className="rounded-2xl p-6 text-center" style={{ background: fondCarte, border: `1px solid ${bordure}` }}>
          <Star size={28} color={jaune} className="mx-auto" />
          <p className="mt-3" style={{ fontFamily: TITRE, fontSize: 19, color: texte }}>PAS ENCORE D'AVIS</p>
          <p className="text-[13px] mt-2" style={{ color: texteDoux, fontFamily: CORPS, lineHeight: 1.6 }}>
            Les avis affichés ici seront de vrais avis de clients. Rien n'est inventé.
          </p>
          <a
            href={`https://wa.me/${BOUTIQUE.whatsapp}?text=${encodeURIComponent("Bonjour, je souhaite laisser un avis sur ma commande :")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-xl active:scale-95 transition-transform"
            style={{ background: "#25D366", color: "#0B0A08", fontFamily: TITRE, fontSize: 15 }}
          >
            <MessageCircle size={16} /> DONNER MON AVIS
          </a>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────── application ─────────────────────────── */

export default function Boutique() {
  const [onglet, setOnglet] = useState("accueil");
  const [famille, setFamille] = useState(null);
  const [gamme, setGamme] = useState(null);
  const [produit, setProduit] = useState(null);
  const [panier, setPanier] = useState([]);
  const [panierOuvert, setPanierOuvert] = useState(false);
  const [zoom, setZoom] = useState(null);

  const nbArticles = panier.reduce((s, i) => s + i.qty, 0);

  const ajouter = (p, qte) => {
    setPanier((actuel) => {
      const existe = actuel.find((i) => i.ref === p.ref);
      if (existe) return actuel.map((i) => (i.ref === p.ref ? { ...i, qty: i.qty + qte } : i));
      return [...actuel, { ref: p.ref, nom: p.nom, unite: p.unite, prix: p.prix, qty: qte }];
    });
    setPanierOuvert(true);
  };

  const changerQte = (ref, delta) => {
    setPanier((actuel) =>
      actuel.map((i) => (i.ref === ref ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );
  };

  const allerProduit = (f, g, p) => {
    setOnglet("accueil"); setFamille(f); setGamme(g); setProduit(p);
  };

  const retour = () => {
    if (produit) setProduit(null);
    else if (gamme) setGamme(null);
    else if (famille) setFamille(null);
  };

  const accueil = () => {
    setOnglet("accueil"); setProduit(null); setGamme(null); setFamille(null);
  };

  const onglets = [
    { id: "accueil", nom: "ACCUEIL", Icone: Home },
    { id: "info", nom: "INFOS", Icone: Info },
    { id: "liens", nom: "LIENS", Icone: Link2 },
    { id: "avis", nom: "AVIS", Icone: Star },
  ];

  return (
    <div className="min-h-screen w-full" style={{ background: `radial-gradient(circle at 50% 0%, #17240F 0%, #060A05 60%)` }}>
      <style>{FONTS}</style>

      <div className="relative w-full max-w-[560px] mx-auto min-h-screen" style={{ background: fond }}>

        {/* bandeau et entête */}
        <div className="sticky top-0 z-20">
          <div className="text-center py-1.5" style={{ backgroundImage: DEGRADE }}>
            <p style={{ fontFamily: CORPS, fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>
              {BOUTIQUE.bandeau}
            </p>
          </div>
          <div
            className="flex items-center justify-between px-3 py-2"
            style={{ background: "#0B0B0BEE", backdropFilter: "blur(8px)", borderBottom: `1px solid ${bordure}` }}
          >
            <span className="w-11" />
            <button onClick={accueil} className="flex flex-col items-center active:scale-95 transition-transform">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden"
                style={{ backgroundImage: DEGRADE, boxShadow: `0 0 18px ${rose}66` }}
              >
                {BOUTIQUE.logo ? (
                  <img
                    src={BOUTIQUE.logo}
                    alt={BOUTIQUE.nom}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ) : (
                  <span style={{ fontSize: 22 }}>{BOUTIQUE.emoji}</span>
                )}
              </div>
              <p style={{ fontFamily: TITRE, fontSize: 11, color: texteDoux, letterSpacing: ".5px", marginTop: 2 }}>
                {BOUTIQUE.nom}
              </p>
            </button>
            <button
              onClick={() => setPanierOuvert(true)}
              className="relative w-11 h-11 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
              style={{ background: fondCarte, border: `1px solid ${bordure}` }}
              aria-label="Ouvrir le panier"
            >
              <ShoppingCart size={19} color={texte} />
              {nbArticles > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full text-[11px] font-bold flex items-center justify-center"
                  style={{ background: vert, color: "#0B0B0B", border: `2px solid ${fond}` }}
                >
                  {nbArticles}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="pb-28">
          {onglet === "info" && <EcranInfo />}
          {onglet === "liens" && <EcranLiens />}
          {onglet === "avis" && <EcranAvis />}
          {onglet === "accueil" && (
            produit ? (
              <EcranFiche famille={famille} gamme={gamme} produit={produit} onRetour={retour} onAjouter={ajouter} onZoom={setZoom} />
            ) : gamme ? (
              <EcranProduits famille={famille} gamme={gamme} onProduit={allerProduit} onRetour={retour} />
            ) : famille ? (
              <EcranGammes famille={famille} onGamme={setGamme} onRetour={retour} />
            ) : (
              <EcranAccueil onFamille={setFamille} onProduit={allerProduit} />
            )
          )}
        </div>

        {/* barre de navigation du bas */}
        <div
          className="fixed bottom-0 left-0 right-0 z-30 flex justify-center gap-2 px-3 py-2.5"
          style={{ background: "#0B0B0BF2", backdropFilter: "blur(10px)", borderTop: `1px solid ${bordure}` }}
        >
          <div className="w-full max-w-[560px] flex justify-around gap-2">
            {onglets.map(({ id, nom, Icone }) => {
              const actif = onglet === id;
              return (
                <button
                  key={id}
                  onClick={() => (id === "accueil" ? accueil() : setOnglet(id))}
                  className="flex-1 flex flex-col items-center gap-0.5 py-2 rounded-2xl active:scale-95 transition-transform"
                  style={{
                    background: actif ? "#1A0A14" : "transparent",
                    border: `2px solid ${actif ? rose : "#3A2130"}`,
                    boxShadow: actif ? `0 0 16px ${rose}55` : "none",
                  }}
                >
                  <Icone size={17} color={actif ? rose : texteDoux} />
                  <span style={{ fontFamily: CORPS, fontSize: 9.5, fontWeight: 700, color: actif ? rose : texteDoux, letterSpacing: ".5px" }}>
                    {nom}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* panier */}
        {panierOuvert && (
          <div
            className="fixed inset-0 z-40 flex items-end justify-center"
            style={{ background: "rgba(0,0,0,.8)" }}
            onClick={() => setPanierOuvert(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[560px] rounded-t-3xl p-5 max-h-[92vh] overflow-y-auto"
              style={{ background: "#101010", border: `1px solid ${bordure}` }}
            >
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontFamily: TITRE, fontSize: 22, color: texte }}>MON PANIER</p>
                <button onClick={() => setPanierOuvert(false)} aria-label="Fermer"><X size={18} color={texteDoux} /></button>
              </div>

              {panier.length === 0 ? (
                <p className="text-center text-[13px] py-8" style={{ color: texteDoux, fontFamily: CORPS }}>
                  Ton panier est vide.
                </p>
              ) : (
                <>
                  <p className="text-[11px] mb-1" style={{ color: texteDoux, fontFamily: CORPS }}>
                    {nbArticles} article{nbArticles > 1 ? "s" : ""}
                  </p>
                  {panier.map((i) => (
                    <div key={i.ref} className="flex items-center gap-3 py-3" style={{ borderTop: `1px solid #232323` }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold leading-tight" style={{ color: texte, fontFamily: CORPS }}>{i.nom}</p>
                        <p className="text-[11px]" style={{ color: texteDoux, fontFamily: CORPS }}>{i.unite} · réf. {i.ref}</p>
                        <div className="mt-0.5"><Prix valeur={i.prix * i.qty} taille={16} /></div>
                      </div>
                      <div className="flex items-center gap-1 rounded-xl p-1 flex-shrink-0" style={{ background: fond, border: `1px solid ${bordure}` }}>
                        <button onClick={() => changerQte(i.ref, -1)} className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-90" aria-label="Retirer">
                          <Minus size={13} color={texte} />
                        </button>
                        <span className="w-6 text-center text-[13px] font-bold" style={{ color: texte }}>{i.qty}</span>
                        <button onClick={() => changerQte(i.ref, 1)} className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-90" aria-label="Ajouter">
                          <Plus size={13} color={texte} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between py-4" style={{ borderTop: `1px solid #232323` }}>
                    <span className="text-[12px] uppercase tracking-wider" style={{ color: texteDoux, fontFamily: CORPS }}>Total</span>
                    <Prix valeur={cartTotal(panier)} taille={30} />
                  </div>

                  <a
                    href={buildWhatsAppOrder(panier)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl active:scale-95 transition-transform"
                    style={{ background: "#25D366", color: "#0B0A08", fontFamily: TITRE, fontSize: 16 }}
                  >
                    <MessageCircle size={18} /> ENVOYER LA COMMANDE
                  </a>
                  <button onClick={() => setPanier([])} className="w-full text-[11px] mt-3 py-1" style={{ color: "#6B6B6B", fontFamily: CORPS }}>
                    Vider le panier
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* photo en grand */}
        {zoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,.95)" }} onClick={() => setZoom(null)}>
            <img src={zoom.image} alt={zoom.nom} className="max-w-full max-h-full object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
            <button
              onClick={() => setZoom(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "#1A1A1ACC", border: `1px solid ${bordure}` }}
              aria-label="Fermer la photo"
            >
              <X size={18} color={texte} />
            </button>
            <p className="absolute bottom-5 left-0 right-0 text-center text-[12px] px-6" style={{ color: texteDoux, fontFamily: CORPS }}>
              {zoom.nom} — tape n'importe où pour fermer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
