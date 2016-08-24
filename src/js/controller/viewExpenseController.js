	app.controller('viewExpenseController', ['$scope','viewExpenseFactory','expenseConstant',
     function($scope,viewExpenseFactory,expenseConstant){
        var primaryStack={};

        $scope.expenceType=false;
        $scope.displayTransactions = {};
        $scope.presentStack = viewExpenseFactory.presentStack;
        $scope.filterListner = {};
        $scope.filterObject = {};
		$scope.$watch('date', function(val) {
            $scope.expenseConstant = expenseConstant;

                createList();
        if(val!==undefined)
        {
            var pdate=val.split(',');
        	if(!isNaN(pdate[0]) && !isNaN(pdate[1]))
        	{
        		viewExpenseFactory.getMonthlyData(pdate,function(response)
                    {
                     $scope.presentStack = response;
                     console.log($scope.presentStack);
                    });
        	}
        }
    });


        $scope.onexpenseTypeChange = function(value)
        {
            //this.$parent.mainCatagory
            console.log($scope);
            var eid,mid,sid,check;
                eid = this.expenseType.id;

                mid = this.mainCatagory.id;

        }



        $scope.onmainCatagoryChange = function(value)
        {

                var eid,mid,sid,check;
                eid = this.$parent.expenseType.id;
                mid = this.mainCatagory.id;
               // console.log(eid+mid+sid);
               // console.log($scope.filterListner);
                check = checkIfPresent(mid,checkIfPresent(eid,this.presentStack));
                this.filterObject[eid]['data'][mid]['subCatagory'][sid]['status']=value;
            //console.log(value);
                checkMainFullfilled(eid,mid);


        }


        $scope.onsubCatagoryChange = function(value)
        {
            //console.log(this.$parent.mainCatagory);
            //$scope.scopeC[this.subCatagory.id] = false;
            //console.log($scope.filterListner);
                var eid,mid,sid,check;
                eid = this.$parent.$parent.expenseType.id;
                mid = this.$parent.mainCatagory.id;
                sid = this.subCatagory.id;
               // console.log(eid+mid+sid);
               // console.log($scope.filterListner);
                check = checkIfPresent(sid,checkIfPresent(mid,checkIfPresent(eid,this.presentStack)));
                this.filterObject[eid]['data'][mid]['subCatagory'][sid]['status']=value;
            //console.log(value);
                checkMainFullfilled(eid,mid);
                if(value===true&&check!==false)
                {
                   for(var data in check)
                   {
                     if ({}.hasOwnProperty.call(check, data)) {
                    this.displayTransactions[data]=check[data];
                   }
                }
               }
               else
               {
                    for(var data in check)
                   {
                    if ({}.hasOwnProperty.call(check, data)) {
                     delete this.displayTransactions[data];
                 }
                   }
               }
        }
        
        function  checkMainFullfilled(eid,mid)
        {
            var check=true;
            var tocheck = $scope.filterObject[eid]['data'][mid]['subCatagory'];

            for(var val in tocheck)
            {
                if ({}.hasOwnProperty.call(foo, key)) {
                if(tocheck[val].status===false)
                    check = false;
            }
            if(check===true)
            {
                $scope.filterObject[eid]['data'][mid]['status'];
                $scope.filterListner[eid+' '+mid]=true;
            }

        }

        function createList()
        {
            //console.log($scope.expenseConstant);
            for (var data in $scope.expenseConstant)
            {

                $scope.filterObject[$scope.expenseConstant[data].id] = {status: false, 
                    data: setMainCatagoryList($scope.expenseConstant[data].data,false,data)};           
            }
            console.log($scope.filterObject);
        }

        function setMainCatagoryList(object,status,expId)
        {
            var temp = {};
            for(var main in object)
            {
                 if ({}.hasOwnProperty.call(check, data)) {
                $scope.filterListner[expId +' '+ main] = status;
                temp[object[main].id] = {status: status, 
                    subCatagory: setSubCatagoryList(object[main].subCatagory,status,expId,main)}
                }
            }
            return temp;

        }

        function setSubCatagoryList(object,status,expId,mainId)
            {
                var toreturn = {};
                for(var sub in object)
                {
                    toreturn[object[sub].id] = {status: status};
                    $scope.filterListner[expId +' '+ mainId+' '+ sub] = status;
                }
                return toreturn;
            }


        function toggleSubCatagory(object,state)
        {
            if(state===true)
            {
                for(var insertData in object)
                   {
                    $scope.displayTransactions[insertData]=check[insertData];
                   }
            }
            else
            {
                 for(var deleteData in object)
                   {
                    delete $scope.displayTransactions[deleteData];
                   }
            }
        }

        function toggleMainCatagory(object,state)
        {
                 for(var newMain in object)
                   {
                    toggleSubCatagory(newMain,state);
                   }
        }
        function toggleExpenseType(object,state)
        {
                 for(var newtype in object)
                   {
                    toggleSubCatagory(newtype,state);
                   }
        }

        $scope.getDataDetails = function(object)
        {
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

        function butifyDate(data)
        {
             var d = new Date(data);
            return [d.getDate(), d.getMonth()+1,
             d.getFullYear()].join('/');
        }

        function checkIfPresent(index,object)
        {
            if(object[index])
                return object[index];
            else 
                return false
        }



        function pushAllSubCatagory(subcatagory)
        {

        }

	}])			