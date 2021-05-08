#!/usr/bin/env node
'use strict';

// Dépendences
const fetch = require('node-fetch'); // https://www.npmjs.com/package/node-fetch
var term = require('terminal-kit').terminal; // https://www.npmjs.com/package/terminal-kit
const Conf = require('conf'); // https://www.npmjs.com/package/conf
const config = new Conf({ projectSuffix: "cli" }); // Conf

// Accès a la configuration
    // Get
    let language = config.get('language')

    // Mettre un statut par défaut
    if(!language) config.set('language', 'fr')

    // Obtenir le language
    if(language === "fr") var lang = require('./language-fr.json')
    if(language === "en") var lang = require('./language-en.json')
    if(language !== "fr" && language !== "en") var lang = require('./language-fr.json')

// Vérifier si l'API est fonctionnel..
fetch('https://johan-feedback-api.herokuapp.com/feedback', { method: 'GET', follow: 20, size: 500000000})
    .then(res => res.text())
    .catch(err => {
		if(err.message.startsWith("invalid json response body")) console.log(chalk.red(lang.fetch.errENOTFOUND))
		if(!err.message.startsWith("invalid json response body")) console.log(chalk.red(lang.fetch.unkownError.replace(/%ERROR%/g, err.message)))
		process.exit()
	})

// Fonction - Demander le titre de la demande
async function askTitle(){
    term(lang.feedback.requestAsk.title) && term.cyan()
    term.inputField(
        function(error, input){
            if(error) term.red(lang.feedback.error.unkownError.replace(/%ERROR%/g, error)) && process.exit()
            if(input.length < 2) term.red(lang.feedback.error.emptyTitle) && term(lang.feedback.error.emptyTitleInfo) && process.exit()
            if(!error) askDescription(input)
        }
    );
}

// Fonction - Demander la description de la demande
async function askDescription(title){
    term(lang.feedback.requestAsk.description) && term.cyan()
    term.inputField(
        function(error, input){
            if(error) term.red(lang.feedback.error.unkownError.replace(/%ERROR%/g, error)) && process.exit()
            if(input.length < 5 || input.length > 850) term.red(lang.feedback.error.emptyDescription) && term(lang.feedback.error.emptyDescriptionInfo) && process.exit()
            if(!error) askContactMethod(title, input)
        }
    );
}

// Fonction - Demander la méthode de contact
async function askContactMethod(title, description){
    term(lang.feedback.requestAsk.contactMethod) && term.cyan()
    term.inputField(
        function(error, input){
            if(error) term.red(lang.feedback.error.unkownError.replace(/%ERROR%/g, error)) && process.exit()
            if(input.length < 2) term.red(lang.feedback.error.emptyContact) && term(lang.feedback.error.emptyContactInfo) && process.exit()
            if(!error) sendFeedback(title, description, input)
        }
    );
}

// Fonction - Envoyer une requête a l'API
async function sendFeedback(title, description, contactMethod){
    fetch('https://johan-feedback-api.herokuapp.com/feedback', {
        method: 'POST',
        follow: 20,
        size: 500000000,
        body: `
        {
            "title": "${title}",
            "description": "${description}\\n**Méthode de contact :** ${contactMethod}",
            "project": "Rickdetect"
        }`,
        headers: {"Content-Type": "application/json"},
        })      
        .then(res => res.json())
        .then(json => {
            if(json.error === true || json.error === undefined) term.red(lang.feedback.error.unkownError.replace(/%ERROR%/g, json.message)) && process.exit()
            if(json.error === false) term.blue(lang.feedback.requestAsk.received) && process.exit()
        })
        .catch(err => term.red(lang.feedback.error.unkownError.replace(/%ERROR%/g, err)))
}

// Demander le titre (qui va demander la description, puis la méthode de contact, etc)
askTitle()

// Raccourcis clavier
term.grabInput(true);
term.on('key', function(name, matches, data){
  if (name === 'CTRL_Z' || name === 'CTRL_C' || name === 'CTRL_D'){
    process.exit()
  }
})