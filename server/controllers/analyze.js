var requestJson = require('request-json');
var fs = require('fs');
var hlp_date = require('../helpers/date');

function analyze(req, res, next) {	
	if(req.query.field == undefined) {
		res.status(400).send('No field specified');
        return;
	}
	var field = req.query.field.toLowerCase()
	
	// Création d'un objet représentant la période
    var period = hlp_date.extractPeriod(req.query.period);
    if (period == false) {
        res.status(400).send('Invalid period');
        return;
    }	

	// Groupby
	var group = req.query.group;	
			
	fs.readFile('cozyid.pc', 'utf8', function (err, CozyID) {
		if (err) {
			console.error("Erreur cozyid.pc : " + err);
			res.status(500).send();			
		}
		else if(CozyID == "InsererLeCozyID") {
			console.error("Erreur : Insérer un CozyId, de préférence présent dans le moteur, dans le fichier cozyid.pc");
			res.status(401).send("Erreur : Insérer un CozyId, de préférence présent dans le moteur, dans le fichier cozyid.pc");			
		}
		else {
			// Connexion au moteur
			var clientMoteur = requestJson.createClient("http://localhost:8081/");
			var enginePath = "analyze?cozyid=" + CozyID + "&field=" + field;
			if(period != undefined) {
				enginePath += "&period=" + period.start + ";" + period.end;
			}
			if(group != undefined) {
				enginePath += "&group=" + group;
			}
			clientMoteur.get(enginePath, function(engineErr, engineRes, engineData) {				
				if(engineRes == undefined) {
					res.status(503).send(); // Service Unavailable
				}
				else {
					res.status(engineRes.statusCode).json(engineData);
				}
			});
		}
	});
}

exports.analyze = analyze;