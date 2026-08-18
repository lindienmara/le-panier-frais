// IDENTITÉ DE LA BOUTIQUE
// -----------------------
// Fichier produit par l'atelier : atelier — boutique de chaussures

export const BOUTIQUE = {
  nom: "TA BOUTIQUE",
  bandeau: "NOUVELLE COLLECTION EN MAGASIN",
  sousTitre: "chaussures de marque",

  // Logo : un emoji, ou un fichier déposé dans public/ (prioritaire).
  emoji: "👟",
  logo: "",

  // Image de fond de la boutique, dans public/. Vide = simple halo coloré.
  fondImage: "",

  // Dépôt GitHub de cette boutique, lu par l'atelier pour publier.
  depot: "lindienmara/le-panier-frais",

  // Où arrivent les commandes : whatsapp, telegram, signal ou snapchat.
  // « contact » est le numéro ou le pseudo selon l'application choisie.
  messagerie: "whatsapp",
  contact: "",
  // Conservé pour les boutiques encore sur un ancien moteur.
  whatsapp: "",
  accroche: "",

  // Présentation du catalogue : "familles" (on descend) ou "liste" (tout sur
  // une page, avec recherche). Changeable à tout moment.
  presentation: "marques",

  // Forme du cadre réservé aux photos : carre, portrait, paysage ou libre.
  formatPhoto: "portrait",
  // true = image entière dans ce cadre, false = recadrée pour le remplir.
  // Chaque produit peut décider autrement, dans son propre champ « cadrage ».
  imageEntiere: true,

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
  introActive: false,
  introTexte: "",
  introVideo: "",
  introDuree: 3,

  // Onglets du bas de la boutique.
  afficherInfos: true,
  afficherLiens: true,
  afficherAvis: true,

  info: [
    { titre: "Adresse", texte: "À compléter" },
    { titre: "Horaires", texte: "À compléter" },
    { titre: "Essayage", texte: "Toutes les paires s'essaient en magasin" },
    { titre: "Échange", texte: "À compléter" },
  ],

  liens: [
    { titre: "Instagram", url: "" },
  ],

  // Les avis en images : des captures de conversations, montrées telles quelles.
  avis: [

  ],
};

export const COULEURS = {
  rose: "#E23B3B",
  violet: "#7A1420",
  jaune: "#F2C230",
  vert: "#F2C230",
  cyan: "#B9B3A4",
  halo: "#241014",
  fond: "#0D0B0C",
  fondCarte: "#1A1618",
  bordure: "#2E2A2C",
  texte: "#FFFFFF",
  texteDoux: "#A8A0A2",
};
