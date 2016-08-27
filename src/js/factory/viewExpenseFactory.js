	app.factory('viewExpenseFactory', ['expenseService', function(expenseService){
		var viewExpenseFactory = {};

		 viewExpenseFactory.presentStack = false;



		viewExpenseFactory.getMonthlyData = function(param,callback)
		{
			expenseService.getMonthlyExpense(param,
				function(object,response)
			{
				if(object===true)
				{
					//console.log(viewExpenseFactory.presentStack);
					viewExpenseFactory.presentStack = {};
				//	console.log('true');
					var tostore = {};
					var type,catagory,subcatagory;
				response.forEach(function(entry) {
				//	console.log(entry);
					valueInserter(entry.expenseType,entry.mainCatagory,entry.subCatagory,entry._id,entry);
				});
				//console.log(viewExpenseFactory.presentStack);
				return callback(viewExpenseFactory.presentStack);

				//console.log(viewExpenseFactory.presentStack);
				}
			


			})
		}

		function valueInserter(type,catagory,subCatagory,index,entry)
		{
			
			objectinit(viewExpenseFactory.presentStack,type);
			objectinit(viewExpenseFactory.presentStack[type],catagory);
			objectinit(viewExpenseFactory.presentStack[type][catagory],subCatagory);
			objectinit(viewExpenseFactory.presentStack[type][catagory][subCatagory],index);
			entry.ondate=butifyDate(entry.ondate);
			//entry.ondate = entry.ondate;
				viewExpenseFactory.presentStack[type][catagory][subCatagory][index]=entry;
			//	console.log(viewExpenseFactory.presentStack);
		}

		function objectinit(object,index)
		{
			if(!object[index])
			{
				object[index] = {};

			}
			return object;
		}
                        function butifyDate(data) {
                            var d = new Date(data);
                            return [d.getDate(), d.getMonth() + 1,
                                d.getFullYear()
                            ].join('/');
                        }


		function postDataHandler(object,response)
		{
			if(object)
			{
				
				return true
			}
			else
				return false;

		}

		return viewExpenseFactory;
	}])