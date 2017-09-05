angular.module('myApp').controller('contactList', function($scope, contactFact){
	console.log(1);


// sort

$scope.$watch("pickSort", function(newValue,oldValue){
	 if(newValue!=''|| newValue!=null){
	 	console.log(newValue);
	 	$scope.sortKey =newValue.id;
	 	$scope.reverse =!$scope.reverse;

	 }
})



// $scope.listPerPage =[2,4,6,8,9];
$scope.listPerPage =[5,10,20,30,50,100];
$scope.listSort =[
{id:'_id' , value:'Old First'},
{id:'_id', value:'New First'},
{id:'Pending', value:'peding'},
{id:'Solve', value:'Solve'},
{id:'Reference', value:'Reference'}
];
 $scope.pickSort= {id: '_id', value: 'Old First'} //This sets the default value of the select in the ui
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
 	list();
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
			list();
			$scope.contact = {
				ids: []
			};

		})
	}


	list();
	function list(){
		contactFact.list().then(function(res){
			$scope.list = res.data;
			console.log(res);
		});
	}
	// delete
	$scope.delete = function(id){
		contactFact.delete(id).then(function(res){
			console.log(1);
			list();
		})
	}
})