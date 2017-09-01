angular.module('myApp').factory('kwordsFact',function($http){
    var factory={};
    factory.kwords=function(){
        return $http.get('/api/kwords/list');

    };
    factory.delete=function(id){
      return $http.delete('/api/kwords/delete/'+id);  
    };
    
  return factory;
});