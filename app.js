var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var pgp = require('pg-promise')(/*options*/);
var db = pgp("postgres://postgres:secure@localhost:5432/pgbench");

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json

app.get('/api/tables/', function(req, res){
	db.many("select tablename from pg_tables where schemaname = ${schema}",{schema:"public"})
		.then(function(data){
			res.json(data);
		})
		.catch(function(error){
			console.log("ERROR: ", error);
			res.status(500).json(error);
		});
});

app.get('/api/tables/:name', function(req, res){
	db.many("select true as isChecked, column_name, data_type from information_schema.columns " +
		"where table_schema = ${schema} and table_name = ${tbname}", {schema:"public", tbname:req.params.name})
		.then(function(data){
			res.json(data);
		})
		.catch(function(error){
			console.log("ERROR: ", error);
			res.status(500).json(error);
		});
});

app.post('/api/data/', function(req, res){
	var query = "SELECT ";

	var binding = new Array();
	var requestData = req.body;

	query = query + requestData.columns;

	query = query + " FROM " + requestData.table;

	if(requestData.whereClause.length > 0){
		query = query + " WHERE 1=1 ";
		for(index = 0; index < requestData.whereClause.length; index++){
			query = query + " AND " + requestData.whereClause[index].column + " " + requestData.whereClause[index].operator +
				" $" + (index+1) + " ";

			binding.push(requestData.whereClause[index].valeur);
		}
	}

	query = query + " LIMIT 100";

	db.manyOrNone(query, binding)
		.then(
			function successCallback(data){
				res.json(data);
			},
			function errorCallback(response){
				console.log("RESPONSE:" + response);
				var retour = new Object();
				retour.erreur = response;
				res.status(500).json(retour);
			})
		.catch(function(error){
			console.log("ERROR: ", error);
			console.log("ERROR: ", e);
			res.status(500).json(error);
		});
});


app.listen(3000, function(){
	console.log('Suivi Nome App');
});