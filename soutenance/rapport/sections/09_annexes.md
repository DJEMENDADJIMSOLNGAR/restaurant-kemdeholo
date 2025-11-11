# 9. Annexes

## Annexe A : Documentation API

### A.1 Endpoints API

#### A.1.1 Routes Publiques
```plaintext
GET /api/rooms
- Liste des chambres disponibles
- Filtres : dates, type, prix

POST /api/reservations
- Création d'une réservation
- Validation disponibilité

GET /api/blog
- Liste des articles publiés
- Pagination, filtres

POST /api/contact
- Envoi message contact
- Validation anti-spam
```

#### A.1.2 Routes Admin
```plaintext
GET /admin/reservations
- Gestion des réservations
- Filtres status, dates

PUT /admin/rooms/:id
- Mise à jour chambre
- Disponibilité, prix

POST /admin/blog
- Publication articles
- Upload images
```

### A.2 Modèles de Données

#### A.2.1 Schéma ER
```plaintext
User
├── id (PK)
├── email
├── password
├── role
└── timestamps

Room
├── id (PK)
├── number
├── type
├── price
└── status

Reservation
├── id (PK)
├── userId (FK)
├── roomId (FK)
├── checkIn
├── checkOut
└── status

Blog
├── id (PK)
├── title
├── content
├── image
└── status
```

## Annexe B : Commandes Utiles

### B.1 Installation
```bash
# Installation dépendances
npm install

# Configuration environnement
cp .env.example .env

# Migration base de données
npx sequelize-cli db:migrate

# Build assets
npm run build:css
```

### B.2 Développement
```bash
# Lancer serveur dev
npm run dev

# Watch CSS
npm run build:css -- --watch

# Tests
npm run test
```

### B.3 Production
```bash
# Build production
npm run build:prod

# Démarrer PM2
pm2 start ecosystem.config.js

# Logs
pm2 logs kemdeholo-api
```

## Annexe C : Questions Fréquentes

### C.1 Technique

#### C.1.1 Architecture
Q: Pourquoi utiliser PostgreSQL ?
R: Choix basé sur :
- Besoins transactionnels
- Relations complexes
- Performance

#### C.1.2 Sécurité
Q: Protection contre attaques ?
R: Mesures en place :
- Rate limiting
- Validation entrées
- CORS configuré
- JWT tokens

### C.2 Fonctionnel

#### C.2.1 Réservations
Q: Gestion conflits réservations ?
R: Système vérifie :
- Disponibilité en temps réel
- Conflits dates
- État des chambres

#### C.2.2 Performance
Q: Temps chargement optimisé ?
R: Techniques utilisées :
- Cache
- Lazy loading
- Compression assets
- CDN

## Annexe D : Métriques

### D.1 Performance

#### D.1.1 Frontend
```plaintext
Temps chargement :
- Desktop: 1.2s
- Mobile: 1.8s

Lighthouse scores :
- Performance: 92
- Accessibility: 98
- Best Practices: 95
- SEO: 98
```

#### D.1.2 Backend
```plaintext
Temps réponse API :
- GET: ~50ms
- POST: ~120ms
- PUT: ~80ms

Cache hit rate: 85%
```

### D.2 Utilisation

#### D.2.1 Trafic
```plaintext
Visites mensuelles: 5000+
Pages vues: 25000+
Taux rebond: 25%
Durée session: 4:30
```

#### D.2.2 Conversions
```plaintext
Taux réservation: 12%
Taux contact: 8%
Retour utilisateur: 40%
```

## Annexe E : Ressources

### E.1 Documentation
- Guide utilisateur
- Documentation technique
- Guide déploiement
- Procédures maintenance

### E.2 Assets
- Logos
- Images
- Icons
- Fonts

### E.3 Templates
- Emails
- PDF
- Documents légaux
- Rapports