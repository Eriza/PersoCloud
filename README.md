# Utilisation
* Les sources de la partie cliente sont dans {+ client/src/ +}. Les fichiers compilés sont lus par Cozy et sont dans le répertoire {+ client/dist/ +}.
* La partie cliente peut être compilée de deux façons : en mode développement ou production. Dans le second cas, les fichiers générés sont plus légers.

## Commandes
#### Utilisation du serveur
Dans {+ app-cozy/ +} :
* `npm install` : Installe les modules utilisés par l'API serveur et la partie cliente.
* `npm start` : Démarre l'API serveur.

#### Utilisation du client
Dans {+ app-cozy/client/ +} :
<table>
<thead>
<tr>
<th></th>
<th colspan="2">Mode développement</th>
<th>Mode production</th>
</tr>
<tr>
<th></th>
<th>Avec le dummy service</th>
<th>Avec le service moteur</th>
<th>Avec le service moteur</th>
</tr>
</thead>
<tbody>
<tr>
<td>Compilation automatique à chaque modification des fichiers sources</td>
<td><code>npm run watch<br>npm run watch:dev</code></td>
<td><code>npm run watch:dev_api</code></td>
<td><code>npm run watch:prod</code></td>
</tr>
<tr>
<td>Juste la compilation des fichiers sources</td>
<td><code>npm run build<br>npm run build:dev</code></td>
<td><code>npm run build:dev_api</code></td>
<td><code>npm run build:prod</code></td>
</tr>
</tbody>
</table>

# API serveur
L'API est appelée à partir de http://localhost:9104/apps/persocloud/api/. Chaque méthode renvoie du JSON.

<table>
<thead>
<tr>
<th style="text-align:center">HTTP</th>
<th>Endpoint</th>
<th>Champs</th>
<th>Retour</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">GET</td>
<td>/options</td>
<td></td>
<td><a href="https://gitlab.irisa.fr/pcloud/app-cozy/blob/master/server/models/pc_options.js">Objet JSON</a> contenant les clés et valeurs des options</td>
</tr>
<tr>
<td style="text-align:center">POST</td>
<td>/options</td>
<td><a href="https://gitlab.irisa.fr/pcloud/app-cozy/blob/master/server/models/pc_options.js">Objet JSON</a> contenant les clés et valeurs des options</td>
<td><ul><li>200 : Mise à jour effectuée</li><li>404 : L'option n'existe pas</li><li>500 : Erreur lors de la mise à jour</li></ul></td>
</tr>
<tr>
<td style="text-align:center">POST</td>
<td>/senddata</td>
<td></td>
</td>
<td><ul><li>200 : Données ajoutées avec succès</li>
<li>500 : Erreur du moteur</li>
</ul></td>
</tr>
<tr>
<td style="text-align:center">GET</td>
<td><i>Paramètres à faire passer dans le corps de la requête pour la prochaine version du moteur</i><br><br>/analyze?{+cozyid={cozyid}+}&amp;
{-field={field}-}
{+[&amp;metakey={metakey}]+}
{-[&amp;period={period}]-}
{+[&amp;group={by1[,by2][;value]}]+}</td>
<td><ul>
<li>{+{cozyid}+} Identifiant du cozy de l'utilisateur</li>
<li>{-{field}-} Type du champ demandé</li>
<li><i>Facultatif :</i> {+{metakey}+}<br>Indique quelle clé utiliser dans la base de données pour les calculs des métadonnées ou lors d'un "group". Par défaut : <code>value</code>.</li>
<li><i>Facultatif :</i> {-{period}-}<br>Sélectionner des données entre deux dates : <code>date1;date2</code>.<br>Exemples de format : <br>"2017-01-01;2017-12-31"<br>"2017-01-01T00:00:00.000Z;2017-12-31T23:59:59.000Z"</li>
<li><i>Facultatif :</i> {+{group}+}<br>Regrouper les résultats : <code>champ(s) du GROUP BY[;champ sur lequel les agrégats s'appliquent (value par défaut)]</code>.<br>Exemples :<br>
<code>time(5d)</code> : Regrouper sur 5 jours<br>
<code>vendor</code> : Regrouper par vendeur<br>
<code>vendor,time(30d)</code> : Regrouper par vendeur puis par période de 30 jours<br>
<code>vendor;amount</code> : Regrouper par vendeur en appliquant les agrégats sur la valeur "amount". On peut également utilisée {+{metakey}+}.<br>
<code>vendor,time(1w);amount</code> : Regrouper par vendeur puis par période d'une semaine en appliquant les agrégats sur la valeur "amount"<br>
</li>
</ul></td>
<td>Retourne :<br><code>{<br>&nbsp;&nbsp;cozy: {<br>&nbsp;&nbsp;&nbsp;data: ...,<br>&nbsp;&nbsp;&nbsp;meta: ...<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;engine: {<br>&nbsp;&nbsp;&nbsp;data: ...,<br>&nbsp;&nbsp;&nbsp;meta: ...<br>&nbsp;&nbsp;}<br>}</code><br>Association d'un objet contenant les données du {+{cozyid}+} (cozy) et d'un objet contenant les données du moteur (engine). Chaque objet contient des données (data) et des pré-calculs (meta) suivant l'analyse demandée.</td>
</tr>
</tbody>
</table>