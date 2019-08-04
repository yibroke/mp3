angular.module('myApp').controller('homectr',function($scope,homefact,$http,$window,youtubefact){
//home search copy from searchCtr
$scope.ysearch = function(search_text){
  if(search_text==''|| search_text==null)
  {
    angular.element(youtube1).tooltip({ placement: 'bottom', trigger:'manual'});
    angular.element(youtube1).tooltip('show');
    angular.element(youtube1).focus();
        //alert(1);
        
      }else{
        var key = search_text.trim();
        var rep = key.replace(/ /g,'_');
        angular.element(youtube).tooltip('hide');
        youtubefact.make_url(key).then(function(res){
          console.log(res);
          window.location = '/keyword/'+rep+'.html';
        });
      }
    }
    // end 

    $scope.$watch("search_text", function (newValue, oldValue) {
      if(newValue!=''|| newValue!=null){
       angular.element(youtube1).tooltip('hide');
     }
   });
// end home search






$scope.youtube={
             url:'',//leave it empty
             domain:'',
             format:2//default should be 1.
           };


           $scope.$watch("youtube.url",function(newValue){
             angular.element(my_url).tooltip('hide');
             $scope.youtube.domain=homefact.domain(newValue);

           });

         //********************************************'
        

// CHECK URL REDIRECT. IMPORTANT.
$scope.check_url_redirect=function(youtube) {

 if((youtube.domain==='youtube.com')||(youtube.domain==='youtu.be'))
 {
  homefact.get_youtube_id_from_url(youtube).then(function(response){
    if(response.data!=='0')
    {
                           $window.location.href="play/1/"+response.data+'/youtube';//should be the video title

                         }else {
                          $scope.msg=true;
                          $scope.message = 'Wrong youtube url';
                        }

                      });
}else if(youtube.domain==='dailymotion.com')
{

 homefact.get_daily_id_from_url(youtube).then(function(response){
                   $window.location.href="play/2/"+response.data+'/dailymotion';//should be the video title.
                 });

}else if(youtube.domain==='soundcloud.com') {


                $window.location.href="play/3?url="+youtube.url;//should be the video title.

              // check_url(youtube);

            }else{

             $scope.checkurl_msg =true;
             angular.element(my_url).focus();
             angular.element(my_url).tooltip({ placement: 'bottom', trigger:'manual'});
             angular.element(my_url).tooltip('show');

                  //angular.element(my_url).tooltip({ placement: 'bottom', delay: {show: 10, hide: 100}});

                }


//  End check
};



});