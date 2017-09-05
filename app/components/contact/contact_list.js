angular.module('myApp').controller('contactList', function($scope, contactFact){
	console.log(1);


// sort

$scope.$watch("pickSort", function(newValue,oldValue){
	 if(newValue!=''|| newValue!=null){
	 	console.log(newValue);
	 	list(newValue.id,$scope.pickQuery.id);

	 }
})
// query
$scope.$watch("pickQuery", function(newValue,oldValue){
	 if(newValue!=''|| newValue!=null){
	 	console.log(newValue);
	 	list($scope.pickSort.id,newValue.id);

	 }
})


// $scope.listPerPage =[2,4,6,8,9];
$scope.listPerPage =[5,10,20,30,50,100];
$scope.listSort =[
{id:'new', value:'New First'},
{id:'old' , value:'Old First'}
];
$scope.listQuery =[
{id:'all', value:'All'},
{id:'pending', value:'Pending'},
{id:'solve' , value:'Solve'},
{id:'reference', value:'Reference'}
];
$scope.pickQuery ={id:'all',value:'All'};

 $scope.pickSort= {id: 'new', value: 'New First'} //This sets the default value of the select in the ui
//need this.
$scope.contact = {
	ids: []
};
// change status

$scope.status ='Pending';
$scope.changeStatus= function(data){
 console.log(data);
 console.log($scope.contact.ids);
// convert array to obj
	var obj = $scope.contact.ids.reduce(function(acc, cur, i) {
			acc[i] = cur;
			return acc;
		}, {});
	obj.status = data;

		console.log(obj);
	// push status to obj
 contactFact.changeStatus(obj).then(function(res){
 	console.log(res.data);
 	list($scope.pickSort.id,$scope.pickQuery.id);
			$scope.contact = {
				ids: []
			};
 })

}
// end change status

$scope.deleteArray = function(data){
	console.log(data);
		// convert array data to object.
		var obj = data.reduce(function(acc, cur, i) {
			acc[i] = cur;
			return acc;
		}, {});
		console.log(obj);
		//delete array.
		contactFact.deleteArray(obj).then(function(res){
			console.log(res);
			list($scope.pickSort.id,$scope.pickQuery.id);
			$scope.contact = {
				ids: []
			};

		})
	}


	list('new','all');
	function list(sort,query){
		contactFact.list(sort,query).then(function(res){
			$scope.list = res.data;
			console.log(res);
		});
	}
	// delete
	$scope.delete = function(id){
		contactFact.delete(id).then(function(res){
			console.log(1);
			list('new');
		})
	}
})