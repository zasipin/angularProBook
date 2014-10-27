var app = angular.module("exampleApp", []);
app.controller("defaultCtrl", function($scope){
	$scope.products = [
		{ name: "Apples", category: "Fruit", price: 1.20, expiry: 10 },
		{ name: "Bananas", category: "Fruit", price: 2.42, expiry: 7 },
		{ name: "Pears", category: "Fruit", price: 2.02, expiry: 6 },
	];
	$scope.incrementPrices = function () {
		for (var i = 0; i < $scope.products.length; i++) {
			$scope.products[i].price++;
		}
	}
});

app.directive("unorderedList", function(){
	return {
		link: function(scope, element, attrs){
				scope.data = scope[attrs["unorderedList"]];
			},
		restrict: "A",
		templateUrl: //"tableTemplate.html"
		function(elem, attrs){
			return attrs["template"] == "table" ? 
				"tableTemplate.html" : "itemTemplate.html";
		} 
		,
		replace: true
	};
});

