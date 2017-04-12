var config = {};
//config.cozyid = "InsererLeCozyID"
config.cozyid = "zJOv6i" // TODO: Récupération depuis CouchDB

config.server = {};
config.server.port = 9256;
config.server.path = "/api";
config.server.senddata = "*/10 * * * * *"; // Envoi de données toutes les 10 secondes

config.engine = {};
config.engine.url = "localhost";
config.engine.port = 8081;
config.engine.https = false;

module.exports = config;