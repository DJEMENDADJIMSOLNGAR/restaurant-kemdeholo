#!/bin/bash

# Créer le dossier pour le PDF si n'existe pas
mkdir -p pdf

echo "Compilation du rapport PDF..."

# Créer un fichier temporaire pour la configuration LaTeX
cat > pdf/config.yaml << EOL
---
documentclass: report
classoption: french
geometry: 
  - top=2.5cm
  - bottom=2.5cm
  - left=2.5cm
  - right=2.5cm
mainfont: DejaVu Sans
monofont: DejaVu Sans Mono
fontsize: 12pt
papersize: a4
lang: fr-FR
numbersections: true
toc: true
lof: true
lot: true
tables: true
figures: true
graphics: true
header-includes:
  - |
    \\usepackage[french]{babel}
    \\usepackage{fancyhdr}
    \\usepackage{caption}
    \\usepackage{float}
    \\usepackage{bookmark}
    \\usepackage{cleveref}
    \\usepackage[hidelinks,unicode,breaklinks=true,bookmarks=true,bookmarksopen=true,bookmarksopenlevel=3,linktoc=all]{hyperref}
    \\usepackage{nameref}
    
    \\pagestyle{fancy}
    \\fancyhead[L]{Complexe Hôtelier Kemdeholo}
    \\fancyhead[R]{\\thepage}
    \\fancyfoot[C]{Rapport de Projet - 5 novembre 2025}
    
    \\hypersetup{
      colorlinks=true,
      linkcolor=blue,
      filecolor=blue,
      urlcolor=blue,
      citecolor=blue,
      pdftitle={Rapport de Projet - Complexe Hôtelier Kemdeholo},
      pdfauthor={DJEMENDADJIMSOLNGAR},
      pdfsubject={Rapport de projet de fin d'études},
      pdfkeywords={hôtellerie, développement web, gestion hôtelière}
    }
    
    \\renewcommand{\\figurename}{Figure}
    \\renewcommand{\\tablename}{Tableau}
    \\renewcommand{\\contentsname}{Table des matières}
    \\renewcommand{\\listfigurename}{Liste des figures}
    \\renewcommand{\\listtablename}{Liste des tableaux}
    
    % Amélioration des références croisées
    \\crefformat{chapter}{Chapitre~#2#1#3}
    \\crefformat{section}{Section~#2#1#3}
    \\crefformat{subsection}{Section~#2#1#3}
    \\crefformat{figure}{Figure~#2#1#3}
    \\crefformat{table}{Tableau~#2#1#3}
---
EOL

# Ajouter la page de titre
cat > pdf/title.md << EOL
\\begin{titlepage}
\\centering
\\vspace*{2cm}
{\\huge\\bfseries Conception et Développement d'un Site Web\\\\pour le Complexe Hôtelier Kemdeholo\\par}
\\vspace{2cm}
{\\Large\\itshape Amélioration de la visibilité et de l'expérience client\\par}
\\vspace{4cm}
{\\Large\\bfseries DJEMENDADJIMSOLNGAR\\par}
\\vfill
{\\large 5 novembre 2025\\par}
\\end{titlepage}

\\clearpage
\\tableofcontents
\\clearpage
\\addcontentsline{toc}{chapter}{Liste des figures}
\\listoffigures
\\clearpage
\\addcontentsline{toc}{chapter}{Liste des tableaux}
\\listoftables
\\clearpage
EOL

# Combiner tous les fichiers dans l'ordre
cat rapport/pages_debut.md > pdf/title.md
echo -e "\n\\newpage\n" >> pdf/title.md

# Ajouter les sections dans l'ordre
cat rapport/sections/01_introduction.md >> pdf/title.md
echo -e "\n\\newpage\n" >> pdf/title.md

for file in rapport/sections/0[2-9]*.md; do
    cat "$file" >> pdf/title.md
    echo -e "\n\\newpage\n" >> pdf/title.md
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
    pdf/config.yaml \
    pdf/title.md \
    -o pdf/rapport_kemdeholo.pdf

# Nettoyage
rm pdf/config.yaml pdf/title.md

echo "Rapport PDF généré avec succès : pdf/rapport_kemdeholo.pdf"