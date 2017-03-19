import { AnalyzeModel } from './analyze.model';

/**
 * Génération aléatoire des données retournées par l'API serveur
 */
export const DONNEES = function() : AnalyzeModel {   
    var max, min, sum = null;
    var values = [];
    var cozyData = [];
    var engineData = [];

    // Génération des données moteur
    var i_max = getRandomInt(1, 400);
    for (var _i = 0; _i < i_max; _i++) {
        var data = generateData();
        engineData.push(data);        

        // Pré-calculs des métadonnées
        values.push(data.value);
        if(data.value > max) {
            max = data.value;
        }
        if(data.value < min) {
            min = data.value;
        }
        sum += data.value;
    }

    // Génération des données cozy
    var i_max = getRandomInt(1, 15);
    for (var _i = 0; _i < i_max; _i++) {
        cozyData.push(generateData());        
    }

    // Formatage des données
    let model = new AnalyzeModel();
    model.cozy = cozyData;
    model.engine = {
        data: engineData, 
        meta: {
            count: engineData.length,
            first: engineData[0].value,
			last: engineData[engineData.length-1].value,
			max: max,
			mean: sum / engineData.length,
			median: median(values),
			min: min,
			stddev: standardDeviation(values),
			sum: sum
        }
    };
    return model;
} 


function generateData() {
    var types = { "Orange" : "phone", "Materiel.net" : "NA", "EDF": "Electricity" };
    var vendor = randomVendor();
    var value = getRandomInt(1, 130);
    var data = {
        time: timestampToDate(getRandomInt(1477954800, 1489935748)),
        type: types[vendor],
        value: value,
        vendor: vendor
    }
    return data;
}

function median(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}


function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

function randomVendor() {
    switch (getRandomInt(0, 2)) {
        case 0: return "Orange";
        case 1: return "Materiel.net";
        default: return "EDF";
    }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function timestampToDate(timestamp) {
  var date = new Date(timestamp*1000);
  return date.toISOString();
}