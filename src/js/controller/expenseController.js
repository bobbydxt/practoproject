	app.controller('expenseController', ['$scope','$location','userFactory','expenseFactory',
		'expenseConstant', 'helperService',
		function($scope,$location,userFactory,expenseFactory,expenseConstant,helperService){

		//only logged in user
		userFactory.routeLoggedIn();

		$scope.expenseConstant = expenseConstant;
		$scope.expense= expenseFactory.PresState;
		//console.log($scope.expense);
		//console.log($scope.expense);
		//userFactory.logout();
		$scope.onMainCatagoryChange = function(mainCatagory,expenseCatagory)
		{
			expenseFactory.initialize(expenseCatagory,mainCatagory);
			console.log(expenseCatagory);
			$location.path('/expense_form')
		}
		$scope.newExpense = function(userInfo)
		{
			//console.log(userInfo);
			userInfo.expense = $scope.expense;
			
		 	helperService.callHandler(userInfo,$scope.form.$valid,
		 		expenseFactory.newExpense);
		 
		}
	}])