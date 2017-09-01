angular.module('myApp').factory('contactFact', function($http){
	var factory ={};
	factory.insert = function(data){
		return $http.post('/api/contact/insert', data);
	}
	factory.list = function(){
		return $http.get('/api/contact/list');
	}
	factory.delete = function(id){
		return $http.delete('/api/contact/delete/'+id);
	}
	return factory;
})