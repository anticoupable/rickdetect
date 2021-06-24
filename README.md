##### [english version of the README](/README-EN.md)

## Rickdetect

Rickdetect est un outil permettant de savoir si un lien est enfaite la vidéo [Never Gonna Give You Up](https://www.youtube.com/watch?v=dQw4w9WgXcQ). Pour cela, Rickdetect analyse le code HTML de la page (mais si les informations comme le titre ne sont pas dans le code HTML, c'est le cas de YouTube Music, cela ne va pas fonctionner.)


## Prérequis

* Un appareil sous Windows, MacOS, Linux ou ChromeOS (Avec Crostini)
* [nodejs et npm](https://nodejs.org) d'installé


## Installation

Assure-toi d'avoir [Node.js et npm](https://nodejs.org) d'installer sur ton appareil puis suis ces étapes dans l'ordre (tu auras peut-être besoin de redémarrer ton terminal / ton appareil après l'installation pour l'utiliser) :

* Télécharger tous les fichiers nécessaires (index.js, package.json, etc)
* Ouvrir un terminal et aller dans le dossier où se trouve les fichiers téléchargé lors de la dernière étape.
* Faire quelques commandes...
```
$ npm i
.......
$ npm link
```


## Utilisation

**Analyser une URL :**
```
$ rickdetect --help

  Cherche si un lien tente de vous rick roll.

  Utilisation
    $ rickdetect

  Options
    --link -l <lien>         URL (Si non fournis, accède a votre presse papier)
    --config -c              Permet d'entrer dans la configuration de Rickdetect
    --version -v             Afficher la version que Rickdetect utilise
```

**Reporter un problème directement via termiinal :**
```
$ rickdetect-feedback

  Titre de votre demande (1/3) : ...
  Description de votre demande (2/3) : ...
  Comment vous contacter (3/3) : ...
```


## Changelog

#### 1.0.0 --> 2.0.0
* Réécriture complète du code (même le README)
* Création d'un CLI avec ligne de commande (Commande : rickdetect)
* Ajout d'un système de configuration (change l'agent utilisateur à chaque requête pour obtenir le code, mettre le code de la page sur [Hastebin](https://hasteb.herokuapp.com))
* Arrêt d'utilisation du module expand-url (permettant de déraccourcir un lien) et utilisation du système de redirection node-fetch
* Ajoute https:// (ou http://) quand il est manquant
* Enlève le premier espace dans un lien (souvent copié sans faire exprès)
* Terminal-kit remplacé par chalk et prompt
* Ajout d'un fichier .npmrc pour ne pas avoir de package-lock.json
* Beaucoup d'autre chose...

#### 2.0.0 --> 2.1.0
* Ajout de la langue EN
* Tout les texte peuvent être modifié via les fichier de language (language-en.json et language-fr.json)
* Option --version (ou -v) pour voir la version utilisés

#### 2.1.0 --> 2.2.0
* Intégration d'un système de feedback intégré (pour signaler des bugs par exemple)

#### 2.2.0 --> 2.3.0
* Recherche de rick roll plus poussé : Même a travers le header de redirection (pour https://therickroll.com/ par exemple)

#### 2.3.0 --> 2.4.0
* Le système de rapport via Hastebin (l'option pour crée des haste contenant le résultat de la recherche) a été amélioré : meilleur affichage, meilleur code


## Utilisé pour la création

* [Meow](https://www.npmjs.com/package/meow) (CLI)
* [Node fetch](https://www.npmjs.com/package/node-fetch) (Récupérer le code d'une page)
* [Clipboardy](https://www.npmjs.com/package/clipboardy) (Accéder au presse-papier)
* [Chalk](https://www.npmjs.com/package/chalk) (Mettre des couleurs dans le terminal)
* [Prompt](https://www.npmjs.com/package/prompt) (Demande de texte pour la configuration)
* [Hastebin.js](https://www.npmjs.com/package/hastebin.js) (Option pour mettre le code d'une page sur Hastebin)
* [conf](https://www.npmjs.com/package/conf) (Enregistrer des données de configuration)
* [terminal-kit](https://www.npmjs.com/package/terminal-kit) (Couleur and demander pour du texte dans le feedback)

* [Hastebin edit](https://hasteb.herokuapp.com)
* API de Feedback privé (la mienne, aucun lien)
* Du temps...


## Exemple

* https://www.youtube.com/watch?v=dQw4w9WgXcQ
* https://youtu.be/xaazUgEKuVA
* https://is.gd/OiqSNs
* http://bit.do/not-rick


## Licence

ISC © [Johan](https://johan-perso.glitch.me)
