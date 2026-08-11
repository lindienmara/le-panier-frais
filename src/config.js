// IDENTITÉ DE LA BOUTIQUE 2
// -------------------------
// Boutique de primeur, navigation à trois niveaux :
// familles de produits → gammes → fiche produit.

export const BOUTIQUE = {
  nom: "LE PANIER FRAIS",
  bandeau: "MEILLEURE SÉLECTION 2025/26 🏆",
  sousTitre: "primeur en ligne",

  // Logo affiché en haut. Deux possibilités :
  //   emoji  : un emoji, rien à installer — laisse logo vide
  //   logo   : un fichier déposé dans public/, ex. "/logo.jpg" (prioritaire)
  emoji: "🥗",
  logo: "",

  // Numéro qui reçoit les commandes : format international, sans + ni espaces.
  // Le même que la boutique Mapuche Arts : les commandes des deux boutiques
  // arrivent sur le même WhatsApp. C'est l'accroche ci-dessous qui permet de
  // savoir de quelle boutique vient la commande.
  whatsapp: "33766384736",
  accroche: "Bonjour Le Panier Frais, je souhaite commander :",

  // Onglet INFO — à compléter avec les vraies informations.
  info: [
    { titre: "Horaires", texte: "À compléter" },
    { titre: "Zone de livraison", texte: "À compléter" },
    { titre: "Délai de préparation", texte: "À compléter" },
    { titre: "Moyens de paiement", texte: "À compléter" },
  ],

  // Onglet LIENS — mets tes vraies adresses, ou laisse vide pour masquer.
  liens: [
    { titre: "Notre canal Telegram", url: "" },
    { titre: "Nous écrire sur WhatsApp", url: "" },
    { titre: "Instagram", url: "" },
  ],
};

// Palette flashy : rose magenta, violet, vert acide, sur fond vert-noir.
export const COULEURS = {
  fond: "#08130A",
  fondCarte: "#12200F",
  bordure: "#2A3A24",
  texte: "#FFFFFF",
  texteDoux: "#A8C09A",
  rose: "#FF1B8D",
  violet: "#7B2FF7",
  vert: "#7CFC00",
  jaune: "#FFE600",
  cyan: "#00E5FF",
};
