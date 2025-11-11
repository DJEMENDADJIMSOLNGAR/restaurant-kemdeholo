# 4. Architecture et Conception

## 4.1 Architecture Générale

### 4.1.1 Vue d'Ensemble
L'application suit une architecture client-serveur moderne avec une séparation claire entre le frontend et le backend :

```
+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|    Frontend    |<--->|    Backend     |<--->|   Database    |
|    (Static)    |     |   (Express)    |     |  (PostgreSQL) |
|                |     |                |     |                |
+----------------+     +----------------+     +----------------+
```

### 4.1.2 Composants Principaux
- **Frontend Statique** : HTML, CSS (Tailwind), JavaScript
- **Backend API** : Node.js avec Express
- **Base de données** : PostgreSQL avec Sequelize ORM
- **Services** : Email (Nodemailer), Upload (Multer)

## 4.2 Modèles de Données

### 4.2.1 Schéma de la Base de Données
Les principaux modèles Sequelize incluent :

```javascript
// Exemple du modèle Testimonial
const Testimonial = sequelize.define('Testimonial', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quote: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: DataTypes.STRING,
  rating: DataTypes.INTEGER,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
}, { timestamps: true });
```

### 4.2.2 Relations entre Modèles
Les modèles sont liés par des relations Sequelize :

```plaintext
User
 ├── Orders
 ├── Reservations
 └── Comments

Blog
 ├── Comments
 └── Categories

Service
 ├── Reservations
 └── Orders
```

## 4.3 Architecture API

### 4.3.1 Routes API
L'API suit une structure RESTful avec les préfixes suivants :
- `/api/*` : Routes publiques
- `/admin/*` : Routes administratives (protégées)

### 4.3.2 Middleware
Principaux middleware utilisés :
- Authentification JWT
- Validation des requêtes
- Gestion des uploads
- CORS
- Logging

### 4.3.3 Documentation API
API documentée avec Swagger/OpenAPI :
```javascript
// Exemple de documentation Swagger
/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: Récupère les témoignages approuvés
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: Liste des témoignages
 */
```

## 4.4 Sécurité

### 4.4.1 Authentification
- JWT pour l'API
- Sessions pour l'admin
- Bcrypt pour le hachage

### 4.4.2 Autorisations
- RBAC (Role-Based Access Control)
- Middleware de vérification
- Validation des données

### 4.4.3 Protection des Données
- Validation des entrées
- Sanitization
- Rate limiting
- CORS configuré

## 4.5 Frontend

### 4.5.1 Structure des Pages
```plaintext
frontend/
├── index.html        # Accueil
├── restaurant.html   # Restaurant
├── hebergement.html  # Hébergement
├── blanchisserie.html# Blanchisserie
├── contact.html      # Contact
├── blog.html         # Blog
└── admin/
    └── admin.html    # Interface admin
```

### 4.5.2 Assets et Resources
```plaintext
assets/
├── css/
│   └── style.css    # CSS compilé
├── js/
│   └── main.js      # JavaScript principal
└── images/          # Images optimisées
```

### 4.5.3 Responsive Design
- Utilisation de Tailwind CSS
- Approche mobile-first
- Points de rupture adaptés

## 4.6 Déploiement

### 4.6.1 Architecture de Déploiement
```plaintext
Production
├── Frontend (Static hosting)
├── Backend (Node.js server)
└── Database (PostgreSQL)
```

### 4.6.2 Environnements
- Développement
- Staging
- Production

### 4.6.3 Configuration
Variables d'environnement essentielles :
```plaintext
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_NAME=kemdeholo
DB_USER=admin
SMTP_HOST=smtp.example.com
JWT_SECRET=secret
```