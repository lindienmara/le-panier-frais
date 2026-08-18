// TYPE DE BOUTIQUE N° 4 — PAR MARQUES
// ----------------------------------
// Pour ce qui se choisit à l'œil : des chaussures, du prêt-à-porter, des
// lunettes. Le client ne cherche pas dans un catalogue, il regarde.
//
// Trois écrans, et rien de plus :
//
//   1. L'ACCUEIL — une grande photo par marque, empilées, pleine largeur. Le
//      nom de la marque posé dessus. Rien d'autre : ni prix, ni compteur, ni
//      pastille. On choisit une marque comme on entre dans un rayon.
//
//   2. LE CARROUSEL — une photo par page, en grand. On tourne la page pour
//      voir le modèle suivant. C'est le geste d'un catalogue papier, et c'est
//      le seul geste à connaître.
//
//   3. LA FICHE — au doigt sur la photo : la taille, la couleur, le prix.
//      Elle est commune à toutes les boutiques et ne vit pas ici.
//
// POURQUOI SI PEU. Une paire de baskets ne se vend pas sur sa description : on
// l'aime ou non en la voyant. Tout ce qu'on ajoute autour de la photo la
// rétrécit, et rétrécir la photo est la seule erreur qu'on ne rattrape pas
// dans ce type de boutique.
//
// ★ CE FICHIER N'APPARTIENT QU'A CE TYPE.
// Le modifier ne touche ni le type 1, ni le type 2, ni le type 3.

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { visuelFamille, visuelProduit } from "./visuels.js";
import {
  FAMILLES, EST_VIDEOS, GALERIE, CLE, euros,
  TITRE, CORPS, CARTE, bordure, texte, texteDoux, jaune,
} from "./commun.jsx";

// Les marques : les familles de produits, les galeries de vidéos mises à part.
export const MARQUES = FAMILLES.filter((f) => !EST_VIDEOS(f));

// Tous les modèles d'une marque, dans l'ordre du catalogue. Les gammes ne sont
// pas montrées au client — ici, elles ne servent qu'à ranger côté atelier.
export const MODELES = (famille) =>
  (famille.gammes || []).flatMap((g) =>
    (g.produits || []).map((p, i) => ({ produit: p, gamme: g, cle: CLE(famille, g, i, p) })));

/* ═════════ 1. L'ACCUEIL : UNE GRANDE PHOTO PAR MARQUE ═════════ */

function Marque({ famille, onFamille }) {
  const modeles = MODELES(famille);

  /* La photo de la marque si elle en a une, sinon celle de son premier modèle,
     sinon le dessin de secours. Une case vide serait la seule chose à ne pas
     montrer sur un écran qui n'est fait que d'images. */
  const affiche =
    (famille.image || "").trim() ||
    (modeles.length ? (GALERIE(modeles[0].produit)[0] || "") : "") ||
    visuelFamille(famille);

  return (
    <button
      onClick={() => onFamille(famille)}
      className="relative block w-full overflow-hidden active:scale-[.985] transition-transform"
      style={{ height: "clamp(190px, 30vh, 300px)", background: "#0A0A0C" }}
    >
      <img
        src={affiche}
        alt={famille.nom}
        className="w-full h-full object-cover"
        onError={(e) => { e.currentTarget.src = visuelFamille(famille); }}
      />
      {/* Le voile sombre : sans lui, le nom de la marque devient illisible dès
          que la photo est claire — et une photo de produit l'est souvent. */}
      <div
        className="absolute inset-0 flex flex-col items-start justify-end px-5 pb-4"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,.82) 0%, rgba(0,0,0,.25) 45%, rgba(0,0,0,0) 100%)" }}
      >
        <p style={{ fontFamily: TITRE, fontSize: "clamp(26px, 8vw, 40px)", color: "#fff", lineHeight: 1, letterSpacing: ".5px" }}>
          {(famille.nom || "").toUpperCase()}
        </p>
        <p className="mt-1.5 text-[12px]" style={{ color: "#D8D8D8", fontFamily: CORPS, letterSpacing: ".08em" }}>
          {modeles.length} modèle{modeles.length > 1 ? "s" : ""} — voir la collection
        </p>
      </div>
    </button>
  );
}

