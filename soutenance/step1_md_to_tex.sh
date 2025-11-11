#!/bin/bash

# Créer les dossiers nécessaires
mkdir -p pdf/temp

echo "Étape 1: Conversion Markdown vers LaTeX..."

# Convertir en LaTeX
pandoc \
    --from markdown \
    --to latex \
    --standalone \
    --top-level-division=chapter \
    --number-sections \
    rapport/config.yaml \
    rapport/pages_debut.md \
    rapport/sections/01_introduction.md \
    rapport/sections/02_etat_de_l_art.md \
    rapport/sections/03_modelisation.md \
    rapport/sections/03_diagrammes_uml.md \
    -o pdf/temp/rapport.tex

echo "Fichier LaTeX généré : pdf/temp/rapport.tex"