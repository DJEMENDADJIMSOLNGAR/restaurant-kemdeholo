#!/bin/bash

# Créer le dossier pour le PDF si n'existe pas
mkdir -p pdf

echo "Compilation du rapport PDF..."

# Combiner tous les fichiers dans l'ordre
cat rapport/preamble.md > pdf/combined.md
echo -e "\n\\clearpage\n" >> pdf/combined.md

# Ajouter les sections dans l'ordre
cat rapport/sections/01_introduction.md >> pdf/combined.md
echo -e "\n\\clearpage\n" >> pdf/combined.md

for file in rapport/sections/0[2-9]*.md; do
    cat "$file" >> pdf/combined.md
    echo -e "\n\\clearpage\n" >> pdf/combined.md
done

# Convertir en PDF avec pandoc
echo "Conversion en PDF..."
pandoc \
    --pdf-engine=xelatex \
    --from markdown \
    --template=default \
    --standalone \
    --highlight-style=tango \
    --number-sections \
    --top-level-division=chapter \
    --toc-depth=3 \
    --listings \
    pdf/combined.md \
    -o pdf/rapport_kemdeholo.pdf

# Nettoyage
rm pdf/combined.md

echo "Rapport PDF généré avec succès : pdf/rapport_kemdeholo.pdf"