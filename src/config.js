// IDENTITÉ DE LA BOUTIQUE
// -----------------------
// Fichier produit par l'atelier : file://

export const BOUTIQUE = {
  nom: "LE PANIER FRAIS",
  bandeau: "MEILLEURE SÉLECTION 2025/26 🏆",
  sousTitre: "primeur en ligne",

  // Logo : un emoji, ou un fichier déposé dans public/ (prioritaire).
  emoji: "🥗",
  logo: "/produits/logo.jpg",

  // Image de fond de la boutique, dans public/. Vide = simple halo coloré.
  fondImage: "",

  // Dépôt GitHub de cette boutique, lu par l'atelier pour publier.
  depot: "lindienmara/le-panier-frais",

  // Numéro qui reçoit les commandes : format international, sans + ni espaces.
  whatsapp: "33766384736",
  accroche: "Bonjour Le Panier Frais, je souhaite commander :",

  // Bloc mis en avant sur l'accueil. Vide = masqué.
  enAvant: "",

  // Ouverture de la boutique, jouée une fois par visite.
  // introVideo vide = titre animé, sans rien à charger.
  introActive: true,
  introTexte: "binevenu dan sla boutique ",
  introVideo: "",
  introDuree: 5,

  // Onglets du bas de la boutique.
  afficherInfos: true,
  afficherLiens: true,
  afficherAvis: true,

  info: [
    { titre: "Horaires", texte: "À compléter" },
    { titre: "Zone de livraison", texte: "À compléter" },
    { titre: "Délai de préparation", texte: "À compléter" },
    { titre: "Moyens de paiement", texte: "À compléter" },
  ],

  liens: [
    { titre: "Notre canal Telegram", url: "" },
    { titre: "Nous écrire sur WhatsApp", url: "" },
    { titre: "Instagram", url: "" },
  ],
};

export const COULEURS = {
  rose: "#FF1B8D",
  violet: "#7B2FF7",
  jaune: "#FFE600",
  vert: "#7CFC00",
  cyan: "#00E5FF",
  halo: "#06231F",
  fond: "#08130A",
  fondCarte: "#12200F",
  bordure: "#2A3A24",
  texte: "#FFFFFF",
  texteDoux: "#A8C09A",
};
