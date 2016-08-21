var app=angular.module('expenseapp', []);
	app.controller('main', ['$scope', function($scope){
		 $scope.message = 'random message';
	}]);