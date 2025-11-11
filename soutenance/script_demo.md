# Script de Démonstration

## 1. Prérequis Installation

### 1.1 Base de données
```bash
# Installation PostgreSQL (si non installé)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Création base de données
sudo -u postgres psql
CREATE DATABASE kemdeholo;
CREATE USER kemdeholo_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE kemdeholo TO kemdeholo_user;
\q
```

### 1.2 Node.js et dépendances
```bash
# Installation Node.js (si non installé)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Installation dépendances
cd /chemin/vers/projet
npm install
```

### 1.3 Configuration
```bash
# Copier et configurer .env
cp .env.example .env

# Éditer .env avec les bonnes valeurs
nano .env
```

Contenu minimal `.env` :
```plaintext
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_NAME=kemdeholo
DB_USER=kemdeholo_user
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

## 2. Démarrage Local

### 2.1 Frontend
```bash
# Build CSS
npm run build:css

# Servir frontend (dans un nouveau terminal)
cd frontend
python3 -m http.server 8080
```

### 2.2 Backend
```bash
# Migration base de données
npx sequelize-cli db:migrate

# Démarrer serveur (dans un nouveau terminal)
cd backend
node app.js
```

## 3. Checklist Démonstration

### 3.1 Navigation Site Public
1. Page d'accueil
   - Vérifier le carrousel d'images
   - Tester le menu responsive
   - Vérifier les liens de navigation

2. Page Hébergement
   - Afficher liste des chambres
   - Vérifier les filtres
   - Tester la recherche de disponibilité

3. Page Restaurant
   - Parcourir le menu
   - Vérifier les images
   - Tester le formulaire de réservation

4. Page Contact
   - Remplir formulaire contact
   - Vérifier validation champs
   - Tester envoi message

### 3.2 Interface Administration
1. Connexion Admin
   ```
   Email: admin@kemdeholo.com
   Password: demo123
   ```

2. Gestion Réservations
   - Liste des réservations
   - Filtres par date/status
   - Confirmation réservation

3. Gestion Contenu
   - Ajout article blog
   - Upload image
   - Publication article

4. Tableau de Bord
   - Statistiques réservations
   - Taux occupation
   - Messages récents

## 4. Cas de Tests

### 4.1 Réservation Chambre
1. Recherche disponibilité
   - Dates : 5-7 novembre 2025
   - 2 personnes
   - Chambre standard

2. Processus réservation
   - Sélection chambre
   - Remplir coordonnées
   - Validation réservation

3. Vérification
   - Email confirmation
   - Interface admin
   - Status réservation

### 4.2 Gestion Blog
1. Création article
   - Titre : "Nouveautés Novembre 2025"
   - Upload 2-3 images
   - Contenu avec formatage

2. Publication
   - Preview article
   - Publication
   - Vérification frontend

### 4.3 Support Client
1. Message contact
   - Remplir formulaire
   - Envoi message
   - Vérification réception

2. Réponse admin
   - Interface admin
   - Réponse message
   - Email client

## 5. Points à Souligner

### 5.1 Technique
- Architecture modulaire
- API RESTful
- Sécurité (JWT, validation)
- Performance optimisée

### 5.2 Fonctionnel
- UX fluide
- Responsive design
- Processus automatisés
- Communication client

### 5.3 Business
- Efficacité opérationnelle
- Visibilité améliorée
- Satisfaction client
- ROI potentiel

## 6. Problèmes Connus / Solutions

### 6.1 Performance
- Si lenteur images : vérifier CDN
- Si latence API : vérifier cache
- Si DB lente : vérifier indexes

### 6.2 Données
- Si erreur DB : vérifier migrations
- Si données manquantes : seed data
- Si conflit : vérifier contraintes

## 7. Quick Fixes

### 7.1 Frontend
```bash
# Rebuild CSS
npm run build:css

# Clear cache navigateur
ctrl + F5
```

### 7.2 Backend
```bash
# Restart serveur
ctrl + c
node app.js

# Reset DB (si nécessaire)
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
```