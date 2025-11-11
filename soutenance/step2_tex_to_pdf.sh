#!/bin/bash

# Créer le dossier de sortie s'il n'existe pas
mkdir -p pdf/output

# Se déplacer dans le dossier contenant le fichier tex
cd pdf/temp

# Première passe de pdflatex pour générer les références
pdflatex -interaction=nonstopmode rapport.tex

# Deuxième passe pour résoudre toutes les références
pdflatex -interaction=nonstopmode rapport.tex

# Déplacer le PDF généré vers le dossier de sortie
mv rapport.pdf ../output/

echo "PDF généré avec succès dans le dossier pdf/output/"