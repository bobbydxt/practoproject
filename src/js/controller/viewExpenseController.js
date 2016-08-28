    app.controller('viewExpenseController', ['$scope', 'viewExpenseFactory', 'expenseConstant',
     'userFactory', '$filter','expenseFactory','$route',
        function($scope, viewExpenseFactory, expenseConstant, userFactory, $filter,expenseFactory,$route) {
            var primaryStack = {};




            $scope.expenceType = false;
            $scope.displayTransactions = {};
            $scope.presentStack = viewExpenseFactory.presentStack;
            $scope.filterListner = {};
            $scope.filterObject = {};
            $scope.expenseConstant = expenseConstant;
            $scope.graphData = {};
            createList(true);
            
            //console.log($scope.filterObject );
            $scope.$watch('date', function(val) {
                if (val !== undefined) {
                    var pdate = val.split(',');
                    if (!isNaN(pdate[0]) && !isNaN(pdate[1])) {
                        viewExpenseFactory.getMonthlyData(pdate, function(response) {
                            $scope.presentStack = response;
                            $scope.displayTransactions = {};
                            // console.log($scope.filterObject);
                            monthChanged($scope.filterObject[1], 'expense', {
                                eid: 1
                            });
                            monthChanged($scope.filterObject[2], 'expense', {
                                eid: 2
                            });
                            if($route.current.$$route.data.graph===true)
                            {
                                 $scope.graphGenerator();
                            }
                            //console.log(groubByapplier('ondate'));
                            
                        });
                    }
                }
            });
            $scope.graphType = 'Bar3D';

            $scope.graphGenerator = function () {
                console.log($scope.graphType);
                //console.log($scope.graph);
                 if (this.date !== undefined) {
                createDateGraph($scope.graphType);
                }
            }

            $scope.editExpense = function(transactionId)
            {
                if($scope.displayTransactions[transactionId])
                {
                    expenseFactory.initializeEdit($scope.displayTransactions[transactionId]);
                }
                //
            }
            $scope.deleteExpense = function(transactionId)
            {

                    var tosearch = this.displayTransactions[transactionId];
                if(transactionId&&tosearch)
                {
                    expenseFactory.delete(transactionId);
                    
                    delete this.presentStack[tosearch.expenseType][tosearch.mainCatagory][tosearch.subCatagory][transactionId];
                    delete this.displayTransactions[transactionId];
                }
                
            }

            function createDateGraph( type) {

                var forGraph = {};
                //first fetch all the credit value
                var mapper = {
                    1: 'credit',
                    2: 'debit'
                };
                for (var i = 1; i <= 2; i++) {

                    $scope.displayTransactions = {};
                    monthChanged($scope.filterObject[i], 'expense', {
                        eid: i
                    });
                    forGraph[mapper[i]] = $scope.displayTransactions;
                    $scope.graphData[mapper[i]] = createGraphObject(forGraph[mapper[i]], i, type,mapper[i]);

                }
                //console.log( $scope.graphData[mapper[1]]);

            }

            function createGraphObject(object, index, type,name) {
                var toreturn = new FusionCharts;

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
            function pieDateSlotGenerator(object,index) {
                var toprocess = {},
                    toreturn = [];
                var expConstant=$scope.expenseConstant[index].data;
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
                        date = parseInt(parseInt(object[value].ondate.split("/")[0],10) / 5,10);

                        toprocess[date].value += parseInt(object[value].amount,10);
                    }
                }
                console.log(toprocess);
                for ( i = 1; i <= 6; i++) {
                    toreturn.push(toprocess[i]);
                }
                //console.log(toreturn);
                return toreturn;
            }

            function groubByapplier(object, data) {
                return $filter('groupBy')(object, data);
            }
            $scope.onexpenseTypeChange = function(value) {

                var eid, check;
                eid = this.expenseType.id;

                this.filterObject[eid]['status'] = value;
                expenseAddToDisplay(eid, value)
                $scope.filterObject[eid] = {
                    status: value,
                    data: setMainCatagoryList(
                        $scope.expenseConstant[eid].data, value, eid)
                };
                return $scope.filterObject[eid];
            }
            $scope.myDataSource = {
                chart: {
                    //Define the chart attributes.
                },
                data: [
                    //Define the data labels and data values for the data plots.
                ]
            };


            function expenseAddToDisplay(eid, value) {
                check = checkIfPresent(eid, $scope.presentStack);
                //console.log(value);
                addOthrToDisplay(check, value, true);
            }



            $scope.onmainCatagoryChange = function(value) {

                var eid, mid, check;
                eid = this.$parent.expenseType.id;
                mid = this.mainCatagory.id;

                //console.log(value);

                this.filterObject[eid]['data'][mid]['status'] = value;
                mainAddToDisplay(eid, mid, value)
                var parent = checkSubFullfilled($scope.filterObject[eid]['data'])
                this.filterObject[eid]['data']['status'] = parent;
                this.filterListner[eid] = parent;
                //setting the sub catagories 
                this.filterObject[eid]['data'][mid]['subCatagory'] = setSubCatagoryList(
                    this.expenseConstant[eid]['data'][mid]['subCatagory'], value, eid, mid)
            }

            function mainAddToDisplay(eid, mid, value) {
                check = checkIfPresent(mid, checkIfPresent(eid, $scope.presentStack));

                addOthrToDisplay(check, value, false);
            }

            $scope.onsubCatagoryChange = function(value) {
                //console.log(this.$parent.mainCatagory);
                //$scope.scopeC[this.subCatagory.id] = false;
                //console.log($scope.filterListner);
                var eid, mid, sid, check;
                eid = this.$parent.$parent.expenseType.id;
                mid = this.$parent.mainCatagory.id;
                sid = this.subCatagory.id;
                // console.log(eid+mid+sid);
                // console.log($scope.filterListner);

                //console.log(value);
                this.filterObject[eid]['data'][mid]['subCatagory'][sid]['status'] = value;
                subAddToDisplay(sid, eid, mid, value);
                var parent = checkSubFullfilled($scope.filterObject[eid]['data'][mid]['subCatagory'])
                this.filterObject[eid]['data'][mid]['status'] = parent;
                this.filterListner[eid + ' ' + mid] = parent;
            }

            function subAddToDisplay(sid, eid, mid, value) {
                check = checkIfPresent(sid, checkIfPresent(mid, checkIfPresent(eid, $scope.presentStack)));

                subDisplay(check, value);

            }



            function addOthrToDisplay(object, status, call) {
                if (object !== false) {
                    for (var data in object) {
                        if (object[data]) {
                            if (call === true)
                                addOthrToDisplay(object[data], status, false)
                            else
                                subDisplay(object[data], status)
                        }
                    }
                }
            }


            //function triggerLocalStorage(pdata,)

            function monthChanged(object, fieldname, data) {
                // console.log(object);

                var pushDataHandler = {
                    'expense': 'mid',
                    'main': 'sid'
                };

                var dataSetObject = {
                    'expense': object['data'],
                    'main': object['subCatagory'],
                    'sub': false
                };

                var fieldNameHandler = {
                    'expense': 'main',
                    'main': 'sub'
                };
                var checkState = dataSetObject[fieldname];
                if (object.status === true) {
                    var trueHandler = {
                        'expense': expenseAddToDisplay(data.eid, true),
                        'main': mainAddToDisplay(data.eid, data.mid, true),
                        'sub': subAddToDisplay(data.sid, data.eid, data.mid, true)
                    };
                    return trueHandler[fieldname];
                } else if (checkState !== false) {
                    for (var value in checkState) {
                        if (checkState[value]) {
                            data[pushDataHandler[fieldname]] = value;
                            return monthChanged(checkState[value], fieldNameHandler[fieldname], data)

                        }
                    }
                }

            }

            function subDisplay(object, status) {
                // console.log(object);
                if (status === true && object !== false) {
                    for (var data in object) {
                        if (object[data]) {
                            //   console.log(object[data]);
                            $scope.displayTransactions[data] = object[data];
                        }
                    }
                } else {
                    for (var toremove in object) {
                        if (object[toremove]) {
                            delete $scope.displayTransactions[toremove];

                        }
                    }
                }
            }

            function checkSubFullfilled(tocheck) {
                var check = true;

                for (var val in tocheck) {
                    if (tocheck.hasOwnProperty(val)) {
                        if (tocheck[val].status === false)
                            check = false;
                    }
                }
                return check;


            }


            function createList() {
                //console.log($scope.expenseConstant);
                for (var data in $scope.expenseConstant) {
                    if ($scope.expenseConstant[data]) {
                        $scope.filterListner[data] = true;
                        $scope.filterObject[data] = {
                            status: true,
                            data: setMainCatagoryList($scope.expenseConstant[data].data, true, data)
                        };
                    }
                }
              //  console.log($scope.filterObject);
            }

            function setMainCatagoryList(object, status, expId) {
                var temp = {};
                for (var main in object) {
                    if ({}.hasOwnProperty.call(object, main)) {
                        $scope.filterListner[expId + ' ' + main] = status;
                        temp[object[main].id] = {
                            status: status,
                            subCatagory: setSubCatagoryList(object[main].subCatagory, status, expId, main)
                        }
                    }
                }
                return temp;

            }

            function setSubCatagoryList(object, status, expId, mainId) {
                var toreturn = {};
                for (var sub in object) {
                    if (object[sub]) {
                        toreturn[object[sub].id] = {
                            status: status
                        };
                        $scope.filterListner[expId + ' ' + mainId + ' ' + sub] = status;
                    }
                }
                return toreturn;
            }




            $scope.getDataDetails = function(object) {
                var temp = {};
                var pres = this.expenseConstant[object.expenseType];
                temp['expenseType'] = pres.name;
                pres = pres.data[object.mainCatagory];
                temp['mainCatagory'] = pres.name;
                pres = pres.subCatagory[object.subCatagory];
                temp['subCatagory'] = pres.name;
                temp['date'] = object.ondate;
                temp['id'] = object._id;
                return temp;

            }


            function checkIfPresent(index, object) {
                if (object[index])
                    return object[index];
                else
                    return false
            }




        }
    ])