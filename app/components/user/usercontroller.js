angular.module('myApp').controller('userctrl',function($scope,userFact,$window,homefact){  
 
    $scope.msg='';
    //****************LOGIN ***********************
         
         
    //*********************************************************
     $scope.login = {
         email: "",
         password:""
         };
         $scope.login_submit=function(login){
             console.log('fire login');
             console.log(login);
             userFact.login(login).then(function(response){
                console.log(response.data);
                if(response.data.success===true)
                {
                     $window.location.reload();
                     $scope.msg='Success...';
                }else{
                    $scope.myMessage=response.data.data;
                }
                
             });
         };
         //
           $scope.youtube={
             url:'',
             format:1
         };
           $scope.arrformat=homefact.getFormat();
             callDownload($scope.youtube.format);
    function callDownload(newValue) {
        homefact.get_download_format($scope.youtube.format).then(function (response) {
            // no need to call user.data, service handles this
            $scope.download = response;
            //console.log($scope.download);      
        });
    }
    //watch scople format
    $scope.$watch("youtube.format", function (newValue, oldValue) {
         callDownload(newValue);
    });
  });