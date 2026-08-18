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

  // Où arrivent les commandes : whatsapp, telegram, signal ou snapchat.
  // « contact » est le numéro ou le pseudo selon l'application choisie.
  messagerie: "whatsapp",
  contact: "33766384736",
  // Conservé pour les boutiques encore sur un ancien moteur.
  whatsapp: "33766384736",
  accroche: "Bonjour Le Panier Frais, je souhaite commander :",

  // Présentation du catalogue : "familles" (on descend) ou "liste" (tout sur
  // une page, avec recherche). Changeable à tout moment.
  presentation: "familles",

  // Forme du cadre réservé aux photos : carre, portrait, paysage ou libre.
  formatPhoto: "carre",
  // true = image entière dans ce cadre, false = recadrée pour le remplir.
  // Chaque produit peut décider autrement, dans son propre champ « cadrage ».
  imageEntiere: false,

  // Bloc mis en avant sur l'accueil. Vide = masqué.
  enAvant: "",

  /* Moyens de paiement ANNONCÉS au client, avant qu'il commande.
     La boutique ne demande jamais de numéro de carte : un site sans serveur ne
     peut pas encaisser une carte sans danger. Un « lien » ouvre la page de ton
     prestataire — PayPal, Lydia — et c'est lui qui encaisse, chez lui. */
  paiements: [

  ],
  paiementNote: "",

  // Envoyer la commande dans une conversation. Mets false pour une boutique
  // qui ne fonctionne qu'au paiement en ligne.
  commandeActive: true,

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

  // Les avis en images : des captures de conversations, montrées telles quelles.
  avis: [

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
