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
hyperref: true
hyperrefoptions:
  - colorlinks=true
  - linkcolor=blue
  - filecolor=blue
  - urlcolor=blue
  - linktoc=all
  - bookmarks=true
  - bookmarksopen=true
header-includes:
  - |
    \\usepackage[french]{babel}
    \\usepackage{fancyhdr}
    \\usepackage{caption}
    \\usepackage{float}
    
    \\pagestyle{fancy}
    \\fancyhead[L]{Complexe Hôtelier Kemdeholo}
    \\fancyhead[R]{\\thepage}
    \\fancyfoot[C]{Rapport de Projet - 5 novembre 2025}
    
    \\renewcommand{\\figurename}{Figure}
    \\renewcommand{\\tablename}{Tableau}
    \\renewcommand{\\contentsname}{Table des matières}
    \\renewcommand{\\listfigurename}{Liste des figures}
    \\renewcommand{\\listtablename}{Liste des tableaux}
---

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

\\tableofcontents
\\listoffigures
\\listoftables

\\clearpage