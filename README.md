# Rickdetect

Rickdetect est un outil permettant de savoir si un lien est enfaite la vidéo [Never Gonna Give You Up](https://www.youtube.com/watch?v=dQw4w9WgXcQ). Pour cela, Rickdetect analyse le code HTML de la page (mais si les informations comme le titre ne sont pas dans le code HTML, c'est le cas de YouTube Music, cela ne va pas fonctionner.)


## Prérequis

* Un appareil sous Windows, MacOS, Linux ou ChromeOS (Avec Crostini)
* [nodejs et npm](https://nodejs.org) d'installé


## Installation

Assure-toi d'avoir nodejs et npm d'installer sur ton appareil puis suis cees étapes dans l'ordre (tu auras peut-être besoin de redémarrer ton terminal / ton appareil après l'utilisation pour l'utiliser) :

* Télécharger tous les fichiers nécessaires (index.js, package.json, etc)
* Ouvrir un terminal et aller dans le dossier où se trouve les fichiers téléchargé lors de la dernière étape.
* Faire quelques commandes...
```
$ npm i
.......
$ npm link
```

## Utilisation

```
$ rickdetect --help

  Cherche si un lien tente de vous rick roll.
  
  Utilisation
    $ rickdetect
  
  Options
    --link -l <lien>       URL (Si non fournis, accède a votre presse papier)
    --config -c            Permet d'entrer dans la configuration de Rickdetect
```

## v1 --> v2

* Réécriture complète du code (même le README)
* Création d'un CLI avec commande (Commande : rickdetect)
* Ajout d'un système de configuration (change l'agent utilisateur à chaque requête pour obtenir le code, mettre le code de la page sur [Hastebin](https://hasteb.herokuapp.com))
* Arrêt d'utilisation du module expand-url (permettant de déraccourcir un lien) et utilisation du système de redirection node-fetch
* Ajoute https:// quand il est manquant
* Enlève le premier espace dans un lien (souvent copié sans faire exprès)
* Terminal-kit remplacé par chalk et prompt
* Ajout d'un fichier .npmrc pour ne pas avoir de package-lock.json
* Beaucoup d'autre chose...

