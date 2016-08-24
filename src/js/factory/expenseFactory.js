	app.factory('expenseFactory', ['localStorageService','expenseService','flashService',
        function(localStorageService,expenseService,flashService){
		var expenseFactory = {};
		var tempPres = expenseDefaultState();
		expenseFactory.PresState=getCurrentExpense(tempPres);
		expenseFactory.initialize = function(expenseCatagory,mainCatagory)
		{
			this.PresState.processing = true;
			this.PresState.mainCatagory = mainCatagory;
			this.PresState.expenseCatagory = expenseCatagory;
			this.PresState.subCatagory = mainCatagory.subCatagory['0'];
			setCurrentExpense(this.PresState);
		}

		expenseFactory.newExpense= function(userInfo)
		{
			expenseService.newExpense(userInfo,function(object)
			{
				    	if (object.success === true )
				    	{
                            response = { 
                            	success: true,
                            	message: 'Entry created Successfully'
                        		};

                        } else {
                            response = { success: false, message: expenseErrorHandler[object.status] };
                        }

                        flashService.successResponse(response.success,response.message);
                    
			})
		}
		var expenseErrorHandler = {
				'403': 'This Is An Invalid Session',
                '400': 'You haven\'t provided all necessacory fields',
                '-1': 'Query timeout',
                '200': 'Data wasn\'t returned',
                '409': 'Data was rejected by server Please try again later'
		}
		function expenseDefaultState()
		{
			return {
			processing: false,
			expenseCatagory:false,
			mainCatagory: false,
			subCatagory: false
			}
		}

		function setCurrentExpense(PresState) {

                //setting local sto
                localStorageService.set('PresState',PresState);
                 console.log(localStorageService.get('PresState'));
               
                return true;
        }
         function getCurrentExpense(pres) {

                //setting local sto
                console.log(tempPres);
                if(localStorageService.get('PresState'))
                {
                	return localStorageService.get('PresState');
                	
                }
            	else
            	{
                	return pres;
            	}
        }




		return expenseFactory;

		}])