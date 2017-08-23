angular.module('myApp').controller('playctr',function($scope,homefact,$http,$window,ngProgressFactory, $timeout,$q){
        // Array format 
        $scope.arrformatv=homefact.getFormat('video');
        $scope.arrformatmp3=homefact.getFormat('mp3');
        //check url after click convert button.
        $scope.theButtonMp3=false;
        $scope.theButtonMp4=false;
        $scope.contained_progressbar = ngProgressFactory.createInstance();
        $scope.contained_progressbar.setParent(document.getElementById('demo_contained'));
        $scope.contained_progressbar.setAbsolute();
       // $scope.contained_progressbar.set(40);
       function start(){
        $scope.loading =true;
        $scope.contained_progressbar.setHeight('3px');
        $scope.contained_progressbar.setColor('green');
        $scope.contained_progressbar.start();
       // event.defaultPrevented;
       var id = setInterval(frame, 300);
       function frame() {
        if ($scope.contained_progressbar.status() >= 100 ) {
          clearInterval(id);
        } else {
          $scope.status = $scope.contained_progressbar.status().toFixed(0) + '%';
        }
      }
    }
    function finish() {
      $timeout(callAtTimeout, 10);
      $scope.contained_progressbar.complete();
        // event.defaultPrevented;
        $scope.status = 100 + '%';
      }
      function callAtTimeout() {
        $scope.loading =false;
      }
      $scope.resCancel = function() {
        console.log('Cancel request');
      }
// get video infomation.
$scope.check_url=function(data) {
  console.log(data);
          // $scope.buttonContainer =true;
          if(data==1){
            // disable button mp3
            $scope.theButtonMp3=true;
          }else{
           $scope.theButtonMp4=true;
         }
         start();
         $scope.msg=true;
            //hide donwload button, resulet before if any.
            $scope.down=false;
            var youtube = {
              id:myinit.youtube_id,
              url: myinit.url,
              website: myinit.website,
              name: myinit.name,
              format:data
            };
            console.log(youtube);
           // un comment this 
           convert_youtube(youtube);
         };
       // FUNCTION CONVER YOUTUBE
       function convert_youtube(youtube)
       {
         $scope.message = '';
         homefact.convert(youtube).then(
           function (response) {
            console.log(response.data);
            console.log(response.status);

            finish();
             //$scope.loading = false;
             console.log(response.data.status);
             if(response.data.status===true)
             {
                // console.log(response.data.download);  
                $scope.buttonContainer =false;          
                $scope.down=true;
                $scope.msg=false;
              }
              $scope.result = response.data;
              $scope.message = response.data.data;
              console.log($scope.message);
            },function(rejected){
              console.log('time out');
              $scope.loading = false;
              console.log(rejected);
              finish();
              $scope.message = 'Sorry we cancel your request because it take too long. Maybe your target website is busy at the moments. Please try again later or try with other websites.';
              $scope.msg=true;
              console.log($scope.message);
            }    
        );// end then
       }
     });