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
	factory.deleteArray = function(data){
		console.log(data);
		var d={0:'fdfds',1:'fdsf'};
		return $http.post('/api/contact/delete_array/', data);
	}
	factory.changeStatus = function(data){
		
		return $http.post('/api/contact/change_status', data);
	}
	return factory;
})