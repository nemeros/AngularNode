angular.module('suiviNomeApp')
    .controller('tableController', function ($scope, $log, $stateParams, tableService, dataService) {
    	
    	$scope.initTable = function(){
    		$scope.erreur = null;
    		$scope.isData = false;
    		$scope.tableName = $stateParams.name;
    		$scope.listWhere = ['','=', '>', '<', '>=', '<='];


    		tableService.getTableColumn($scope.tableName)
    			.then(function succesCallback(response){
    				$scope.columnList = response.data;
    			});
    	};

    	$scope.submitSearch = function(){
    		var requestData = new Object();
    		requestData.table = $scope.tableName;
    		requestData.columns = new Array();
    		requestData.whereClause = new Array();

    		for(index = 0; index < $scope.columnList.length; index++){
    			if($scope.columnList[index].ischecked){
    				requestData.columns.push($scope.columnList[index].column_name);
    				if($scope.columnList[index].whereSelected && $scope.columnList[index].whereValue){
    					requestData.whereClause.push({
    						column: $scope.columnList[index].column_name,
    						operator: $scope.columnList[index].whereSelected,
    						valeur: $scope.columnList[index].whereValue
    					});
    				}
    			}
    		}

    		dataService.getData(requestData)
    			.then(function succesCallback(response){
    				$scope.erreur = null;
    				$scope.isData = true;
    				$scope.columnForTable = requestData.columns;
    				$scope.dataForTable = response.data;
    			},
    			function errorCallback(error){
    				$scope.isData = false;
    				$scope.erreur = angular.toJson(error);
    			});
    	};
    });