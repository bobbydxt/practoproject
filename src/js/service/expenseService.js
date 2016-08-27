	app.service('expenseService', ['$http','userFactory', 
		function($http,userFactory){

		var expenseService = {};

		expenseService.newExpense = function(params,callback)
		{
			//console.log(params);
			console.log(toSendGenerator(params));
			httpRequestHandler(toSendGenerator(params),'/api/expense/new','POST',callback);

		}
		expenseService.editExpense = function(params,callback)
		{
			//console.log(params);
			var tosend =toSendGenerator(params);
			tosend.id = params.id;

			httpRequestHandler(tosend,'/api/expense/update','PUT',callback);

		}
		expenseService.deleteExpense = function(params,callback)
		{
			//console.log(params);
			

			httpRequestHandler({id:params},'/api/expense/delete','delete',callback);

		}
		function toSendGenerator(params)
		{
						var tosend={
								expenseType: params.expense.expenseCatagory.id,
								mainCatagory: params.expense.mainCatagory.id,
								subCatagory: params.expense.subCatagory.id,
								amount: params.amount,
								remark: params.remark,
								ondate: params.date
								};
								return tosend;
		}

		expenseService.getMonthlyExpense = function(params,callback)
		{
			//console.log(params);
			callback(
				httpRequestHandler({month: parseInt(params[0],10), year: parseInt(params[1],10)},
					'/api/expense/bymonth','GET',callback))
		}

		function httpRequestHandler(params,url,method,tocall)
		{
			var auth=httpHeaderVerifier();
			if(auth)
			{
				//console.log($http.defaults.headers.common.Authorization);
						$http({
						  params: params,
						  method: method,
						  url: url,
						  timeout:5000
						}).success(function(res,status){
							console.log(res);
							tocall(true,res.data.data);
						})
						  .error(function (err,status){
						  	console.log(err);
						  	if(status===403)
						  	{
						  		userFactory.logout();
						  	}
						  	tocall(parseHttpResponse(status,false,err.msg));
						  });
			}
			else
			{
				tocall(parseHttpResponse(status,false,'You arn\'t logged in'));
				userFactory.logout();
			}
		}

		function httpHeaderVerifier()
		{
			if(userFactory.getPresentState())
			{

				//console.log(userFactory.getPresentState().token);
				 $http.defaults.headers.common.Authorization = userFactory.getPresentState().token;
				return true;
			}
			else
			{
				return false;
			}
		}


		function parseHttpResponse(status,success,msg)
		{
				return {status: status,success: success, msg:msg}
		}

		return expenseService;

		
	}])