export function EcranMarques({ onFamille }) {
  if (!MARQUES.length) {
    return (
      <div className="mx-3 mt-6 rounded-2xl px-4 py-8 text-center"
        style={{ background: CARTE, border: `1px solid ${bordure}` }}>
        <p style={{ fontFamily: TITRE, fontSize: 19, color: texte }}>AUCUNE MARQUE</p>
        <p className="text-[13px] mt-2" style={{ color: texteDoux, fontFamily: CORPS, lineHeight: 1.6 }}>
          Ajoute une famille par marque dans l'atelier, avec sa photo.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ gap: 3 }}>
      {MARQUES.map((f) => <Marque key={f.id} famille={f} onFamille={onFamille} />)}
    </div>
  );
}

/* ═════════ 2. LE CARROUSEL : UNE PHOTO PAR PAGE ═════════ */

export function EcranCarrousel({ famille, onProduit, onRetour }) {
  const modeles = MODELES(famille);
  const [i, setI] = useState(0);
  const doigtX = useRef(null);

  const n = modeles.length;
  const suivant = () => setI((k) => (k + 1) % n);
  const precedent = () => setI((k) => (k - 1 + n) % n);

  /* Changer de marque doit toujours ramener à la première page. Sans cela, on
     ouvre une marque de trois modèles en page 7 et l'écran paraît cassé. */
  useEffect(() => { setI(0); }, [famille.id]);

  useEffect(() => {
    if (n < 2) return;
    const touche = (e) => {
      if (e.key === "ArrowRight") suivant();
      else if (e.key === "ArrowLeft") precedent();
    };
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [n, famille.id]);

  const debut = (e) => { doigtX.current = e.touches[0].clientX; };
  const fin = (e) => {
    if (doigtX.current === null || n < 2) return;
    const ecart = e.changedTouches[0].clientX - doigtX.current;
    if (Math.abs(ecart) > 45) (ecart < 0 ? suivant : precedent)();
    doigtX.current = null;
  };

  if (!n) {
    return (
      <div className="mx-3 mt-6 rounded-2xl px-4 py-8 text-center"
        style={{ background: CARTE, border: `1px solid ${bordure}` }}>
        <p style={{ fontFamily: TITRE, fontSize: 19, color: texte }}>
          {(famille.nom || "").toUpperCase()} — RIEN À MONTRER
        </p>
        <p className="text-[13px] mt-2" style={{ color: texteDoux, fontFamily: CORPS, lineHeight: 1.6 }}>
          Cette marque n'a pas encore de modèle.
        </p>
        <button onClick={onRetour} className="mt-5 px-5 py-2.5 rounded-xl"
          style={{ background: CARTE, border: `1px solid ${bordure}`, color: texte, fontFamily: TITRE, fontSize: 14 }}>
          ← LES MARQUES
        </button>
      </div>
    );
  }

  const { produit, gamme } = modeles[Math.min(i, n - 1)];
  const photo = GALERIE(produit)[0] || visuelProduit(produit, famille.couleurs, famille.glyphe);

  /* LE PLEIN ÉCRAN.
     La photo ne partage plus la page avec l'en-tête de la boutique et la barre
     d'onglets : elle prend tout. C'est une couche posée par-dessus le reste,
     fixée à l'écran, au-dessus de la barre du bas.

     Pourquoi si radical : dans ce type de boutique, la photo EST le produit.
     Chaque bandeau qu'on lui laisse autour lui prend de la hauteur, et sur un
     téléphone tenu debout, la hauteur est tout ce qu'on a.

     Tout ce qui reste à l'écran est donc POSÉ SUR la photo, en surimpression,
     et sur un voile sombre pour rester lisible quelle que soit l'image. */
  return (
    <div className="fixed inset-0 z-40 select-none flex flex-col"
      style={{ background: "#08080A" }}
      onTouchStart={debut} onTouchEnd={fin}>

      {/* LA PHOTO, plein cadre. « contain » plutôt que « cover » : une paire de
          chaussures coupée par le bord n'est plus une paire de chaussures. */}
      <img
        src={photo}
        alt={produit.nom}
        className="absolute inset-0 w-full h-full object-contain"
        onError={(e) => { e.currentTarget.src = visuelProduit(produit, famille.couleurs, famille.glyphe); }}
      />

      {/* La barre du haut, en surimpression. */}
      <div className="relative flex items-center gap-3 px-3 pt-3"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}>
        <button onClick={onRetour} aria-label="Revenir aux marques"
          className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform flex-shrink-0"
          style={{ background: "#0C0C10D9", border: `1px solid ${bordure}` }}>
          <ChevronLeft size={20} color="#fff" />
        </button>
        <p className="flex-1 truncate text-center"
          style={{ fontFamily: TITRE, fontSize: 17, color: "#fff", letterSpacing: ".5px", textShadow: "0 2px 10px rgba(0,0,0,.9)" }}>
          {(famille.nom || "").toUpperCase()}
        </p>
        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold flex-shrink-0"
          style={{ background: "#0C0C10D9", border: `1px solid ${bordure}`, color: "#D8D8D8", fontFamily: CORPS }}>
          {i + 1} / {n}
        </span>
      </div>

      {/* Les flèches, au milieu de la hauteur. */}
      {n > 1 && (
        <>
          <button onClick={precedent} aria-label="Modèle précédent"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: "#0C0C10D9", border: `1px solid ${bordure}` }}>
            <ChevronLeft size={22} color="#fff" />
          </button>
          <button onClick={suivant} aria-label="Modèle suivant"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: "#0C0C10D9", border: `1px solid ${bordure}` }}>
            <ChevronRight size={22} color="#fff" />
          </button>
        </>
      )}

      {!produit.dispo && (
        <span className="absolute top-20 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold"
          style={{ background: "#0C0C10E6", border: `1px solid ${bordure}`, color: "#D8D8D8", fontFamily: CORPS }}>
          ÉPUISÉ
        </span>
      )}

      {/* Le bas : le nom, le prix, et le bouton qui mène à la fiche. Posé sur un
          dégradé sombre pour rester lisible sur une photo claire. */}
      <div className="relative mt-auto px-4 pb-5"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom) + 20px)",
          background: "linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.7) 55%, rgba(0,0,0,0) 100%)",
          paddingTop: 56,
        }}>
        <p style={{ fontFamily: TITRE, fontSize: "clamp(22px, 7vw, 32px)", color: "#fff", lineHeight: 1.1 }}>
          {(produit.nom || "").toUpperCase()}
        </p>
        <div className="flex items-baseline gap-3 mt-1.5 flex-wrap">
          {produit.prix > 0 && (
            <span style={{ fontFamily: TITRE, fontSize: 22, color: jaune }}>{euros(produit.prix)}</span>
          )}
          {(produit.tailles || "").trim() && (
            <span className="text-[12.5px]" style={{ color: "#D8D8D8", fontFamily: CORPS }}>
              Tailles {produit.tailles}
            </span>
          )}
        </div>

        <button onClick={() => onProduit(famille, gamme, produit)}
          className="w-full mt-4 py-3.5 rounded-xl active:scale-95 transition-transform"
          style={{ background: "#fff", color: "#0B0B0B", fontFamily: TITRE, fontSize: 16, letterSpacing: ".5px" }}>
          VOIR LES TAILLES ET COMMANDER
        </button>

        {/* Les pastilles : où l'on en est dans la collection. */}
        {n > 1 && n <= 12 && (
          <div className="flex items-center justify-center gap-1.5 mt-4 flex-wrap">
            {modeles.map((m, k) => (
              <button key={m.cle} onClick={() => setI(k)} aria-label={`Modèle ${k + 1}`}
                className="rounded-full transition-all"
                style={{ width: k === i ? 22 : 7, height: 7, background: k === i ? "#fff" : "#FFFFFF55" }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
