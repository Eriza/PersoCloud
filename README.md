# API serveur
L'API est appelée à partir de http://localhost:9104/apps/persocloud/api/. Chaque méthode renvoie du JSON.

| HTTP | Endpoint   | Champs    | Retour    |
|:----:| ------- | ------- | -------  |
| GET | /options/ |  | Tableau associatif JSON avec nom de l'option et sa valeur<br/>La valeur peut être une simple donnée, un objet, un tableau. |
| POST | /options/ | Tableau associatif JSON avec nom de l'option et sa valeur.<br/>La valeur peut être une simple donnée, un objet, un tableau. | <ul><li>200 : Mise à jour effectuée</li><li>404 : L'option n'existe pas</li><li>500 : Erreur lors de la mise à jour</li></ul>|
| GET  | /analyze/field={field}    | <ul><li>{field} Type du champ demandé<br/>Disponible pour le moment : _Bill_</li></ul> | Retourne :<br/>{cozyData: _tableau d'objet de type {field} présent dans le Cozy_, engine: { _Tableau de données brutes dans le moteur_, meta: _Objet contenant les pré-calculs du moteur_}} |
| GET  | /analyze/field={field}&period={period} | <ul><li>{field} Idem</li><li>{Period} Sélectionner des données entre deux dates.<br/>Exemples de format : <br/>"2017-01-01;2017-12-31"<br/>"2017-01-01T00:00:00.000Z;2017-12-31T23:59:59.000Z"</li></ul> | Retourne :<br/>{cozyData: _tableau d'objet de type {field} présent dans le Cozy_, engine: { _Tableau de données brutes dans le moteur_, meta: _Objet contenant les pré-calculs du moteur_}}  |