angular.module('myApp').controller('contactCtr', function($scope, contactFact){

// if not defind here it will coz underfined error.
$scope.cont ={ email:'', message:''};
	$scope.contact = function(cont){
		console.log(cont);
		if(cont.message==''|| cont.message==null)
		{
			angular.element(contact_message).tooltip({ placement: 'bottom', trigger:'manual'});
			angular.element(contact_message).tooltip('show');
			angular.element(contact_message).focus();
        //alert(1);
    }else{
    	contactFact.insert(cont).then(function(res){
    		console.log(res);
    		$scope.cont ={
    			email:'',
    			message:''
    		}
			// hide modal.
			angular.element('#modalContact').modal('hide');
		})
    }
}
})