'use strict';

angular.module('suiviNomeApp')
    .controller('NavbarController', function ($scope, $log, tableService) {
    	
    	$scope.initNav = function(){
    		tableService.getTables().then(function successCallback(response){
    			$scope.tableList = response.data;
    		});
    	};
    });