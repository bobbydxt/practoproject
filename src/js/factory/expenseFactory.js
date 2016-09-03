	app.factory('expenseFactory', ['localStorageService', 'expenseService', 'flashService', '$location',
	    function(localStorageService, expenseService, flashService, $location) {
	        var expenseFactory = {};
	        var tempPres = expenseDefaultState();
	        expenseFactory.PresState = getCurrentExpense(tempPres);
	        expenseFactory.initialize = function(expenseCatagory, mainCatagory) {
	            this.PresState.processing = true;
	            this.PresState.mainCatagory = mainCatagory;
	            this.PresState.expenseCatagory = expenseCatagory;
	            this.PresState.subCatagory = mainCatagory.subCatagory['0'];
	            setCurrentExpense(this.PresState);
	        }
	        expenseFactory.setEditExpense = function(expense) {
	            this.PresState = expense;
	            this.PresState.processing = true;
	            setCurrentExpense(this.PresState);
	        }
	        expenseFactory.initializeEdit = function(data) {
	            localStorageService.set('EditData', data);
	            //console.log(localStorageService.get('EditData'));

	            $location.path('/edit_expense');
	            //flashService.successResponse(false,'no object to edit');
	        }
	        expenseFactory.getEditData = function() {
	            if (localStorageService.get('EditData'))
	                return localStorageService.get('EditData');
	            else {
	                $location.path('/view_expense');
	                flashService.successResponse(false, 'no object to edit');

	            }

	            //console.log(localStorageService.get('EditData'));

	        }
	        expenseFactory.transaction = function(data, type) {
	            if (type === 'delete')
	                expenseService.deleteExpense(data, function(object) {
	                    postResponseHandler(object, type);


	                });
	            else if (type === 'new')
	                expenseService.newExpense(data, function(object) {
	                    postResponseHandler(object, type);
	                });
	            else if (type === 'edit') {
	                expenseService.editExpense(data, function(object) {
	                    postResponseHandler(object, type);

	                });
	            }
	        }

	        function postResponseHandler(object, type) {
	            var expenseErrorHandler = {
	                '403': 'This Is An Invalid Session',
	                '400': 'You haven\'t provided all necessacory fields',
	                '-1': 'Query timeout',
	                '200': 'Data wasn\'t returned',
	                '409': 'Data was rejected by server Please try again later'
	            }
	            if (object.success === true) {
	                response = {
	                    success: true,
	                    message: 'Task Successful'
	                };
	                if (type === 'edit' || type === 'new')
	                    $location.path('/view_expense')
	            } else {
	                //console.log('false');
	                response = {
	                    success: false,
	                    message: expenseErrorHandler[object.status]
	                };
	            }
	            flashService.successResponse(response.success, response.message);
	            return response;

	        }

	        function expenseDefaultState() {
	            return {
	                processing: false,
	                expenseCatagory: false,
	                mainCatagory: false,
	                subCatagory: false
	            }
	        }

	        function setCurrentExpense(PresState) {

	            //setting local sto
	            localStorageService.set('PresState', PresState);
	            console.log(localStorageService.get('PresState'));

	            return true;
	        }

	        function getCurrentExpense(pres) {

	            //setting local sto
	            console.log(tempPres);
	            if (localStorageService.get('PresState')) {
	                return localStorageService.get('PresState');

	            } else {
	                return pres;
	            }
	        }




	        return expenseFactory;

	    }
	])