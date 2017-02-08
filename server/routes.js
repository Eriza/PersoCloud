///
///           PersoCloud - routes.js      
///
/// Indique les routes disponibles pour l'API serveur
/// Inspiré de http://expressjs.com/fr/guide/routing.html

var express = require('express')
var router = express.Router()

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
router.get('/analyze/field=:field&period=:period', function(req, res) {
	var dates = req.params.period.split(";"); /* On extrait les dates de la période */
	if(dates == undefined || dates.length != 2) { /* TODO: Tester si dates valides */
		res.status(451).send('Invalid period')
	}
	else {				
		res.json({period: {min:dates[0], max:dates[1]},
				  data: [1,2,3] }) 
	}	  
})

router.get('/analyze/field=:field', function(req, res) {
	res.json({period: {min:'infinite', max:'infinite'},
			  data: [0,1,2,3,4,5] })  
})

router.get('/analyze/field=', function(req, res) {
	res.status(450).send('No field specified')  
})


module.exports = router