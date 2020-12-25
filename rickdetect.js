// Dépendances
const term = require('terminal-kit').terminal; // https://www.npmjs.com/package/terminal-kit
const fetch = require('node-fetch'); // https://www.npmjs.com/package/node-fetch
var urlExpander = require('expand-url'); // https://www.npmjs.com/package/expand-url


term("Veuillez insérer un lien ici : ") // Demande de texte
term.inputField(function(error, input){

    // Obtenir le lien original si il est raccourci (Ne fonctionne pas dans certains cas (Genre dans les liens Grabify))
    urlExpander.expand(input, function(err, longUrl){
   
        fetch(longUrl) // Envoyer une requête au site
        .then(res => res.text())
        .then(body => {
            // Regarder si le code de la page contient "never gonna give you up", "rick roll" ou "rick astley"
            if(body.toLowerCase().includes("never gonna give you up") || body.toLowerCase().includes("rick roll") || body.toLowerCase().includes("rick astley")){
                term.red("\nIl se peut que votre lien contienne \"Never Gonna Give You Up\".") // Indiquer que le lien est un rick roll
            } else {
                term.green("\nRien de suspect n'a été détecté.") // Indiquer si rien de suspect n'a été détecté
            }
            process.exit() // Arrêter le processus
        })
        .catch(err => {
            // Si une erreur s'est produite, Afficher un message d'erreur et arrêter le processus
            term.red("\nUne erreur s'est produite, Veuillez entrer un lien valide (Il doit commencer par http / https et exister).")
            process.exit()
        })
    });
    }
);


term.grabInput(true);
term.on('key', function(name, matches, data){
  // Si CTRL_Z : Arrêtez le processus
	if (name === 'CTRL_Z'){
		process.exit();
	}
  });