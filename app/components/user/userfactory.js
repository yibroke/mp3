angular.module('myApp').factory('userFact',function($http){
    var factory={};
    factory.login=function(login){
      //console.log(login);  
//      return login;
        return $http.post(base_url+'user/login_validation',login);
    };
    factory.kwords=function(){
        return $http.get(base_url+'kwords/all-kwords');
    };
    
  return factory;
});