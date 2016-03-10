'use strict'



angular.module('suiviNomeApp')
	.factory('dataService', function($http){
		return {
			'getData': function(requestData){
				return $http.post("/api/data/", requestData);
			}
		};
	});