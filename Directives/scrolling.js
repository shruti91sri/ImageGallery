//Directive to check whether the user has scrolled or not
//If Yes then call the function in the controller
angular
.module('imageScroller')
.directive("scrolling", function() {
	return function(scope, elm, attr) {
		var raw = elm[0];	
		elm.bind('scroll', function() {
		  if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
		    scope.$apply(attr.scrolling);
		}
	});
};
});
