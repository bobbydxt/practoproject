	app.controller('expenseController', ['$scope', '$location', 'userFactory', 'expenseFactory',
	    'expenseConstant', 'helperService', '$route',
	    function($scope, $location, userFactory, expenseFactory, expenseConstant, helperService, $route) {

	        //only logged in user

	        $scope.expenseConstant = expenseConstant;

	        //console.log($scope.expense);
	        //console.log($scope.expense);
	        //userFactory.logout();
	        //console.log($state);
	        $scope.edit = $route.current.$$route.data.edit;
	        initialize();
	        $scope.onMainCatagoryChange = function(mainCatagory, expenseCatagory) {
	            expenseFactory.initialize(expenseCatagory, mainCatagory);
	            //console.log(expenseCatagory);
	            if ($scope.edit === true)
	                $location.path('/main_edit_expense')
	            else
	                $location.path('/expense_form')
	        }
	        $scope.newExpense = function(userInfo) {
	            userInfo.expense = $scope.expense;
	            //console.log(userInfo);
	            if ($scope.edit === true) {
	                helperService.callHandler(userInfo, $scope.form.$valid,
	                    expenseFactory.transaction, 'edit');
	            } else {
	                helperService.callHandler(userInfo, $scope.form.$valid,
	                    expenseFactory.transaction, 'new');
	            }

	        }
	        $scope.changeType = function() {
	            if ($scope.edit === true) {
	                expenseFactory.setEditExpense($scope.expense);
	                $location.path('/edit_expense_select');

	            } else {
	                $location.path('/expense_select');
	            }
	        }

	        function modifyDate(date) {
	            var data = date.split('/');
	            return [data[1], data[0], data[2]].join('/');
	        }

	        function initialize() {
	            if ($scope.edit) {
	                console.log('here');
	                var toprocess = expenseFactory.getEditData();
	                $scope.expense = {};
	                $scope.userInfo = {};
	                if ($route.current.$$route.data.mainChange === true && expenseFactory.PresState.processing === true) {
	                    $scope.expense = expenseFactory.PresState;
	                } else {
	                    $scope.expense.expenseCatagory = $scope.expenseConstant[toprocess.expenseType];
	                    $scope.expense.mainCatagory = $scope.expense.expenseCatagory.data[toprocess.mainCatagory];
	                    $scope.expense.subCatagory = $scope.expense.mainCatagory.subCatagory[toprocess.subCatagory];
	                }
	                $scope.userInfo.amount = toprocess.amount;
	                $scope.userInfo.remark = toprocess.remark;
	                $scope.userInfo.date = modifyDate(toprocess.ondate);
	                $scope.userInfo.id = toprocess._id;

	            } else {
	                $scope.expense = expenseFactory.PresState;
	            }
	        }
	    }
	])