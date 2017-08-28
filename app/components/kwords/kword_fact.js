angular.module('myApp').factory('kwordsFact',function($http){
    var factory={};
    factory.kwords=function(){
        return $http.get('/kword/all-kwords');

    };
    factory.delete=function(id){
      return $http.get('/kword/delete/'+id);  
    };
    
  return factory;
});