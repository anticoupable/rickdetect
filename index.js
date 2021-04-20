#!/usr/bin/env node
'use strict';

// Dépendences
const meow = require('meow'); // https://www.npmjs.com/package/meow
const fetch = require('node-fetch'); // https://www.npmjs.com/package/node-fetch
const clipboardy = require('clipboardy'); // https://www.npmjs.com/package/clipboardy
const chalk = require('chalk'); // https://www.npmjs.com/package/chalk
const prompt = require('prompt'); // https://www.npmjs.com/package/prompt
const hastebin = require('hastebin.js'); // https://www.npmjs.com/package/hastebin.js
const haste = new hastebin({url: 'https://hasteb.herokuapp.com'});
const Conf = require('conf'); // https://www.npmjs.com/package/conf
const config = new Conf({ projectSuffix: "cli" }); // Conf

// Accès a la configuration
    // Get
    let userAgentSwitcher = config.get('userAgentSwitcher')
    let sendPageCode = config.get('sendPageCode')

    // Mettre un statut par défaut
    if(!userAgentSwitcher) config.set('userAgentSwitcher', 'Y')
    if(!sendPageCode) config.set('sendPageCode', 'N')

// Utilisation de meow pour le CLI
const cli = meow(`
	Utilisation
	  $ rickdetect

	Options
	  --link -l <lien>         URL (Si non fournis, accède a votre presse papier)
   --config -c              Permet d'entrer dans la configuration de Rickdetect
`, {
	flags: {
		link: {
			type: 'string',
			alias: 'l'
		},
		config: {
			type: 'boolean',
			alias: 'c'
		}
	}
});

// Configuration
if(cli.flags.config){
    // Liste des question
    const properties = [
        {
            name: 'userAgentSwitcher',
            validator: /^(?:Y|N)$/,
            message: 'Changer l\'agent utilisateur [Y/N] [Défaut : Y] ',
            warning: 'Veuillez choisir Y (oui) ou N (non).',
            default: 'Y'
        },
        {
            name: 'sendPageCode',
            validator: /^(?:Y|N)$/,
            message: 'Afficher le code de la page [Y/N] [Défaut : N] ',
            warning: 'Veuillez choisir Y (oui) ou N (non).',
            default: 'N'
        }
    ];

    // Demander des réponses
    prompt.start();

    // Obtenir les réponses
    prompt.get(properties, function (err, result) {
        if (err) return console.log(chalk.red(err)) && process.exit()

        // Noter dans la config les réponses
        config.set('userAgentSwitcher', result.userAgentSwitcher);
        config.set('sendPageCode', result.sendPageCode);

        console.log('Changer l\'agent utilisateur : ' + result.userAgentSwitcher);
        console.log('Afficher le code la page : ' + result.sendPageCode);
    });

} else {
// Chercher un rick roll
    // Fonction pour fetch le site (et change l'user agent pour empêcher certains site de croire que c'est un robot)
    async function fetchSite(url){
        // Agent utilisateur
        if(userAgentSwitcher === "Y") var userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0000.000 Safari/537.00"
        if(userAgentSwitcher === "N") var userAgent = "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"

        // Fetch
        var code = await fetch(url, { method: 'GET', follow: 20, size: 500000000, headers: { 'User-Agent': userAgent } })
            .then(res => res.text())
            .catch(err => {
                // En cas d'erreur
                if(err.code === "ENOTFOUND") return console.log(chalk.red("Il est impossible d'accèder a la page : Erreur de réseau ou problème venant du site.")) && process.exit()
                console.log(chalk.red("Une erreur s'est produite : " + err.message)) && process.exit()
            })
        
        // Retourner le code
        return code
    }

    // Trouve l'argument (presse papier / option CLI)
    if(cli.flags.link) var linkA = cli.flags.link
    if(!cli.flags.link) var linkA = clipboardy.readSync()

    // Enleve les espaces et saut de lignede l'URL
    if(linkA.includes(" ") && linkA.includes("\n")) var linkB = linkA.replace(/ /g, "").replace(/\n/g, "")
    if(linkA.includes(" ") && !linkA.includes("\n")) var linkB = linkA.replace(/ /g, "")
    if(!linkA.includes(" ") && linkA.includes("\n")) var linkB = linkA.replace(/\n/g, "")
    if(!linkA.includes(" ") && !linkA.includes("\n")) var linkB = linkA

    // Ajoute https:// si besoin
    if(!linkB.startsWith("https://") && !linkB.startsWith("http://")) var link = "https://" + linkB
    if(linkB.startsWith("https://") || linkB.startsWith("http://")) var link = linkB

    // Dit si il n'y a pas de domaine
    if(!link.includes(".")) return console.log(chalk("\"" + link + "\"") + chalk.red(" n'est pas une adresse valide, il manque une extension de domaine (.com, .fr, etc).")) && process.exit()

    // Regarder si le code de la page contient certains éléments
    fetchSite(link).then(code => {
        if(code.toLowerCase().includes("never","gonna","give","you","up") || code.toLowerCase().includes("rick","roll") || code.toLowerCase().includes("never","gonna","desert","you")){
            console.log(chalk.red("Ce lien est suspect..."))
            if(sendPageCode === "Y"){ haste.post("Rickdetect CLI - https://github.com/johan-perso/rickdetect\n\nRick roll trouvé !\n\n\n" + code, "html").then(link => console.log(link)); }
        } else {
            console.log(chalk.green("Ce lien n'a pas l'air très suspect..."))
            if(sendPageCode === "Y"){ haste.post("Rickdetect CLI - https://github.com/johan-perso/rickdetect\n\nRick roll trouvé !\n\n\n" + code, "html").then(link => console.log(link)); }
        }
    })

}