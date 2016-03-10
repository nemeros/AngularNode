'use strict';

angular.module('suiviNomeApp')
	.config(function ($stateProvider){
		$stateProvider.state('main',{
			parent: 'abstractHome',
            url: '/',
            views: {
                'content@': {
                    templateUrl: 'scripts/app/main/main.html',
                    controller: 'mainController'
                }
            }
		})
	});