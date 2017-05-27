var app = angular.module("myContactApp", [])

app.controller("myContactController", ["$scope","$http", function($scope, $http){
	
	refresh()

	$scope.createContact = function(){
		$http.post("/createContact", $scope.contact)
			 .then(function(response){
			 	console.log(response.data)
			 	$scope.contact = {};
			 	refresh()
			 })
	}

	 function refresh(){
		$http.get("/getContacts")
			 .then(function(respone){
			 	console.log(respone)
			 	$scope.contactList = respone.data
			 })
	}

	$scope.editContact = function(id){
		$http.get("/getContactById/" + id)
			 .then(function(response){
			 	$scope.contact =response.data
			 })
	}

	$scope.updateContact= function(){
		$http.put("/updateContact/" + $scope.contact._id , $scope.contact)
			.then(function(response){
				refresh();
			})
	}

	$scope.removeContact = function(id){
		$http.delete("/removeContact/" + id)
			 .then(function(response){
				refresh();
			 	
			 })
	}

}])