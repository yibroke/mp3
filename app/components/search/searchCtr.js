angular.module('myApp').controller('searchCtr',function($scope){  


    $scope.ysearch = function(search_text){
        if(search_text==''|| search_text==null)
        {
          angular.element(youtube).tooltip({ placement: 'bottom', trigger:'manual'});
          angular.element(youtube).tooltip('show');
          angular.element(youtube).focus();
        //alert(1);
        
    }else{
     console.log(search_text);
     angular.element(youtube).tooltip('hide');
      // youtubefact.make_url(search_text);
      var key = search_text.trim();
      var rep = key.replace(/ /g,'_');
      window.location = '/keyword/'+rep+'.html';
         //search/make_url
     }
 }

 $scope.$watch("search_text", function (newValue, oldValue) {
  if(newValue!=''|| newValue!=null){
     angular.element(youtube).tooltip('hide');
 }
});

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