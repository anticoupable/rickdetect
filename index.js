#!/usr/bin/env node
'use strict';

// Dépendences
const meow = require('meow'); // https://www.npmjs.com/package/meow
const fetch = require('node-fetch'); // https://www.npmjs.com/package/node-fetch
const clipboardy = require('clipboardy'); // https://www.npmjs.com/package/clipboardy
const chalk = require('chalk'); // https://www.npmjs.com/package/chalk
const prompt = require('prompt'); // https://www.npmjs.com/package/prompt
const hastebin = require('hastebin.js'); // https://www.npmjs.com/package/hastebin.js
const haste = new hastebin({url: 'https://hasteb.herokuapp.com'}); // Hastebin.js
const Conf = require('conf'); // https://www.npmjs.com/package/conf
const config = new Conf({ projectSuffix: "cli" }); // Conf

// Accès a la configuration
    // Get
    let userAgentSwitcher = config.get('userAgentSwitcher')
    let sendPageCode = config.get('sendPageCode')
    let language = config.get('language')

    // Mettre un statut par défaut
    if(!userAgentSwitcher) config.set('userAgentSwitcher', 'Y')
    if(!sendPageCode) config.set('sendPageCode', 'N')
    if(!language) config.set('language', 'fr')

    // Obtenir le language
    if(language === "fr") var lang = require('./language-fr.json')
    if(language === "en") var lang = require('./language-en.json')
    if(language !== "fr" && language !== "en") var lang = require('./language-fr.json')

// Utilisation de meow pour le CLI
const cli = meow(`

${lang.cliUse.description}

${lang.cliUse.use}
  ${lang.cliUse.command}

${lang.cliUse.option}
  ${lang.cliUse.optionL}
  ${lang.cliUse.optionC}
  ${lang.cliUse.optionV}
`, {
	flags: {
		link: {
			type: 'string',
			alias: 'l'
		},
		config: {
			type: 'boolean',
			alias: 'c'
		},
        version: {
            type: 'boolean',
            alias: 'v'
        }
	},	
    autoVersion: false,
    description: false
});

// Donner la version avec l'option associé
if(cli.flags.version){
	console.log(lang.version.info.replace(/%VERSION%/g, "2.4.0"))
	console.log(lang.version.downloadMajText + chalk.cyan(lang.version.downloadMajLink))
	return process.exit()
}

// Configuration
if(cli.flags.config){
    // Liste des question
    const properties = [
        {
            name: 'userAgentSwitcher',
            validator: /^(?:Y|N)$/,
            message: lang.config.userAgentSwitcher.message,
            warning: lang.config.userAgentSwitcher.warning,
            default: 'Y'
        },
        {
            name: 'sendPageCode',
            validator: /^(?:Y|N)$/,
            message: lang.config.sendPageCode.message,
            warning: lang.config.sendPageCode.warning,
            default: 'N'
        },
        {
            name: 'language',
            validator: /^(?:fr|en)$/,
            message: lang.config.language.message,
            warning: lang.config.language.warning,
            default: 'fr'
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
        config.set('language', result.language);

        console.log(lang.config.userAgentSwitcher.infoText + result.userAgentSwitcher);
        console.log(lang.config.sendPageCode.infoText + result.sendPageCode);
        console.log(lang.config.language.infoText + result.language);
    });

} else {
    mainSearch() // Chercher un rick roll
}

