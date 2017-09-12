angular.module('myApp').directive('youtubeDuration',function($http){
    return {
        restrict: 'E',
        template:"<p><i class='fa fa-clock-o' aria-hidden='true'></i>{{duration}} <i class='fa fa-calendar' aria-hidden='true'></i>{{date}} | <i class='fa fa-eye' aria-hidden='true'></i> {{view}}</p> ",
        scope:{
          vid:'@vid',  
          website:'@wsite',  
          du:'@d',  
          pu:'@p',
          v:'@v'  
        },
        link:function($scope){
            console.log($scope.website);
            
            if($scope.website==='1')
            {
                     $http.get('https://www.googleapis.com/youtube/v3/videos', {
                        params: {
                            key: "AIzaSyAnR-0wQOsEwYF7U4CHQIMBoBzkRpx-0dw",
                            type: 'video',
                            id: $scope.vid,
                            part: 'snippet,contentDetails,statistics'       
                        }}).then(function(response){
                            var d = response.data.items[0].snippet.publishedAt; 
                            var t = response.data.items[0].contentDetails.duration;
                            var t = t.replace('PT',"").replace("H",":").replace('M',":").replace("S","");
                            $scope.duration=t; 
                            var date = new Date(d);
                            var myDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                            $scope.date=myDate; 
                            $scope.view=response.data.items[0].statistics.viewCount;
                        });
            }else {
                
                //convert second to h:m:s
                var date = new Date(null);
                date.setSeconds($scope.du); // specify value for SECONDS here
                $scope.duration=date.toISOString().substr(11, 8);
                unix_timestamp= parseInt($scope.pu);
                var a = new Date(unix_timestamp * 1000);
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var time = date + ' ' + month + ' ' + year ;
                 $scope.date=time;
                 $scope.view =$scope.v;
                
                
                
                
            }
            
       
            
        }
    };
    
    
});

