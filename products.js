angular.module("exampleApp", ["increment", "ngResource"])
.constant("baseUrl", "https://api.parse.com/1/classes/Products/")
.config(function($httpProvider){
	$httpProvider.defaults.headers.common["X-Parse-Application-Id"] 
		= "2xqzKJgsVbIu077hwOAMbI8mUgAC0wzRMgPNzmPk";
	$httpProvider.defaults.headers.common["X-Parse-REST-API-Key"]
		= "7oZGdWcwON0xc3wSOqTN4nbJ6takA2SqJEBFCWdJ"; 	
	//$httpProvider.defaults.headers.common["Access-Control-Request-Method"]
	//= "GET";	
	/*$httpProvider.interceptors.push(function(){
		return {
			response: function(response){
				if(response.headers("content-type").indexOf("application/json") != -1){
					if(response.hasOwnProperty("data")
						&& response.data.hasOwnProperty("results")){
						response.data = response.data.results;
					}
				}
				return response;
			}
		};
	});	*/
})
.controller("defaultCtrl", function($scope, $http, $resource, baseUrl){
	$scope.displayMode = 'list';
	$scope.currentProduct = null;

	$scope.productsResource = $resource(baseUrl + ":id", {id: "@objectId"}, {
		query: {
			method: "GET", isArray: true, transformResponse: function(data, headers){
				return JSON.parse(data).results;
			}//, withCredentials: true
		},
		update: { method: "PUT" }
	});

	$scope.listProducts = function(){
		$scope.products = $scope.productsResource.query();
	};

	$scope.deleteProduct = function(product){
		product.$delete().then(function(){
			$scope.products.splice($scope.products.indexOf(product), 1);
		});
	};

	$scope.createProduct = function(product){
		var newProduct = new $scope.productsResource(product);
		newProduct.$save().then(function(response){
			$scope.products.push(angular.extend(newProduct, product));
			$scope.displayMode = "list";
		})
	};

	$scope.updateProduct = function(product){
		product.price = +product.price;
		angular.copy(product).$update().then(function(data){
			$scope.displayMode = "list";
		});
	};

	$scope.editOrCreateProduct = function(product){
		$scope.currentProduct = product ? angular.copy(product) : {};
		$scope.displayMode = "edit";
	};

	$scope.saveEdit = function(product){
		if(angular.isDefined(product.objectId)){
			$scope.updateProduct(product);
		} else {
			$scope.createProduct(product);
		}
	};

	$scope.cancelEdit = function(){
		if($scope.currentProduct && $scope.currentProduct.$get){
			$scope.currentProduct.$get();
		}
		$scope.currentProduct = {};
		$scope.displayMode = "list";
	};

	$scope.listProducts();
})
;