// Fonction principale pour les recherches de rick roll
async function mainSearch(){
        // Obtenir l'user agent a utilisé
        if(userAgentSwitcher === "Y") var userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0000.000 Safari/537.00"
        if(userAgentSwitcher === "N") var userAgent = "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"

        // Trouve l'argument (presse papier / option CLI)
        if(cli.flags.link) var linkA = cli.flags.link
        if(!cli.flags.link) var linkA = clipboardy.readSync()

        // Enleve les espaces et saut de ligne de l'URL
        if(linkA.includes(" ") && linkA.includes("\n")) var linkB = linkA.replace(/ /g, "").replace(/\n/g, "")
        if(linkA.includes(" ") && !linkA.includes("\n")) var linkB = linkA.replace(/ /g, "")
        if(!linkA.includes(" ") && linkA.includes("\n")) var linkB = linkA.replace(/\n/g, "")
        if(!linkA.includes(" ") && !linkA.includes("\n")) var linkB = linkA

        // Ajoute https:// si besoin
        if(!linkB.startsWith("https://") && !linkB.startsWith("http://")) var link = "https://" + linkB
        if(linkB.startsWith("https://") || linkB.startsWith("http://")) var link = linkB

        // Dit si il n'y a pas de domaine
        if(!link.includes(".")) return console.log(chalk.red(lang.fetch.notValidURL.replace(/%LINK%/g, link))) && process.exit()

        // Préparer le nombre de found
        var found = 0

        // Obtenir l'URL (haste)
        if(link){
            var hasteLinkMessage = "\n\n\n====================== URL ======================\n\n\n" + link
        } else {
            var hasteLinkMessage = "\n\n\n====================== URL ======================\n\n\nNo."
        }

        // Obtenir l'header de refresh (haste)
            // Fetch
            var headerRefresh = await fetch(link, { method: 'GET', follow: 20, size: 500000000, headers: { 'User-Agent': userAgent } })
            .then(res => res.headers.get('refresh'))
            .catch(err => {
                // En cas d'erreur
                if(err.code === "ENOTFOUND") return console.log(chalk.red(lang.fetch.errENOTFOUND)) && process.exit()
                console.log(chalk.red(lang.fetch.unkownError.replace(/%ERROR%/g, err.message))) && process.exit()
            })

            // Faire les vérifications + le message
            if(headerRefresh && headerRefresh.includes("dQw4w9WgXcQ")){
                found++
                var hasteRefreshMessage = "\n\n\n================ Header/Redirect ================\n\n\n" + headerRefresh
            } else {
                var hasteRefreshMessage = "\n\n\n================ Header/Redirect ================\n\n\nNo."
            }

        // Obtenir l'header générale (haste)
            // Fetch
            var headerLinkValue = await fetch(link, { method: 'GET', follow: 20, size: 500000000, headers: { 'User-Agent': userAgent } })
            .then(res => res.headers.get('link'))
            .catch(err => {
                // En cas d'erreur
                if(err.code === "ENOTFOUND") return console.log(chalk.red(lang.fetch.errENOTFOUND)) && process.exit()
                console.log(chalk.red(lang.fetch.unkownError.replace(/%ERROR%/g, err.message))) && process.exit()
            })

            // Faire les vérifications + le message
            if(headerLinkValue){
                var hasteLinkValueMessage = "\n\n\n================== Header/Link ==================\n\n\n" + headerLinkValue
            } else {
                var hasteLinkValueMessage = "\n\n\n================== Header/Link ==================\n\n\nNo."
            }

        // Obtenir le code (haste)
            // Fetch
            var code = await fetch(link, { method: 'GET', follow: 20, size: 500000000, headers: { 'User-Agent': userAgent } })
            .then(res => res.text())
            .catch(err => {
                // En cas d'erreur
                if(err.code === "ENOTFOUND") return console.log(chalk.red(lang.fetch.errENOTFOUND)) && process.exit()
                console.log(chalk.red(lang.fetch.unkownError.replace(/%ERROR%/g, err.message))) && process.exit()
            })

            // Faire les vérifications + le message
            if(code.toLowerCase().includes("never","gonna","give","you","up") || code.toLowerCase().includes("rick","roll") || code.toLowerCase().includes("never","gonna","desert","you")){
                found++
                var hasteCodeMessage = "\n\n\n=================== HTML CODE ===================\n\n\n" + code
            } else {
                var hasteCodeMessage = "\n\n\n=================== HTML CODE ===================\n\n\nNo."
            }

        // Dire si ça un rick roll a été trouvé
        if(found !== 0) console.log(chalk.red(lang.publish.found.replace(/%INTENSITY%/g, found)))
        if(found === 0) console.log(chalk.green(lang.publish.notFound.replace(/%INTENSITY%/g, found)))

        // Crée le haste si besoin
        if(sendPageCode === "Y" && found !== 0) haste.post(lang.publish.hasteFound + hasteLinkMessage + hasteRefreshMessage + hasteLinkValueMessage + hasteCodeMessage).then(link => console.log(chalk.blue("\nRapport : ") + chalk.cyan(link.replace(".js",""))) && process.exit())
        if(sendPageCode === "Y" && found === 0) haste.post(lang.publish.hasteNotFound + hasteLinkMessage + hasteRefreshMessage + hasteLinkValueMessage + hasteCodeMessage).then(link => console.log(chalk.blue("\nRapport : ") + chalk.cyan(link.replace(".js",""))) && process.exit())
        if(sendPageCode !== "Y") return process.exit()
}
