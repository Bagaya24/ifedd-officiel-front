# IFEDD - Initiative des Femmes Entrepreneurs pour le Développement Durable

Application web officielle pour l'ONG IFEDD, une organisation dédiée au développement durable et à l'aide humanitaire en République Démocratique du Congo.

## 🌟 Fonctionnalités

### Interface Publique
- **Accueil Dynamique** : Présentation de l'organisation, carousel de partenaires, et dernières actualités.
- **Galerie Multimédia** : Visualisation des photos des activités avec effets de survol et modale d'agrandissement.
- **Rapports & Publications** : Accès aux rapports d'activités et documents officiels.
- **Blog / Articles** : Lecture d'articles détaillés avec mise en forme riche.
- **Responsive Design** : Interface parfaitement adaptée aux mobiles, tablettes et ordinateurs.
- **SEO Optimisé** : Balises méta dynamiques pour un meilleur référencement et partage sur les réseaux sociaux.

### Administration & Gestion
- **Authentification Sécurisée** : Système de login/logout pour les administrateurs.
- **Gestion de Contenu (CRUD)** :
  - **Articles** : Création et édition avec éditeur de texte riche (Quill).
  - **Galerie** : Upload et gestion des photos avec légendes.
  - **Rapports** : Publication de documents PDF avec images de couverture.
  - **Partenaires** : Gestion des logos et liens des partenaires.
- **Tableau de Bord** : Interface d'administration unifiée utilisant le composant `DataTable`.

## 🛠 Technologies Utilisées

- **Core** : [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Style** : [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing** : [React Router DOM 7](https://reactrouter.com/)
- **Requêtes HTTP** : [Axios](https://axios-http.com/)
- **UI Components** :
  - `@heroicons/react` (Icônes)
  - `react-slick` & `slick-carousel` (Carousels)
  - `aos` (Animations au défilement)
  - `react-spinners` (Indicateurs de chargement)
- **Éditeur de Texte** : `react-quill-new`, `quill-blot-formatter`

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v18+ recommandé)
- npm ou yarn

### 1. Cloner le projet
```bash
git clone https://github.com/Bagaya24/ifedd-officiel-front/pull/new/version_2
cd front_v2
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

```env
VITE_API_URL=votre_url_api_backend
VITE_CLOUD_URL_FILE=votre_url_serveur_fichiers
```

### 4. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

### 5. Construire pour la production
```bash
npm run build
```

## 📂 Structure du Projet

```
src/
├── api/             # Configuration Axios et services (auth, etc.)
├── components/      # Composants réutilisables (NavBar, Footer, DataTable, Cards...)
├── constants/       # Données statiques et configurations
├── hooks/           # Hooks personnalisés (useFetch, usePageSEO...)
├── pages/           # Pages de l'application (Home, Articles, Admin...)
├── router/          # Configuration des routes
└── index.css        # Styles globaux et Tailwind import
```


## 📄 Licence

[IFEDD] - Tous droits réservés.
