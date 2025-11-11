# 7. Déploiement

## 7.1 Environnement de Production

### 7.1.1 Infrastructure
- Serveur web (Nginx)
- Serveur d'application Node.js
- Base de données PostgreSQL
- Stockage fichiers
- CDN (images, assets)

### 7.1.2 Configuration Serveur
```nginx
# /etc/nginx/sites-available/kemdeholo
server {
    listen 80;
    server_name kemdeholo.com;

    # Frontend statique
    location / {
        root /var/www/kemdeholo/frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # API Backend
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7.1.3 Variables d'Environnement
```plaintext
# .env.production
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_NAME=kemdeholo_prod
DB_USER=kemdeholo_user
DB_PASSWORD=<secret>
JWT_SECRET=<secret>
SMTP_HOST=smtp.gmail.com
SMTP_USER=contact@kemdeholo.com
SMTP_PASS=<secret>
```

## 7.2 Processus de Déploiement

### 7.2.1 Préparation
```bash
# Build frontend
npm run build:css
npm run build:prod

# Préparation backend
npm ci --production
```

### 7.2.2 Base de Données
```sql
-- Création base et utilisateur
CREATE DATABASE kemdeholo_prod;
CREATE USER kemdeholo_user WITH PASSWORD '<secret>';
GRANT ALL PRIVILEGES ON DATABASE kemdeholo_prod TO kemdeholo_user;

-- Migrations
npx sequelize-cli db:migrate
```

### 7.2.3 Scripts de Déploiement
```bash
#!/bin/bash
# deploy.sh

# Pull latest changes
git pull origin main

# Install dependencies
npm ci --production

# Build frontend
npm run build:css
npm run build:prod

# Migrate database
npx sequelize-cli db:migrate

# Restart services
pm2 restart kemdeholo-api
```

## 7.3 Monitoring

### 7.3.1 Logs
```javascript
// config/winston.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 7.3.2 Métriques
- CPU/Mémoire
- Temps de réponse
- Erreurs
- Trafic

### 7.3.3 Alertes
- Erreurs serveur
- Performance dégradée
- Espace disque
- Certificats SSL

## 7.4 Sauvegarde et Restauration

### 7.4.1 Base de Données
```bash
#!/bin/bash
# backup-db.sh

# Backup PostgreSQL
pg_dump kemdeholo_prod > backup_$(date +%Y%m%d).sql

# Compression
gzip backup_$(date +%Y%m%d).sql

# Envoi vers stockage externe
aws s3 cp backup_$(date +%Y%m%d).sql.gz s3://kemdeholo-backups/
```

### 7.4.2 Fichiers
```bash
#!/bin/bash
# backup-files.sh

# Backup fichiers uploadés
tar -czf uploads_$(date +%Y%m%d).tar.gz /var/www/kemdeholo/uploads

# Envoi vers stockage externe
aws s3 cp uploads_$(date +%Y%m%d).tar.gz s3://kemdeholo-backups/
```

## 7.5 Maintenance

### 7.5.1 Mises à Jour
```bash
#!/bin/bash
# update.sh

# Vérification des mises à jour npm
npm outdated

# Installation mises à jour de sécurité
npm audit fix

# Mise à jour système
apt update && apt upgrade -y
```

### 7.5.2 Rollback
```bash
#!/bin/bash
# rollback.sh

# Retour version précédente
git checkout HEAD^

# Restauration base de données
psql kemdeholo_prod < backup_previous.sql

# Redémarrage services
pm2 restart kemdeholo-api
```