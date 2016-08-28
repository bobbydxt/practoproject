	app.factory('viewExpenseFactory', ['expenseService','expenseConstant', function(expenseService,expenseConstant){
		var viewExpenseFactory = {};

		 viewExpenseFactory.presentStack = false;
		 viewExpenseFactory.expenseConstant = expenseConstant;


		viewExpenseFactory.getMonthlyData = function(param,callback)
		{
			expenseService.getMonthlyExpense(param,
				function(object)
			{
				//console.log(object);
				if(object.success===true)
				{
					//console.log(viewExpenseFactory.presentStack);
					viewExpenseFactory.presentStack = {};
				//	console.log('true');
					var tostore = {};
					var type,catagory,subcatagory;
				object['msg'].forEach(function(entry) {
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


             viewExpenseFactory.checkIfPresent =function(index, object) {
                if (object[index])
                    return object[index];
                else
                    return false
            }
            viewExpenseFactory.checkSubFullfilled =function(tocheck) {
                var check = true;

                for (var val in tocheck) {
                    if (tocheck.hasOwnProperty(val)) {
                        if (tocheck[val].status === false)
                            check = false;
                    }
                }
                return check;


            }
                        function groubByapplier(object, data) {
                return $filter('groupBy')(object, data);
            }

                        function pieDateSlotGenerator(object,index) {
                var toprocess = {},
                    toreturn = [];
                var expConstant= viewExpenseFactory.expenseConstant[index].data;
                var data;
                for (var value in object) {
                    if (object[value]) {
                        catagory = object[value].mainCatagory;
                        if(!toprocess[catagory])
                            toprocess[catagory]={label: expConstant[catagory].name, value:0};
                        toprocess[catagory].value += parseInt(object[value].amount,10);
                    }
                }
                console.log(toprocess);
                for (value in toprocess) {
                    if (toprocess[value]) {
                        toreturn.push(toprocess[value]);
                    }
                }
             //   console.log(toreturn);
                return toreturn;
            }
            function barDateSlotGenerator(object) {
                var toprocess = {},
                    toreturn = [];
                for (var i = 1; i <= 6; i++) {
                    toprocess[i] = {
                        label: (5 * (i - 1)) + 1 + "-" + 5 * i,
                        value: 0
                    }
                }
                var date;
                for (var value in object) {
                    if (object[value]) {
                        date = parseInt(parseInt(object[value].ondate.split("/")[0],10) / 5,10)+1;
                        console.log(date);
                        toprocess[date]['value'] += parseInt(object[value].amount,10);
                    }
                }
                for ( i = 1; i <= 6; i++) {
                    toreturn.push(toprocess[i]);
                }
                //console.log(toreturn);
                return toreturn;
            }


               viewExpenseFactory.createGraphObject = function(object, index, type,name) {
                var toreturn = {};

                if(type==='Bar3D')
                {
                toreturn = {
                    chart: {
                        caption: "Monthly " + name + " history",
                        subCaption: "Here are your " + name + " transactions for this month by date",
                        numberPrefix: "Rs",
                        theme: "ocean"
                    },
                    data: barDateSlotGenerator(object)
                };
                }
                else if (type==='Pie3D') {
                    toreturn = {
                    chart: {
                        caption: "Monthly " + name +" expense based on catagory",
                        subcaption: "Here are your " + name + " expense based on catagory",
                        startingangle: "120",
                        showlabels: "0",
                        showlegend: "1",
                        enablemultislicing: "0",
                        slicingdistance: "15",
                        showpercentvalues: "1",
                        showpercentintooltip: "0",
                        plottooltext: "Catagory : $label Total amount: $datavalue",
                        theme: "ocean"
                    },
                    data: pieDateSlotGenerator(object,index)
                };
                }

                return toreturn;


            }






		return viewExpenseFactory;
	}])