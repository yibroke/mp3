angular.module('myApp').controller('kwordsCtr',function($scope,kwordsFact){  
  
    kwordsFact.kwords().then(function(response){
      
        $scope.kwords=response.data;
     });
     $scope.delete=function(name)
     {
         kwordsFact.delete(name).then(function(res){
            console.log(res.data); 
            if(res.data==='1')
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

