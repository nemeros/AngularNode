angular.module('suiviNomeApp')
    .controller('mainController', function ($scope, $log, Tables) {
    	Tables.getTables().then(function(response){
    		$scope.user = response.data;
    	});    	
    });