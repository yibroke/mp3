angular.module('myApp').factory('kwordsFact',function($http){
    var factory={};
    factory.kwords=function(){
        return $http.get(base_url+'kwords/all-kwords');
    };
    factory.delete=function(name){
      return $http.post(base_url+'kwords/delete/',name);  
    };
    
  return factory;
});