// VERSION DU MOTEUR
// -----------------
// Ce fichier ne contient rien de propre à la boutique : il dit seulement quelle
// version du moteur elle fait tourner. La boutique le publie dans donnees.json,
// et l'atelier compare cette version à la sienne pour savoir si une mise à jour
// existe.
//
// Ne pas modifier à la main. La version est celle du logiciel qui a créé ou mis
// à jour cette boutique.

export const MOTEUR = {
  modele: "vitrine-3-niveaux",
  version: "3.0",
  // Ce que sait faire cette version, pour information.
  capacites: [
    "familles > gammes > produits",
    "panier et commande WhatsApp",
    "plusieurs photos par produit avec visionneuse",
    "video par produit",
    "famille galerie de videos",
    "ouverture animee au demarrage",
    "image de fond et espaces transparents",
  ],
};
