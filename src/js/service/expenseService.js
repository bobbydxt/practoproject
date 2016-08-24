	app.service('expenseService', ['$http','userFactory', 
		function($http,userFactory){

		var expenseService = {};

		expenseService.newExpense = function(params,callback)
		{
			console.log(params);

			httpRequestHandler({
								expenseType: params.expense.expenseCatagory.id,
								mainCatagory: params.expense.mainCatagory.id,
								subCatagory: params.expense.subCatagory.id,
								amount: params.amount,
								remark: params.remark
								},'/api/expense/new','POST',callback);

		}

		function httpRequestHandler(params,url,method,callback)
		{
			var auth=httpHeaderVerifier();
			if(auth)
			{
				console.log($http.defaults.headers.common.Authorization);
						$http({
						  params: params,
						  method: method,
						  url: url,
						  timeout:5000
						}).success(function(res,status){
							console.log(res);
							callback(parseHttpResponse(status,true,res));
						})
						  .error(function (err,status){
						  	console.log(err);
						  	if(status===403)
						  	{
						  		userFactory.logout;
						  	}
						  	callback(parseHttpResponse(status,false,err));
						  });
			}
			else
			{
				callback(parseHttpResponse(status,false,err));
				userFactory.logout;
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


		function parseHttpResponse(status,success,data)
		{
			if(data.data)
			{
				return {status: status,success: success, data: data.data, msg:data.msg}
			}
			else
			{
				return {status: status,success: success, msg:data.msg}
			}
		}

		return expenseService;

		
	}])