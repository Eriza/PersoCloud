///
///           PersoCloud - server.js      
///
/// Point d'entrée de l'API serveur de PersoCloud

const PORT = 9250;	
var express = require('express');
var app = express();                              
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var morgan = require('morgan');  // Module permettant d'afficher les logs de connexion dans la console serveur


// Configuration
app.use(express.static(__dirname + '/client')); // set the static files location /client/img will be /img for users
app.use(morgan('dev')) // Remplacer dev par common pour afficher des logs comme pour Apache
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


// Lancement du serveur
var routes = require('./server/routes'); // Chargement des routes de l'API
app.use('/api', routes); // Les routes de l'API sont accessibles depuis http://localhost:9104/apps/persocloud/api/
app.listen(PORT);
console.log("App PersoCloud listening on port " + PORT);