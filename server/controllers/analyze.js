var http = require('http')
var express = require('express')
var app = express()
var cozydb = require('cozydb')
var requestJson = require('request-json');

var hlp_date = require('../helpers/date');

function analyze(req, res, next) {
	// Extraction de la période
    var period = hlp_date.extractPeriod(req.params.period);
    if (period == false) {
        res.status(400).send('Invalid period');
        return;
    }
	
	var field = req.params.field.toLowerCase()
	try {
		var Model = require('../models/' + field + '.js');
		// TODO: Utiliser des models pivots
		// Tester en utilisant les models déjà définis dans les apps
		// Nécéssite d'installer PersoCloud sur le Cozy
		// var Model = require('../../../apps/kyou/server/' + field + '.js');		
	}
	catch(e) {
		console.log(e)
		res.status(404).send('Field not found') 
		return;
	}	
    Model.request('byDate', period, function(err, cozyData) {
		// Conversion au modèle pivots // TODO function externe avec callback
		// TODO Tester si cozyData est bien un tableau
		cozyData.forEach(function(element) {
			if(element.amount != undefined) {
				element.value = element.amount;
			}
		});
		
        if(err) {
            next(err);
        } else {
			// Récupération des données du moteur
			var clientMoteur = requestJson.createClient("http://localhost:8081/");
			var enginePath = "analyze/field=" + field;
			if(period != null) {
				enginePath += "&period=" + period.start + ";" + period.end;
			}
			clientMoteur.get(enginePath, function(engineErr, engineRes, engineData) {				
				res.status(200).json({cozyData: cozyData, engine : engineData});
			})
        }
    });
}

exports.analyze = analyze;