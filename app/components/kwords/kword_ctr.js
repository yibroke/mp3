angular.module('myApp').controller('kwordsCtr',function($scope,kwordsFact){  
  
    kwordsFact.kwords().then(function(response){
      
        $scope.kwords=response.data;
     });
     $scope.delete=function(name)
     {
        console.log(name);
         kwordsFact.delete(name).then(function(res){
            console.log(res.data); 
            if(res.data.n===1)
            {
               kwordsFact.kwords().then(function(response){
      
                    $scope.kwords=response.data;
                });  
            }else {
                alert('error');
            }
         });
     };
  
   
  });

