angular.module('myApp').factory('kwordsFact',function($http){
    var factory={};
    factory.kwords=function(){
        return $http.get('/kword/all-kwords');

    };
    factory.delete=function(name){
      return $http.get('/kword/delete/'+name);  
    };
    
  return factory;
});