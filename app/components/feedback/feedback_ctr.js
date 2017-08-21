angular.module('myApp').controller('feedback_ctr',function($scope,feedback_fact,$window){
    $scope.msg='';

//    Insert
    $scope.insert=function(feedback) {
       if(feedback.capcha!==feedback.typecap)
       {
           $scope.msg='Wrong Capcha!';
         
           return;
           
       }
        
 
      feedback_fact.insert(feedback).then(function(response){
          console.log(response.data);
          $scope.msg=response.data.data;
          $scope.feedback={
               capcha:feedback.capcha,
               email:'',
                name:'',
              content:''
          };
          
      });// end then.
    };
//  List feedback function reuseable
function list_feedback()
{
      feedback_fact.list().then(function(response){
          $scope.feedback_list=response.data;
      }) ;
}
//call list feedback function.
    list_feedback();
// Delete feedback

$scope.feedback_delete=function(id) {
  console.log('fire delete'+id);  
   var del = $window.confirm('Are you absolutely sure you want to delete?');
    if (del) {
        console.log('confirm');
        feedback_fact.delete(id).then(function(response){
           //call list feedback again. reload data
             list_feedback();
        });
    }// end if delete
};

   
    
});
