angular.module('myApp').factory('feedback_fact',function($http){
//    factory object for return
   var factory={};
//   Insert
   factory.insert=function(feedback){
       return $http.post(base_url+'feedback/insert',feedback);
   };
//   List
   factory.list=function() {
      return $http.get(base_url+'feedback/list-service');  
   };
//   Delete
factory.delete=function(id){
  return $http.delete(base_url+'feedback/delete/'+id);  
};
   return factory;
});