# Utilisation
#### Informations
* Les sources de la partie cliente sont dans {+ client/src/ +}. Les fichiers compilés sont lus par Cozy et sont dans le répertoire {+ client/dist/ +}.
* La partie cliente peut être compilée de deux façons : en mode développement ou production. Dans le second cas, les fichiers générés sont plus légers.

## Commandes
#### Utilisation basique
* `npm install` : Installe l'API serveur et la partie cliente.
* `npm start` : Démarre l'API serveur et compile la partie cliente en mode développement avec le dummy service. Chaque modification apportée à la partie cliente dans {+ client/src/ +} relance automatiquement la compilation. 

#### Utilisation avancée
* `npm run start:only` : Démarre uniquement l'API serveur. Si besoin, la partie cliente est a compilée dans un autre terminal dans {+ client/+} :
  * `npm start` / `npm run cozy:dev` : Compile en mode développement avec le dummy service et recompile automatiquement en cas de modification dans {+ client/src/ +}.
  * `npm run cozy:dev_api` : Compile en mode développement avec le http service et recompile automatiquement en cas de modification dans {+ client/src/ +}.
  * `npm run cozy:prod` : Compile en mode production avec le http service et recompile automatiquement en cas de modification dans {+client/src/ +}.
  * `npm run build:dev` / `npm run build:dev_api` / `npm run build:prod` : Idem que précédemment mais sans la recompilation automatique.

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
<td style="text-align:center">GET</td>
<td>/analyze?{+cozyid={cozyid}+}&amp;{-field={field}-}{+[&amp;period={period}]+}{-[&amp;group={by1[,by2][;value]}]-}</td>
<td><ul>
<li>{+{cozyid}+} Identifiant du cozy de l'utilisateur</li>
<li>{-{field}-} Type du champ demandé<br>Disponible pour le moment : <em>Bill</em></li>
<li><i>Facultatif :</i> {+{period}+}<br>Sélectionner des données entre deux dates : <code>date1;date2</code>.<br>Exemples de format : <br>"2017-01-01;2017-12-31"<br>"2017-01-01T00:00:00.000Z;2017-12-31T23:59:59.000Z"</li>
<li><i>Facultatif :</i> {-{group}-}<br>Regrouper les résultats : <code>champ(s) du GROUP BY[;champ sur lequel les agrégats s'appliquent (value par défaut)]</code>.<br>Exemples :<br>
<code>time(5d)</code> : Regrouper sur 5 jours<br>
<code>vendor</code> : Regrouper par vendeur<br>
<code>vendor,time(30d)</code> : Regrouper par vendeur puis par période de 30 jours<br>
<code>vendor;amount</code> : Regrouper par vendeur en appliquant les agrégats sur la valeur "amount"<br>
<code>vendor,time(1w);amount</code> : Regrouper par vendeur puis par période d'une semaine en appliquant les agrégats sur la valeur "amount"<br>
</li>
</ul></td>
<td>Retourne :<br><code>{<br>&nbsp;&nbsp;cozy: {<br>&nbsp;&nbsp;&nbsp;data: ...,<br>&nbsp;&nbsp;&nbsp;meta: ...<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;engine: {<br>&nbsp;&nbsp;&nbsp;data: ...,<br>&nbsp;&nbsp;&nbsp;meta: ...<br>&nbsp;&nbsp;}<br>}</code><br>Association d'un objet contenant les données du {+{cozyid}+} (cozy) et d'un objet contenant les données du moteur (engine). Chaque objet contient des données (data) et des pré-calculs (meta) suivant l'analyse demandée.</td>
</tr>
</tbody>
</table>