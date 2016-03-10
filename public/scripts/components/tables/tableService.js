'use strict'


angular.module('suiviNomeApp')
	.factory('tableService', function($http){
		return {
			'getTables': function(){
				return $http.get("/api/tables/");
			},
			'getTableColumn': function(tableName){
				return $http.get("/api/tables/" + tableName);
			}
		};
	});