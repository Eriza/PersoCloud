///
///           PersoCloud - routes.js      
///
/// Indique les routes disponibles pour l'API serveur
/// Inspiré de http://expressjs.com/fr/guide/routing.html

var express = require('express')
var router = express.Router()

var ctrl_analyze = require("./controllers/analyze");

// Analyse
router.get('/analyze', function(req, res, next) {
	ctrl_analyze.analyze(req, res, next);
})

module.exports = router