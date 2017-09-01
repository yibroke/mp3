angular.module('myApp').controller('contactList', function($scope, contactFact){
	console.log(1);
	 $scope.ids="";
	console.log($scope.ids);

	$scope.$watch("ids", function(newValue, oldValue){
		if(newValue!=oldValue)
		{
			console.log(newValue);
		}
	});

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