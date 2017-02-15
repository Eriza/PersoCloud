const CONTROLLER_NAME = "analyze"

var http = require('http')
var express = require('express')
var app = express()
var cozydb = require('cozydb')
var requestJson = require('request-json');

function analyze(req, res, next) {
	// Extraction de la période
	var period = null
	if(req.params.period != undefined) {
		var dates = req.params.period.split(";");
		if(dates == undefined || dates.length != 2) { 			
			res.status(400).send('Invalid period')
			return;
		}
		else {
			/* TODO: Tester si dates valides (dates[0] <= dates[1] et format 2015-01-01T00:00:00.000Z */
			period =  {
				startkey: dates[0],
				endkey: dates[1]
			};
		}
	}
	
	var field = req.params.field.toLowerCase()
	try {
		var Model = require('../models/' + field + '.js');
		// TODO: Tester en utilisant les models déjà définis dans les apps
		// Nécéssite d'installer PersoCloud sur le Cozy
		// var Model = require('../../../apps/kyou/server/' + field + '.js');		
	}
	catch(e) {
		console.log(e)
		res.status(404).send('Field not found') 
		return;
	}	
    Model.request('byDate', period, function(err, cozyData) {
        if(err) {
            next(err);
        } else {
			// Récupération des données du moteur
			var clientMoteur = requestJson.createClient("http://localhost:8081/");
			var enginePath = "analyze/getAll?field=" + field;
			if(period != null) {
				enginePath += "&period=" + period.startkey + ";" + period.endkey;
			}
			clientMoteur.get(enginePath, function(engineErr, engineRes, engineData) {				
				res.status(200).json({cozyData: cozyData, engineData: engineData});
			})
        }
    });
}

exports.analyze = analyze;