    app.controller('viewExpenseController', ['$scope', 'viewExpenseFactory', 'expenseConstant',
                function($scope, viewExpenseFactory, expenseConstant) {
                    var primaryStack = {};

                    $scope.expenceType = false;
                    $scope.displayTransactions = {};
                    $scope.presentStack = viewExpenseFactory.presentStack;
                    $scope.filterListner = {};
                    $scope.filterObject = {};
                    $scope.expenseConstant = expenseConstant;
                    createList(true);
                    //console.log($scope.filterObject );
                    $scope.$watch('date', function(val) {

                        if (val !== undefined) {
                            var pdate = val.split(',');
                            if (!isNaN(pdate[0]) && !isNaN(pdate[1])) {
                                viewExpenseFactory.getMonthlyData(pdate, function(response) {
                                    $scope.presentStack = response;
                                    $scope.displayTransactions = {};
                                    console.log($scope.filterObject);
                                   monthChanged($scope.filterObject[1],'expense',{eid: 1});
                                  //  monthChanged($scope.filterObject[2],'expense',{eid: 2});
                                  console.log($scope.displayTransactions );
                                });
                            }
                        }
                    });



                    $scope.onexpenseTypeChange = function(value) {

                        var eid, check;
                        eid = this.expenseType.id;

                        this.filterObject[eid]['status'] = value;
                        expenseAddToDisplay(eid,value)
                        $scope.filterObject[eid] = {
                                    status: value,
                                    data: setMainCatagoryList(
                                        $scope.expenseConstant[eid].data, value, eid)
                                };
                    }


                    function expenseAddToDisplay(eid,value)
                    {
                        check = checkIfPresent(eid, $scope.presentStack);
                        //console.log(value);
                        addOthrToDisplay(check,value,true);
                    }



                    $scope.onmainCatagoryChange = function(value) {

                        var eid, mid, check;
                        eid = this.$parent.expenseType.id;
                        mid = this.mainCatagory.id;
                        
                        //console.log(value);

                        this.filterObject[eid]['data'][mid]['status'] = value;
                            mainAddToDisplay(eid,mid,value)
                        var parent = checkSubFullfilled($scope.filterObject[eid]['data'])
                            this.filterObject[eid]['data']['status'] = parent;
                            this.filterListner[eid] = parent;
                            //setting the sub catagories 
                            this.filterObject[eid]['data'][mid]['subCatagory'] = setSubCatagoryList(
                            this.expenseConstant[eid]['data'][mid]['subCatagory'], value, eid, mid)
                    }

                    function mainAddToDisplay(eid,mid,value)
                    {
                        check = checkIfPresent(mid, checkIfPresent(eid, $scope.presentStack));
                        
                        addOthrToDisplay(check,value,false);
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
                        subAddToDisplay(sid,eid,mid,value);
                        var parent = checkSubFullfilled($scope.filterObject[eid]['data'][mid]['subCatagory'])
                            this.filterObject[eid]['data'][mid]['status'] = parent;
                            this.filterListner[eid + ' ' + mid] = parent;
                    }

                    function subAddToDisplay(sid,eid,mid,value)
                    {
                       check = checkIfPresent(sid, checkIfPresent(mid, checkIfPresent(eid, $scope.presentStack)));
                        
                        subDisplay(check,value);
                        
                    }



                    function addOthrToDisplay(object,status,call)
                    {
                        if (object !== false) {
                            for (var data in object) {
                                if (object[data]) {
                                    if(call===true)
                                    addOthrToDisplay(object[data],status,false)
                                    else
                                    subDisplay(object[data],status)
                                }
                            }
                        }                     
                    }


                    //function triggerLocalStorage(pdata,)

                    function monthChanged(object,fieldname,data)
                    {
                        console.log(object);

                        var pushDataHandler = {
                            'expense': 'mid',
                            'main': 'sid'
                        };

                        var dataSetObject = {
                            'expense':  object['data'],
                            'main': object['subCatagory'],
                            'sub': false
                        };

                        var fieldNameHandler = {
                            'expense': 'main',
                            'main': 'sub'
                        };
                        var checkState = dataSetObject[fieldname];
                        if(object.status===true)
                        {
                         var trueHandler = {
                            'expense':  expenseAddToDisplay(data.eid,true),
                            'main': mainAddToDisplay(data.eid,data.mid,true),
                            'sub': subAddToDisplay(data.sid,data.eid,data.mid,true)
                        };
                           return trueHandler[fieldname];
                        }
                        else if(checkState!==false)
                        {
                            for (var value in checkState) {
                                if (checkState[value]) {
                                    data[pushDataHandler[fieldname]] = value;
                                    monthChanged(checkState[value],fieldNameHandler[fieldname],data)

                                }
                            }
                        }
                    
                    }
                    function subDisplay(object,status)
                    {
                        console.log(object);
                        if (status === true && object !== false) {
                            for (var data in object) {
                                if (object[data]) {
                                    console.log(object[data]);
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
                                if($scope.expenseConstant[data])
                                {
                                $scope.filterListner[data] = true;
                                $scope.filterObject[data] = {
                                    status: true,
                                    data: setMainCatagoryList($scope.expenseConstant[data].data, true, data)
                                };
                            }
                            }
                            console.log($scope.filterObject);
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
                            temp['date'] = butifyDate(object.ondate);
                            return temp;

                        }

                        function butifyDate(data) {
                            var d = new Date(data);
                            return [d.getDate(), d.getMonth() + 1,
                                d.getFullYear()
                            ].join('/');
                        }

                        function checkIfPresent(index, object) {
                            if (object[index])
                                return object[index];
                            else
                                return false
                        }



                        function pushAllSubCatagory(subcatagory) {

                        }

                    }])