angular.module('myApp').controller('homectr',function($scope,homefact,$http,$window){
      //Hometag
       $scope.activeMenu = 1;
      $scope.homeTag=function(id)
      {
       
         $scope.activeMenu = id;
        if(id===1)
        {
            $scope.supported_sites=false;
            $scope.how_to_use=false;
           
        }else {
             $scope.supported_sites=true;
              $scope.how_to_use=true;
            
        }
      };
        // Array format 
        $scope.arrformat=homefact.getFormat('video');
         $scope.youtube={
             url:'',//leave it empty
             domain:'',
             format:2//default should be 1.
         };
         //https://www.youtube.com/watch?v=As1pot091jU
         //https://soundcloud.com/sontungmtpofficial/khuonmatdangthuongremix
         //use watch to catchy url change 
         
         $scope.$watch("youtube.url",function(newValue){
            console.log(homefact.domain(newValue));
            $scope.youtube.domain=homefact.domain(newValue);
//            if($scope.youtube.domain==='soundcloud.com')
//            {
//                 $scope.arrformat=homefact.getFormat('mp3');
//                 //console.log($scope.arrformat[0]);
//            }else {
//                  $scope.arrformat=homefact.getFormat('video');
//            }
//             $scope.youtube.format=$scope.arrformat[1].id;//change to 0
         });
         
         //********************************************'
         
         //convert time to second.
        function hmsToSecondsOnly(str) {
            var p = str.split(':'),
                s = 0, m = 1;

            while (p.length > 0) {
                s += m * parseInt(p.pop(), 10);
                m *= 60;
            }

            return s;
        }
        // Get file name.
        function file_name(url)
        {
            homefact.fileName(url).then(function(response){
                console.log(response);
                  $scope.loading = false;
                  $scope.message = 'file name: '+response.data.data;
                  
                  $scope.msg=true;
                  $scope.youtube.name=response.data.data;
                 convert_youtube(youtube);
            });
            
        }
        // Client download.
        // tomorrow work.
        // Start check url
        
        function check_url(youtube) {
             $scope.loading = true;
               $scope.down=false;
             $scope.message = 'Get file name ...';
                $scope.msg=true;
               //var myFileName= file_name(youtube.url);
               //get file name
                homefact.fileName(youtube.url).then(function(response){
                  console.log(response);
                    $scope.msg=true;
                    $scope.youtube.name=response.data.data;
                    $scope.youtube.format=1;
                    console.log(youtube);
                   convert_youtube(youtube);
                    });
        }
       $scope.check_url=function(youtube) {
              //show loading
        $scope.loading = true;
          $scope.message = 'Check url...';
          $scope.msg=true;
        //hide donwload button, resulet before if any.
          $scope.down=false;
           console.log(youtube);  
           
            //step 1 check
        
                     $scope.videoInfo=homefact.getInfo(youtube.url).then(
                     function(response){
                         console.log(response.data);
                       
                         console.log(response.status);
                         console.log(response);
                         if(response.data.status===true)
                         {
                             console.log('Your url work!');
                             //empty input box.
                             console.log('null url');
                             $scope.youtube.url=null;
                             console.log(response.data);
                             console.log(hmsToSecondsOnly(response.data.data));
                             var duration=hmsToSecondsOnly(response.data.data);
                             if(duration>1200)
                             {
                                
                                  $scope.loading = false;
                                  $scope.message = 'Your video/audio is longer than 20 minutes. Too long for an online converter.';
                                  $scope.msg=true;
                             }else{
                                 console.log('video lentgh is ok');
                                  $scope.message = 'video/audio Lentgh is OK... Get file name ...';
                                  $scope.msg=true;
                                 //var myFileName= file_name(youtube.url);
                                 //get file name
                                  homefact.fileName(youtube.url).then(function(response){
                                    console.log(response);
                                      $scope.msg=true;
                                      $scope.youtube.name=response.data.data;
                                      console.log(youtube);
                                     convert_youtube(youtube);
                                });
                                 
                                  // convert
                                //  convert_youtube(youtube);
                             }
                             
                         }else {
                             console.log('your url not work!');
                                $scope.loading = false;
                                  $scope.message = 'your url not work!.';
                                  $scope.msg=true;
                             
                         }
                     }
            );
          // end then  
//  End check
};
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
                  console.log(response);
                   $window.location.href="play/2/"+response.data+'/dailymotion';//should be the video title
                 });
             }else {
                console.log('Not correct youtube url');
                $scope.checkurl_msg ='Not correct youtube url';
                  //check_url(youtube);
                 
             }
            
             
//  End check
};
// Download youtube use client.
function download_youtube_client(youtube)
{
     homefact.youtube_download(youtube).then(function(response){
              console.log(response.data);
             // console.log(response.data.url);
              console.log(response.data.download);            
               //  $scope.down=true;
                  $scope.result = response.data;
            $scope.message = response.data.data;
             $scope.msg=true;
            console.log($scope.message);
           var link = document.createElement("a");
            link.download = name;
            link.href = response.data.link;
            link.click();
          });
}
    //*********************************************************
    function convert_youtube(youtube)
    {
        
         $scope.message = 'Start Converting...';
           homefact.convert(youtube).then(
             function (response) {
            console.log(response.data);
            console.log(response.status);
            $scope.loading = false;
            console.log(response.data.status);
            if(response.data.status===true)
            {
                 console.log(response.data.download);            
                 $scope.down=true;
                 //Auto click the button.
                  $window.open(base_url+'download/get-file/'+response.data.location+'/'+response.data.id+'/'+response.data.format, '_blank');
            }
            $scope.result = response.data;
            $scope.message = response.data.data;
             $scope.msg=true;
            console.log($scope.message);
        },function(rejected){
            console.log('time out');
            $scope.loading = false;
            console.log(rejected);
             $scope.message = 'Sorry we cancel your request because it take too long. Maybe your target website is busy at the moments. Please try again later or try with other websites.';
              $scope.msg=true;
              console.log($scope.message);
        }    
        );// end then
    }
    //******************************** No longer in use ***********************
    $scope.converter = function (youtube) {
        //show loading
        $scope.loading = true;
        //hide donwload button, resulet before if any.
          $scope.down=false;
          $scope.msg=false;
        console.log(youtube);
       // return;
        // youtube format mp4 no need convert only download.
        if(youtube.domain==='youtube.com' && youtube.format===2)
        {
            console.log('donwload');
            
            
          homefact.check_client_download(youtube).then(function(response){
                console.log(response.data);
                if(response.data.link_status===200)
                {
                    console.log('download client');
                    download_youtube_client(youtube);
                }else {
                    console.log('cant download client Copyright video. Check length download server instead... wait...');
                }
                
          }); 
            
         
            
               $scope.loading = false;
        }else{
        
        //console.log(use.login(login));
        // console.log(homefact.convert(youtube));
        homefact.convert(youtube).then(
             function (response) {
            console.log(response.data);
            console.log(response.status);
            $scope.loading = false;
            console.log(response.data.status);
            if(response.data.status===true)
            {
                
                  console.log(response.data.download);            
                 $scope.down=true;
            }
          
            $scope.result = response.data;
            $scope.message = response.data.data;
             $scope.msg=true;
            console.log($scope.message);
           

        },function(rejected){
            console.log('time out');
            $scope.loading = false;
            console.log(rejected);
             $scope.message = 'Sorry we cancel your request because it take too long. Maybe your target website is busy at the moments. Please try again later or try with other websites.';
              $scope.msg=true;
              console.log($scope.message);
        } 
        );// end then
        }// end else convert
    };
  });