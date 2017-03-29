///
///           PersoCloud - routes.js      
///
/// Indique les routes disponibles pour l'API serveur
/// Inspiré de http://expressjs.com/fr/guide/routing.html

var express = require('express');
var router = express.Router();
var fs = require('fs');

var ctrl_analyze = require("./controllers/analyze");
var ctrl_options = require("./controllers/options");

// Récupérer le CozyId
router.get('/cozyid', function (req, res) {
    fs.readFile("cozyid.pc", 'utf8', function (err, data) {
        res.send(data);
    });
});


// Options de l'utilisateur
router.get('/options', function(req, res, next) {
	ctrl_options.get(req, res, next);	
});

router.post('/options', function(req, res, next) {
	ctrl_options.set(req, res, next);	
});


// Analyse
router.get('/analyze', function(req, res, next) {
	ctrl_analyze.analyze(req, res, next);
});

module.exports = router;