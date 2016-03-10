'use strict';

angular.module('suiviNomeApp')
	.config(function ($stateProvider){
		$stateProvider.state('/table',{
			parent: 'abstractHome',
            url: '/table/:name',
            views: {
                'content@': {
                    templateUrl: 'scripts/app/table/table.html',
                    controller: 'tableController'
                }
            }
		})
	});