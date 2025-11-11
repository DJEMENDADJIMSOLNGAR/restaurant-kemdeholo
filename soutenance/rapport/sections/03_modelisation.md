# Modélisation du Projet {-}

\\label{sec:modelisation}

## 3.1 Architecture Globale

L'architecture du projet est basée sur une approche moderne et modulaire, utilisant une stack technologique robuste et évolutive.

\begin{figure}[H]
\centering
\includegraphics[width=0.9\textwidth]{../../assets/images/feature-box-bg-2.jpg}
\caption{Architecture globale du système}
\label{fig:architecture-globale}
\end{figure}

## 3.2 Modèle de Données

### 3.2.1 Diagramme de Classes

\begin{table}[h]
\centering
\caption{Principales entités du système}
\label{tab:entites-systeme}
\begin{tabular}{|l|p{10cm}|}
\hline
\textbf{Entité} & \textbf{Description} \\
\hline
Client & Informations sur les clients (nom, prénom, email, téléphone) \\
Chambre & Détails des chambres (numéro, type, prix, statut) \\
Réservation & Gestion des réservations (dates, client, chambre) \\
Service & Services additionnels (restaurant, blanchisserie) \\
Personnel & Informations sur les employés de l'hôtel \\
\hline
\end{tabular}
\end{table}

### 3.2.2 Diagramme Entité-Relation

\begin{figure}[H]
\centering
\includegraphics[width=0.9\textwidth]{../../assets/images/feature-box-bg-3.jpg}
\caption{Diagramme Entité-Relation de la base de données}
\label{fig:diagramme-er}
\end{figure}

## 3.3 Modèles de Processus

### 3.3.1 Processus de Réservation

1. **Recherche de disponibilité**
   - Saisie des dates
   - Vérification des chambres disponibles
   - Affichage des options

2. **Sélection et réservation**
   - Choix de la chambre
   - Ajout des services optionnels
   - Saisie des informations client

3. **Confirmation et paiement**
   - Récapitulatif de la réservation
   - Processus de paiement
   - Confirmation par email

\begin{figure}[H]
\centering
\includegraphics[width=0.8\textwidth]{../../assets/images/event-01.jpg}
\caption{Flux du processus de réservation}
\label{fig:processus-reservation}
\end{figure}

## 3.4 Diagrammes de Séquence

### 3.4.1 Processus de Check-in

\begin{table}[h]
\centering
\caption{Étapes du processus de check-in}
\label{tab:etapes-checkin}
\begin{tabular}{|l|p{10cm}|}
\hline
\textbf{Étape} & \textbf{Description} \\
\hline
Accueil & Réception du client et vérification de la réservation \\
Vérification & Contrôle des documents d'identité \\
Enregistrement & Saisie des informations dans le système \\
Remise des clés & Attribution de la chambre et explication des services \\
\hline
\end{tabular}
\end{table}

## 3.5 Architecture Technique

### 3.5.1 Stack Technologique

- **Frontend** :
  - HTML5, CSS3 (Tailwind)
  - JavaScript (React)
  - PWA pour l'application mobile

- **Backend** :
  - Node.js avec Express
  - Base de données MongoDB
  - API RESTful

- **Infrastructure** :
  - Hébergement cloud
  - CDN pour les assets
  - SSL/TLS pour la sécurité

### 3.5.2 Sécurité et Performance

\begin{figure}[H]
\centering
\includegraphics[width=0.8\textwidth]{../../assets/images/feature-box-bg.jpg}
\caption{Architecture de sécurité et performance}
\label{fig:architecture-securite}
\end{figure}

## 3.6 Interfaces Utilisateur

### 3.6.1 Maquettes des Écrans Principaux

- Page d'accueil
- Système de réservation
- Espace client
- Interface d'administration

\begin{figure}[H]
\centering
\includegraphics[width=0.9\textwidth]{../../assets/images/template-screenshot.png}
\caption{Maquette de la page d'accueil}
\label{fig:maquette-accueil}
\end{figure}

### 3.6.2 Responsive Design

Le site est conçu pour s'adapter à tous les appareils :
- Desktop (>1200px)
- Tablette (768px-1199px)
- Mobile (<767px)

## 3.7 Tests et Qualité

### 3.7.1 Stratégie de Test

\begin{table}[h]
\centering
\caption{Types de tests implémentés}
\label{tab:types-tests}
\begin{tabular}{|l|p{10cm}|}
\hline
\textbf{Type de Test} & \textbf{Description} \\
\hline
Tests unitaires & Vérification des composants individuels \\
Tests d'intégration & Test des interactions entre modules \\
Tests end-to-end & Validation des parcours utilisateurs complets \\
Tests de performance & Évaluation des temps de réponse et de la charge \\
\hline
\end{tabular}
\end{table}