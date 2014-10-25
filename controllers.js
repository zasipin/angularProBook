var app = angular.module("exampleApp", []);
app.controller("simpleCtrl", function($scope){
	$scope.buttonEnabled = true;
	$scope.clickCounter = 0;
	
	$scope.handleClick = function(){
		$scope.clickCounter++;
	};
	$scope.$watch('buttonEnabled', function(newValue){
		$('#jqui button').button({
			disabled: !newValue
		});
	});
	
});

