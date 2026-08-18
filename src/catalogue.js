// CATALOGUE — TROIS NIVEAUX
// -------------------------
// FAMILLE  →  GAMME  →  PRODUIT
// Fichier produit par l'atelier : atelier — boutique de chaussures

export const FAMILLES = [
  {
    id: "nike",
    nom: "NIKE",
    emoji: "👟",
    glyphe: "boite",
    image: "/produits/nk-air-max-plus.jpg",
    type: "produits",
    couleurs: ["#E23B3B", "#7A1420"],
    gammes: [
      {
        id: "collection",
        nom: "Collection",
        etiquette: "",
        sousTitre: "",
        produits: [
          { ref: "NK-TN-NOIR", nom: "Air Max Plus — Noir", unite: "la paire", prix: 189.99, dispo: true, tailles: "38,5 · 39 · 40 · 40,5 · 41 · 42 · 42,5 · 43 · 44 · 44,5 · 45 · 45,5 · 46 · 47 · 47,5", couleurs: "Noir", chef: true, image: "/produits/nk-air-max-plus.jpg",
            description: "Le TN en triple noir. Maille et empiècements thermosoudés, semelle Air visible sur toute la longueur." },
          { ref: "NK-TN-BLANC", nom: "Air Max Plus — Blanc", unite: "la paire", prix: 189.99, dispo: true, tailles: "38,5 · 39 · 40 · 40,5 · 41 · 42 · 42,5 · 43 · 44 · 44,5 · 45 · 45,5 · 46 · 47 · 47,5", couleurs: "Blanc", chef: true, image: "/produits/nk-air-max-plus-femme.jpg",
            description: "Le TN en blanc intégral. Maille et empiècements thermosoudés, semelle Air visible sur toute la longueur." },
          { ref: "NK-TN-BLEU", nom: "Air Max Plus — Bleu", unite: "la paire", prix: 189.99, dispo: true, tailles: "38,5 · 39 · 40 · 40,5 · 41 · 42 · 42,5 · 43 · 44 · 44,5 · 45 · 45,5 · 46 · 47 · 47,5", couleurs: "Bleu", chef: true,
            description: "Le TN en dégradé bleu. Maille et empiècements thermosoudés, semelle Air visible sur toute la longueur." },
        ],
      },
    ],
  },
  {
    id: "adidas",
    nom: "ADIDAS",
    emoji: "⚡",
    glyphe: "etoile",
    image: "/produits/marque-adidas.svg",
    type: "produits",
    couleurs: ["#2E5BFF", "#12277A"],
    gammes: [
      {
        id: "collection",
        nom: "Collection",
        etiquette: "",
        sousTitre: "",
        produits: [
          { ref: "AD-SS", nom: "Stan Smith", unite: "la paire", prix: 109.9, dispo: true, tailles: "38 · 39 · 40 · 41 · 42 · 43 · 44", couleurs: "Blanc · Vert · Marine", chef: true, image: "/produits/ad-ss.svg", 
            description: "Cuir lisse, talon coloré. Intemporelle." },
          { ref: "AD-SB", nom: "Samba OG", unite: "la paire", prix: 119.9, dispo: true, tailles: "39 · 40 · 41 · 42 · 43", couleurs: "Noir · Blanc · Beige", image: "/produits/ad-sb.svg", 
            description: "Semelle gomme, bandes en daim." },
          { ref: "AD-GZ", nom: "Gazelle", unite: "la paire", prix: 114.9, dispo: true, tailles: "40 · 41 · 42 · 43 · 44 · 45", couleurs: "Bleu · Bordeaux · Vert", image: "/produits/ad-gz.svg", 
            description: "Daim souple, silhouette fine." },
        ],
      },
    ],
  },
  {
    id: "new-balance",
    nom: "NEW BALANCE",
    emoji: "🏃",
    glyphe: "sac",
    image: "/produits/marque-new-balance.svg",
    type: "produits",
    couleurs: ["#B9B3A4", "#4A4438"],
    gammes: [
      {
        id: "collection",
        nom: "Collection",
        etiquette: "",
        sousTitre: "",
        produits: [
          { ref: "NB-550", nom: "550", unite: "la paire", prix: 139.9, dispo: true, tailles: "39 · 40 · 41 · 42 · 43 · 44", couleurs: "Blanc · Gris · Vert", chef: true, image: "/produits/nb-550.svg", 
            description: "Basket de basket rééditée, cuir perforé." },
          { ref: "NB-327", nom: "327", unite: "la paire", prix: 124.9, dispo: true, tailles: "38 · 39 · 40 · 41 · 42 · 43", couleurs: "Beige · Marine · Orange", image: "/produits/nb-327.svg", 
            description: "Semelle débordante, mélange daim et nylon." },
          { ref: "NB-2002", nom: "2002R", unite: "la paire", prix: 179.9, dispo: true, tailles: "41 · 42 · 43 · 44 · 45", couleurs: "Gris · Noir · Sable", image: "/produits/nb-2002.svg", 
            description: "Amorti ABZORB, maille technique." },
        ],
      },
    ],
  },
];

// Raccourcis pratiques, calculés une fois au démarrage.
export const TOUS_PRODUITS = FAMILLES.flatMap((f) =>
  f.gammes.flatMap((g) => g.produits.map((p) => ({ ...p, famille: f, gamme: g })))
);

export const SELECTION_CHEF = TOUS_PRODUITS.filter((p) => p.chef);
