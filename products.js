angular.module("exampleApp", [])
.constant("baseUrl", "https://www.parse.com/1/classes/Products/")
.config(function($httpProvider){
	$httpProvider.defaults.headers.common["X-Parse-Application-Id"] 
		= "2xqzKJgsVbIu077hwOAMbI8mUgAC0wzRMgPNzmPk";
	$httpProvider.defaults.headers.common["X-Parse-REST-API-Key"]
		= "7oZGdWcwON0xc3wSOqTN4nbJ6takA2SqJEBFCWdJ"; 	
	$httpProvider.interceptors.push(function(){
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
	});	
})
.controller("defaultCtrl", function($scope, $http, baseUrl){
	$scope.displayMode = 'list';
	$scope.currentProduct = null;

	$scope.listProducts = function(){
		/*$scope.products = [
			{ objectId: 0, name: "Dummy1", category: "Test", price: 1.25 },
			{ objectId: 1, name: "Dummy2", category: "Test", price: 2.45 },
			{ objectId: 2, name: "Dummy3", category: "Test", price: 4.25 },
		];*/
		$http.get(baseUrl).success(function(data){
			$scope.products = data;
		});
	};

	$scope.deleteProduct = function(product){
		//$scope.products.splice($scope.products.indexOf(product), 1);
		$http({
			method: "DELETE",
			url: baseUrl + product.objectId
		}).success(function(){
			$scope.products.splice($scope.products.indexOf(product), 1);
		});
	};

	$scope.createProduct = function(product){
		/*product.objectId = $scope.products.length;
		$scope.products.push(product);
		$scope.displayMode = "list";*/
		$http.post(baseUrl, product).success(function(response){
			product.objectId = response.objectId;
			$scope.products.push(product);
			$scope.displayMode = "list";
		})
	};

	$scope.updateProduct = function(product){
		/*for (var i = 0; i < $scope.products.length; i++) {
			if($scope.products[i].objectId == product.objectId){
				$scope.products[i] = product;
				break;
			}
		};
		$scope.displayMode = "list";*/
		var localProduct = angular.copy(product);
		delete localProduct.$$hashKey;
		delete localProduct.objectId;
		delete localProduct.createdAt;
		delete localProduct.updatedAt;
		console.log(localProduct);
		$http({
			url: baseUrl + product.objectId,
			method: "PUT",
			data: localProduct
		}).success(function(){
			for (var i = 0; i < $scope.products.length; i++){
				if($scope.products[i].objectId == product.objectId){
					$scope.products[i] = product;
					break;
				}
			}
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
		$scope.currentProduct = {};
		$scope.displayMode = "list";
	};

	$scope.listProducts();
})
;