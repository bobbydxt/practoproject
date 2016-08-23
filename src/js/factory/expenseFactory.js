	app.factory('expenseFactory', ['$scope', function($scope){
		var expenseFactory = {};
		expenseFactory.expenseType={
			credit: {
				1: {name: 'Salary',
					subCatagory:{
						1: 'Primary Income',
						2: 'Bonus',
						3: 'Upraisel'
					}},
				2: {name: 'Awards',
					subCatagory:{
						1: 'Organizational',
						2: 'Competitions',
						3: 'Events'
					}},
				3: {name: 'Gifts',
					subCatagory:{
						1: 'Friends and Family',
						2: 'Contests',
						3: 'Events'
					}},
				4: {name: 'Sellings',
					subCatagory:{
						1: 'Property',
						2: 'Goods',
						3: 'Services'
					}},
				5: {name: 'Interests',
					subCatagory:{
						1: 'Investments',
						2: 'Deposits',
						3: 'Informal Lending'
					}},

				6: {name: 'Rental',
					subCatagory:{
						1: 'Property',
						2: 'Goods'
					}},
				7: {name: 'Tax Return',
					subCatagory:{
						1: 'Due to Excess payment',
						2: 'Due to rebates'
					}}
			},
			debit: {
				1: {name: 'Food and Beverage',
					subCatagory:{
						1: 'Online order',
						2: 'Restaurants',
						3: 'Cafe',
						4: 'Canteen'
					}},

				2: {name: 'Bills and Utility',
					subCatagory:{
						1: 'Phone',
						2: 'Water',
						3: 'Electricity',
						4: 'Gas',
						5: 'Internet',
						6: 'Tv subscriptions',
						7: 'Rentals'
					}},
				3: {name: 'Transportation',
					subCatagory:{
						1: 'Cabs',
						2: 'Parking',
						3: 'Petrol',
						4: 'Maintenance'
					}},

				4: {name: 'Shopping',
					subCatagory:{
						1: 'Cloaths',
						2: 'Footware',
						3: 'Accessories',
						4: 'Electronics'
					}},
				5: {name: 'Entertainment',
					subCatagory:{
						1: 'Movie',
						2: 'Games',
						3: 'Events',
						4: 'Sports'
					}},
				6: {name: 'Health and Fitness',
					subCatagory:{
						1: 'Doctor',
						2: 'Pharmacy',
						3: 'Personal Care',
						4: 'Diagnostic'
					}},
				7: {name: 'Gifts and Donations',
					subCatagory:{
						1: 'Charity',
						2: 'Informal',
						3: 'Marriage',
						4: 'Funeral'
					}},
				8: {name: 'Education',
					subCatagory:{
						1: 'Books',
						2: 'Fees'
					}},
				9: {name: 'Withdrawal',
					subCatagory:{
						1: 'Check',
						2: 'Cash'
					}},
				10: {name: 'Investments',
					subCatagory:{
						1: 'Insurance',
						2: 'Mutual Fund',
						3: 'Equity'
					}}
			}

		};

	}])