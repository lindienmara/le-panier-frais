// CATALOGUE — TROIS NIVEAUX
// -------------------------
// FAMILLE (Salades)  →  GAMME (Feuilles tendres)  →  PRODUIT (Batavia)
//
// Les prix sont des exemples : remplace-les par les tiens.
// chef: true met le produit dans la « Sélection du chef » de l'accueil.
//
// Champs facultatifs :
//   image  sur une famille  → "/familles/salades.jpg", remplace la bannière dessinée
//   image  sur un produit   → "/produits/batavia.jpg", remplace le visuel dessiné
//   video  sur un produit   → "/videos/batavia.mp4", fait apparaître un bouton
//                             « VOIR LA VIDÉO » sur la fiche produit
// Les fichiers vont dans public/familles, public/produits et public/videos.

export const FAMILLES = [
  {
    id: "salades",
    nom: "SALADES",
    emoji: "🥬",
    glyphe: "salade",
    couleurs: ["#7CFC00", "#00A86B"],
    gammes: [
      {
        id: "feuilles",
        nom: "FEUILLES TENDRES",
        etiquette: "FR",
        sousTitre: "Récolte du matin",
        produits: [
          { ref: "SAL-BAT", nom: "Batavia", unite: "la pièce", prix: 1.6, dispo: true, chef: true,
            description: "Feuilles croquantes et légèrement ondulées, goût doux. La salade à tout faire." },
          { ref: "SAL-CHE", nom: "Feuille de chêne", unite: "la pièce", prix: 1.8, dispo: true,
            description: "Feuilles découpées, très tendres, saveur douce. Belle dans une assiette." },
          { ref: "SAL-ROQ", nom: "Roquette", unite: "le sachet de 125 g", prix: 2.4, dispo: true, chef: true,
            description: "Goût poivré marqué. Parfaite sur une pizza sortie du four ou avec du parmesan." },
          { ref: "SAL-MAC", nom: "Mâche", unite: "le sachet de 150 g", prix: 2.9, dispo: false,
            description: "Petites rosettes tendres, goût doux de noisette." },
        ],
      },
      {
        id: "croquantes",
        nom: "CROQUANTES",
        etiquette: "FR",
        sousTitre: "Pour les salades composées",
        produits: [
          { ref: "SAL-SUC", nom: "Sucrine", unite: "la pièce", prix: 1.5, dispo: true,
            description: "Petite, dense et sucrée. Se mange aussi en feuilles, à la main." },
          { ref: "SAL-ROM", nom: "Romaine", unite: "la pièce", prix: 1.9, dispo: true,
            description: "Feuilles allongées et très croquantes. L'incontournable de la César." },
          { ref: "SAL-ICE", nom: "Iceberg", unite: "la pièce", prix: 1.7, dispo: true,
            description: "Très croquante et désaltérante, elle tient bien en burger." },
        ],
      },
    ],
  },
  {
    id: "tomates",
    nom: "TOMATES",
    emoji: "🍅",
    glyphe: "tomate",
    couleurs: ["#FF1B4B", "#FF7A00"],
    gammes: [
      {
        id: "anciennes",
        nom: "VARIÉTÉS ANCIENNES",
        etiquette: "FR",
        sousTitre: "De saison, pleine terre",
        produits: [
          { ref: "TOM-COE", nom: "Cœur de Bœuf", unite: "le kilo", prix: 4.9, dispo: true, chef: true,
            description: "Grosse tomate charnue, très peu de pépins. La reine de la tomate mozzarella." },
          { ref: "TOM-CRI", nom: "Noire de Crimée", unite: "le kilo", prix: 5.4, dispo: true,
            description: "Chair sombre et fondante, goût sucré et profond." },
          { ref: "TOM-ZEB", nom: "Green Zebra", unite: "le kilo", prix: 5.2, dispo: false,
            description: "Verte striée, légèrement acidulée. Elle surprend toujours." },
        ],
      },
      {
        id: "apero",
        nom: "APÉRO & GRAPPE",
        etiquette: "FR",
        sousTitre: "À croquer",
        produits: [
          { ref: "TOM-CER", nom: "Cerise rouge", unite: "la barquette de 250 g", prix: 2.6, dispo: true, chef: true,
            description: "Petites, fermes et sucrées. Elles ne passent jamais l'apéritif." },
          { ref: "TOM-CEJ", nom: "Cerise jaune", unite: "la barquette de 250 g", prix: 2.9, dispo: true,
            description: "Plus douce que la rouge, moins acide. Jolie en mélange." },
          { ref: "TOM-COC", nom: "Cocktail en grappe", unite: "le kilo", prix: 3.8, dispo: true,
            description: "Calibre intermédiaire, vendue en grappe. Bon équilibre sucre-acidité." },
        ],
      },
    ],
  },
  {
    id: "pommes-de-terre",
    nom: "POMMES DE TERRE",
    emoji: "🥔",
    glyphe: "patate",
    couleurs: ["#FFB300", "#8D5A2B"],
    gammes: [
      {
        id: "chair-ferme",
        nom: "À CHAIR FERME",
        etiquette: "FR",
        sousTitre: "Vapeur, sautées, salades",
        produits: [
          { ref: "PDT-CHA", nom: "Charlotte", unite: "le kilo", prix: 2.4, dispo: true, chef: true,
            description: "Chair ferme qui tient parfaitement à la cuisson. Vapeur ou rissolée." },
          { ref: "PDT-AMA", nom: "Amandine", unite: "le kilo", prix: 2.6, dispo: true,
            description: "Peau fine, chair ferme et fondante. Excellente à la vapeur." },
          { ref: "PDT-RAT", nom: "Ratte", unite: "le kilo", prix: 4.2, dispo: true,
            description: "Petite et allongée, goût de noisette. La plus fine du panier." },
        ],
      },
      {
        id: "farineuses",
        nom: "FRITES & PURÉE",
        etiquette: "FR",
        sousTitre: "Chair farineuse",
        produits: [
          { ref: "PDT-BIN", nom: "Bintje", unite: "le sac de 2,5 kg", prix: 4.5, dispo: true,
            description: "La référence pour les frites et la purée. Chair farineuse et fondante." },
          { ref: "PDT-AGR", nom: "Agria", unite: "le sac de 2,5 kg", prix: 4.9, dispo: false,
            description: "Polyvalente, très bonne au four et en gratin." },
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
