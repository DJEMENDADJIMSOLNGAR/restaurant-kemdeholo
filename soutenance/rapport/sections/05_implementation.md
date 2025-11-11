# 5. Implémentation

## 5.1 Backend

### 5.1.1 Configuration du Serveur
```javascript
// app.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware essentiels
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation API
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Kemdeholo',
      version: '1.0.0',
      description: 'API du complexe hôtelier Kemdeholo'
    },
    servers: [{
      url: 'http://localhost:3000'
    }]
  },
  apis: ['./backend/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
```

### 5.1.2 Modèles de Données
Exemple de modèle Sequelize avec relations :

```javascript
// models/reservation.js
module.exports = (sequelize) => {
  const Reservation = sequelize.define('Reservation', {
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending'
    },
    guestCount: DataTypes.INTEGER,
    specialRequests: DataTypes.TEXT
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User);
    Reservation.belongsTo(models.Room);
  };

  return Reservation;
};
```

### 5.1.3 Contrôleurs
Structure type d'un contrôleur :

```javascript
// controllers/blogController.js
const { Blog, Comment } = require('../models');

exports.listArticlesPublic = async (req, res) => {
  try {
    const articles = await Blog.findAll({
      where: { status: 'published' },
      include: [{ 
        model: Comment,
        where: { status: 'approved' },
        required: false
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 5.1.4 Middleware d'Authentification
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const checkAdminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
};
```

## 5.2 Frontend

### 5.2.1 Structure HTML
Exemple de structure de page :

```html
<!-- frontend/hebergement.html -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hébergement - Kemdeholo</title>
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <!-- Include header -->
    <include src="_header.html"></include>

    <main class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-8">Nos Chambres</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Chambres générées dynamiquement -->
        </div>
    </main>

    <!-- Include footer -->
    <include src="_footer.html"></include>

    <script src="js/main.js"></script>
</body>
</html>
```

### 5.2.2 Styles CSS (Tailwind)
Configuration Tailwind :

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./frontend/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a365d',
        secondary: '#718096',
      },
      fontFamily: {
        sans: ['Heebo', 'sans-serif'],
        display: ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

### 5.2.3 JavaScript Frontend
Exemple de gestionnaire de réservation :

```javascript
// frontend/js/reservation.js
class ReservationManager {
  constructor() {
    this.form = document.querySelector('#reservation-form');
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(this.form);
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) throw new Error('Erreur de réservation');

      // Afficher confirmation
      this.showConfirmation();
    } catch (error) {
      this.showError(error);
    }
  }
}
```

### 5.2.4 Internationalisation
```javascript
// translations.js
const translations = {
  fr: {
    welcome: "Bienvenue au Complexe Hôtelier Kemdeholo",
    booking: "Réserver maintenant",
    // ...
  },
  en: {
    welcome: "Welcome to Kemdeholo Hotel Complex",
    booking: "Book now",
    // ...
  }
};

function translate(key, lang = 'fr') {
  return translations[lang][key] || key;
}
```

## 5.3 Tests

### 5.3.1 Tests API
```javascript
// tests/api/testimonials.test.js
describe('Testimonials API', () => {
  it('should list approved testimonials', async () => {
    const response = await request(app)
      .get('/api/testimonials')
      .expect(200);
    
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('status', 'approved');
  });
});
```

### 5.3.2 Tests Frontend
```javascript
// tests/frontend/reservation.test.js
describe('Reservation Form', () => {
  it('should validate dates', () => {
    const form = new ReservationManager();
    const result = form.validateDates('2025-11-05', '2025-11-07');
    expect(result).toBe(true);
  });
});
```

## 5.4 Optimisations

### 5.4.1 Performance Backend
```javascript
// middleware/cache.js
const cache = require('memory-cache');

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      res.send(cachedResponse);
      return;
    }

    res.sendResponse = res.send;
    res.send = (body) => {
      cache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  };
};
```

### 5.4.2 Performance Frontend
```javascript
// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});
```