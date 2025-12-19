# RetentionAI - Frontend Dashboard

## 📋 Vue d'ensemble

Interface web moderne pour RetentionAI, permettant aux équipes RH de prédire le risque de départ des employés et de générer des plans de rétention personnalisés.

Cette application offre :
- 🔐 Authentification sécurisée (Login/Register)
- 📝 Formulaire de saisie des données employé
- 📊 Visualisation du risque de départ en temps réel
- 💡 Affichage automatique des plans de rétention
- 📱 Interface responsive et moderne

## 🏗️ Architecture

```
RETENTIONAI-FRONTEND/
├── .next/                          # Build Next.js (généré)
├── node_modules/                   # Dépendances npm
├── public/                         # Fichiers statiques
├── app/                            # Routes Next.js (App Router)
│   ├── Login/
│   │   └── page.jsx               # Page de connexion
│   ├── Prediction/
│   │   └── page.jsx               # Page de prédiction
│   ├── SignUp/
│   │   └── page.jsx               # Page d'inscription
│   ├── favicon.ico                # Icône du site
│   ├── globals.css                # Styles globaux
│   ├── layout.js                  # Layout racine
│   └── page.js                    # Page d'accueil (/)
├── .gitignore                     # Fichiers Git ignorés
├── Dockerfile                     # Configuration Docker
├── eslint.config.mjs              # Configuration ESLint
├── jsconfig.json                  # Configuration JavaScript
├── next.config.mjs                # Configuration Next.js
├── package.json                   # Dépendances et scripts
├── package-lock.json              # Lock des dépendances
├── postcss.config.mjs             # Configuration PostCSS
└── README.md                      # Documentation
```

### Structure Détaillée

#### `/app` - Routes et Pages
Utilisation du **App Router** de Next.js 14 :
- `Login/page.jsx` : Authentification utilisateur
- `SignUp/page.jsx` : Création de compte RH
- `Prediction/page.jsx` : Formulaire de prédiction et affichage des résultats
- `layout.js` : Layout global (navigation, footer)
- `page.js` : Page d'accueil/landing
- `globals.css` : Styles CSS globaux avec Tailwind

#### Configuration Files
- `next.config.mjs` : Configuration Next.js (ES modules)
- `jsconfig.json` : Alias de chemins et configuration JS
- `eslint.config.mjs` : Règles de linting
- `postcss.config.mjs` : Configuration pour Tailwind CSS

## 🚀 Technologies

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Client HTTP
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation de schémas
- **Recharts** - Visualisation de données
- **Lucide React** - Icônes modernes
- **JWT Decode** - Décodage tokens JWT

## 📦 Installation

### Prérequis
- Node.js 18+ et npm/yarn
- Backend API en cours d'exécution

### Option 1 : Docker (Recommandé avec docker-compose backend)

L'image frontend est déjà incluse dans le `docker-compose.yml` du backend.

```bash
# Depuis le repository backend
docker-compose up --build
```

Le frontend sera accessible sur `http://localhost:3000`

### Option 2 : Installation locale

1. **Cloner le repository**
```bash
git clone https://github.com/Khaoula1025RetentionAI-Employee-Churn-Prediction-HR-Decision-Support-System-frontend.git
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.local.example .env.local
# Éditer .env.local
```

4. **Lancer en mode développement**
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur `http://localhost:3000`

## 📱 Fonctionnalités

### 1. Authentification

#### Page de Connexion (`/login`)
- Formulaire de connexion avec validation
- Gestion des erreurs
- Stockage sécurisé du token JWT (localStorage)
- Redirection automatique après connexion

#### Page d'Inscription (`/register`)
- Création de compte utilisateur RH
- Validation des champs (username, password)
- Feedback visuel en cas d'erreur
#### Formulaire de Prédiction (`/predict`)
Champs disponibles :
- Informations personnelles (âge)
- Département et rôle
- Revenus mensuels
- Ancienneté
- Satisfaction au travail (1-5)
- Équilibre vie pro/perso (1-5)
- Performance (1-5)
- Distance domicile-travail
- Fréquence des déplacements

#### Affichage des Résultats
- **Jauge visuelle** du risque de départ (0-100%)
- **Niveau de risque** : Low / Medium / High
- **Génération automatique** du plan de rétention si risque > 50%

### 4. Plan de Rétention

Affichage des 3 actions personnalisées :
- ✅ Action 1 : Proposition concrète
- ✅ Action 2 : Mesure d'amélioration
- ✅ Action 3 : Plan de développement

## 📊 Exemple de Flux Utilisateur

1. **Connexion** : L'utilisateur se connecte via `/login`
2. **Redirection** : Redirection automatique vers `/dashboard`
3. **Nouvelle Prédiction** : Clic sur "Nouvelle Prédiction"
4. **Saisie des Données** : Remplissage du formulaire employé
5. **Soumission** : Envoi des données à l'API
6. **Résultat** : Affichage du risque + plan de rétention (si nécessaire)

## 🐳 Docker

### Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app 

COPY package*.json ./

RUN npm install 
COPY . . 

CMD ["npm","run","dev"]

```

### Build et Run
```bash
# Build l'image
docker build -t retentionai-frontend:latest .

# Run le container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://backend:8000 \
  retentionai-frontend:latest
```

## 🚀 Déploiement

### Build de Production
```bash
npm run build
npm run start
```

### Variables d'Environnement Production
```env
NEXT_PUBLIC_API_URL=https://api.retentionai.com
NODE_ENV=production
```
## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 🐛 Debugging

### Mode Développement
```bash
# Afficher les logs détaillés
npm run dev -- --debug
```

### Vérification des Types
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 📄 Licence

Projet pédagogique - Tous droits réservés

## 📞 Support

Pour toute question :
- Ouvrir une issue sur GitHub
- Consulter la documentation Next.js

## 🔗 Liens Utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Interface développée avec ❤️ pour simplifier la gestion RH**