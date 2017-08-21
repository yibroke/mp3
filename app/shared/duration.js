angular.module('myApp').directive('duration',function($http){
    return {
        restrict: 'E',
        template:"[{value | secondsToDateTime | date:'HH:mm:ss' }]",
        scope:{
          value:'@value' 
        },
        link:function($scope){
            console.log($scope.value);
        }
    };
    
    
});