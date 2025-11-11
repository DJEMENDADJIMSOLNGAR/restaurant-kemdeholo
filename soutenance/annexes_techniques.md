# Annexes Techniques

## 1. Documentation API

### 1.1 Endpoints Publics

#### Authentification
```plaintext
POST /api/auth/login
- Login utilisateur
- Retourne JWT token

POST /api/auth/register
- Inscription nouvel utilisateur
- Validation email
```

#### Réservations
```plaintext
GET /api/rooms
- Liste chambres disponibles
- Filtres: dates, type, prix
- Pagination

POST /api/reservations
- Création réservation
- Vérification disponibilité
- Email confirmation

GET /api/reservations/:id
- Détails réservation
- Status tracking
```

#### Blog
```plaintext
GET /api/blog
- Liste articles
- Filtres, pagination
- Inclut auteur

GET /api/blog/:id
- Article détaillé
- Commentaires
- Related posts
```

#### Services
```plaintext
GET /api/services
- Liste services disponibles
- Tarifs, conditions

POST /api/services/book
- Réservation service
- Créneaux horaires
```

### 1.2 Endpoints Admin

#### Gestion Chambres
```plaintext
GET /admin/rooms
POST /admin/rooms
PUT /admin/rooms/:id
DELETE /admin/rooms/:id
```

#### Gestion Réservations
```plaintext
GET /admin/reservations
PUT /admin/reservations/:id
DELETE /admin/reservations/:id
```

#### Gestion Blog
```plaintext
GET /admin/blog
POST /admin/blog
PUT /admin/blog/:id
DELETE /admin/blog/:id
```

## 2. Modèles Sequelize

### 2.1 User
```javascript
User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, { sequelize });
```

### 2.2 Room
```javascript
Room.init({
  number: {
    type: DataTypes.STRING,
    unique: true
  },
  type: DataTypes.ENUM('standard', 'deluxe', 'suite'),
  price: DataTypes.DECIMAL,
  capacity: DataTypes.INTEGER,
  status: {
    type: DataTypes.ENUM('available', 'occupied', 'maintenance'),
    defaultValue: 'available'
  }
}, { sequelize });
```

### 2.3 Reservation
```javascript
Reservation.init({
  checkIn: DataTypes.DATE,
  checkOut: DataTypes.DATE,
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending'
  },
  guestCount: DataTypes.INTEGER,
  totalPrice: DataTypes.DECIMAL,
  specialRequests: DataTypes.TEXT
}, { sequelize });
```

### 2.4 Blog
```javascript
Blog.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  content: DataTypes.TEXT,
  image: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft'
  }
}, { sequelize });
```

## 3. Schéma ER

```plaintext
┌──────────┐       ┌──────────────┐
│  Users   │       │ Reservations │
├──────────┤       ├──────────────┤
│ id       │●──────○ userId       │
│ email    │       │ roomId       │○─────┐
│ password │       │ checkIn      │      │
│ role     │       │ checkOut     │      │
└──────────┘       │ status       │      │
                   └──────────────┘      │
                                        │
┌──────────┐       ┌──────────┐        │
│  Blog    │       │  Rooms   │        │
├──────────┤       ├──────────┤        │
│ id       │       │ id       │◄───────┘
│ title    │       │ number   │
│ content  │       │ type     │
│ authorId │○──────● id       │
└──────────┘       └──────────┘
```

## 4. Commandes Utiles

### 4.1 NPM
```bash
# Installation
npm install
npm ci --production

# Développement
npm run dev
npm run build:css -- --watch

# Production
npm run build:prod
npm start
```

### 4.2 Sequelize
```bash
# Générer migration
npx sequelize-cli migration:generate --name add-status-to-users

# Migrer
npx sequelize-cli db:migrate

# Rollback
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all

# Seeder
npx sequelize-cli seed:generate --name demo-users
npx sequelize-cli db:seed:all
```

### 4.3 Git
```bash
# Setup
git clone https://github.com/DJEMENDADJIMSOLNGAR/restaurant-kemdeholo.git
git checkout -b feature/new-feature

# Daily
git pull origin main
git add .
git commit -m "feat: description"
git push origin feature/new-feature
```

## 5. FAQ Technique

### 5.1 Architecture
Q: Pourquoi une architecture monolithique vs microservices ?
R: Pour cette phase initiale, un monolithe offre :
- Développement plus rapide
- Déploiement simplifié
- Maintenance facilitée
- Coûts réduits

### 5.2 Performance
Q: Stratégies d'optimisation ?
R: Plusieurs niveaux :
- Cache Redis pour API
- CDN pour assets
- Lazy loading images
- Compression gzip
- Minification assets

### 5.3 Sécurité
Q: Mesures de sécurité principales ?
R: Mise en place :
- JWT avec refresh tokens
- Rate limiting
- Validation entrées
- CORS configuré
- Headers sécurité

### 5.4 Maintenance
Q: Process de mise à jour ?
R: Procédure standard :
1. Tests en staging
2. Backup données
3. Déploiement graduel
4. Monitoring post-deploy
5. Rollback si nécessaire