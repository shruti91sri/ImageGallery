 angular
.module('imageScroller')
.controller('ImageScrollerController',['$scope','$window','ImageScrollerService','$timeout' , function($scope,$window,ImageScrollerService,$timeout){
//Declare the array ,limit,error,loading and response to store data	
$scope.imageList=[];
$scope.response;
//Set initial limit to 20 . User can scroll upto 20 images at a time then next 20 will be loaded up-to 1000 images.
$scope.limit=20;
$scope.isError=false;
$scope.loading = true;	

//This func is called from ng-init from index.html. 
//So when the application gets bootstraped this function is called so that the image api can be called
$scope.renderImages = function(){
	getImagesList();
}
//Function to call the api . The code to call the api is wriiten in the ImageScrollerService
function getImagesList(){
	ImageScrollerService.getImages().then(
		function (response) {//sucess handler
			if(response.stat=="ok"){
				$scope.response =response.photos.photo;
				//after we get the response push the response in the array
				pushResponse();
				//once we get the response loading will stop
				$scope.loading=false; 
			}else{
				handleError(response.message);
			}                                       
    	},
    	function(error) {//Error Handling
        	handleError(error.message);
        }
    );  
}
//function to handle the error and loading
function handleError(error){
	$scope.loading=false; 
	$scope.isError=true;
	$scope.errorMessage =error;
}
//Function to push the items in the array for pagination/scrolling
function pushResponse(){
	for(var i=0;i< $scope.response.length;i++){
		$scope.imageList.push($scope.response[i]);	
	}
}
//Pagination function
//This func is called from the directive when the user has scrolled to the end of the page and we need to load more data 
$scope.loadMore = function() {
	//check if the array has less the 1000 items only then push more items in array and increase the limit by 20
	if($scope.limit<1000){
		pushResponse();	
		$scope.limit += 20;		
	}
}
 
}]);

