	app.factory('expenseFactory', ['localStorageService',
        function(localStorageService){
		var expenseFactory = {};
		var tempPres = {
			processing: false,
			expenseCatagory:false,
			mainCatagory: false,
			subCatagory: false
		}
		expenseFactory.PresState=getCurrentExpense(tempPres);
		expenseFactory.initialize = function(expenseCatagory,mainCatagory)
		{
			this.PresState.processing = true;
			this.PresState.mainCatagory = mainCatagory;
			this.PresState.expenseCatagory = expenseCatagory;
			this.PresState.subCatagory = mainCatagory.subCatagory['0'];
			setCurrentExpense(this.PresState);
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