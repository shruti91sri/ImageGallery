var myApp = angular.module('imageScroller');

myApp.service('ImageScrollerService' ,['$http','$q',function($http,$q){

  var self = this;
  //function to get data from the backend.
  self.getImages= function() {
    var deferred = $q.defer();	          
    var methodName="flickr.galleries.getPhotos";
    var user_api_key="abeef9c418702bd472f757841a4068a4";
    var user_gallery_id="72157671261543617";
        
    var requestParameters = {
    method : methodName,
    api_key : user_api_key,
    gallery_id : user_gallery_id,
    format : "json",
    nojsoncallback : '1'
    };

    var URL = "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=abeef9c418702bd472f757841a4068a4&gallery_id=72157671261543617&format=json&nojsoncallback=1";
    
    //tried using parameter  but there were some errors retrieving so as of now using the full URL
    //code is written for parameters above  
    $http({
    method: 'GET',
    url: URL,
    }).then(function (response) {      
        deferred.resolve(response.data);
      }, function (err) {        
        deferred.reject(err);
      });
    return deferred.promise;
  } 
	
}]);
