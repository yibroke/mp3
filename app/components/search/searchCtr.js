angular.module('myApp').controller('searchCtr',function($scope){  
    	$scope.myglyphicon = "glyphicon-search";

 $scope.searchbox_hide = function() {
    $scope.logo= !$scope.logo;
    if($scope.logo==true){
    	
    	// dipaly delete search bar.
    		$scope.myglyphicon = "glyphicon-remove";
    	
    }else{
    
    	
    	$scope.myglyphicon = "glyphicon-search";
    }
}


});
// if you want show -hide the logo just make ng-hide"logo" in the logo div