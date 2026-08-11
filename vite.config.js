import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { BOUTIQUE, COULEURS } from './src/config.js'
import { FAMILLES } from './src/catalogue.js'

// Publie l'identité et le catalogue dans un fichier donnees.json, à côté de la
// boutique. L'éditeur le lit au démarrage, au lieu d'embarquer une copie figée :
// il affiche donc toujours ce qui est réellement en ligne, et le même fichier
// editeur.html fonctionne pour n'importe quelle boutique bâtie sur cette base.
function donneesPourEditeur() {
  return {
    name: 'donnees-pour-editeur',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'donnees.json',
        source: JSON.stringify({ BOUTIQUE, COULEURS, FAMILLES }, null, 2),
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), donneesPourEditeur()],
})
