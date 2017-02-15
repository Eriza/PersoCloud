///
///           PersoCloud - routes.js      
///
/// Indique les routes disponibles pour l'API serveur
/// Inspiré de http://expressjs.com/fr/guide/routing.html

var express = require('express')
var router = express.Router()

var ctrl_analyze = require("./controllers/analyze");

// Options de l'utilisateur
router.get('/options/get/:property', function(req, res) {
	res.json({value: 'Valeur de la propriété ' + req.params.property })
	//res.status(404).json({error: 'L\'option n\'existe pas' })
	//res.status(500).json({error: 'Erreur du serveur' })
})

router.post('/options/setAuthorizationToSend', function(req, res) {
	res.status(200).send()
	//res.status(404).json({error: 'L\'option n\'existe pas' })
	//res.status(500).json({error: 'Erreur du serveur' })
})


// Analyse
router.get('/analyze/field=:field&period=:period', function(req, res, next) {
	ctrl_analyze.analyze(req, res, next)	  
})

router.get('/analyze/field=:field', function(req, res, next) {
	ctrl_analyze.analyze(req, res, next)	 
})

router.get('/analyze/field=', function(req, res) {
	res.status(400).send('No field specified')  
})

module.exports = router