app.service('myService', function ($http) {

	this.getEmp = function($scope) {
		console.log("in service getEmp");
		console.log($scope);
		$http.get("API/emp/")
          .then(function(response) {
              $scope.emps = response.data;
              // $scope.totalItems = $scope.Emp.length;
      	}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	this.getEmpById = function($scope) {
		console.log("in service getEmpById");
		console.log($scope);
		$http.get("API/emp/" + $scope.id)
          .then(function(response) {
              $scope.emps = response.data;
      	}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}
var count = 0;
	this.getNextEmp = function($scope) {
		console.log("in service getNextEmp");
		    if ($scope.busy) return;
    		$scope.busy = true;
		console.log($scope);

		var id = ($scope.emps != undefined) ? $scope.emps[$scope.emps.length - 1]._id : undefined;
							console.log(id);

		$http.get("API/emp/" + id + "/next/")
          .then(function(response) {
              $scope.emps = ($scope.emps != undefined) ? $scope.emps.concat(response.data) : response.data;		              
              $scope.busy = false;
              console.log(count++);
      	}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	this.getDirReports = function($scope) {
		console.log("in service getDirReports");
		console.log($scope);

		$http.get("API/emp/" + id + "/dirReports/")
          .then(function(response) {
              $scope.dirReports = response.data;
              // $scope.totalItems = $scope.Emp.length;
      	}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	this.getAvailableManager = function() {
		console.log("in service getAvailableManager");
		console.log($scope);
		$http.get("API/emp/" + id + "/managers/")
          .then(function(response) {
              $scope.availableManager = response.data;
      	}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	this.deleteEmp = function(id, $scope) {
		$http.delete("API/emp/" + id)
		   .then(function(err) {
		   		// error handling
		    }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	this.updateEmp = function($scope) {
		console.log("in service updateEmp");
		console.log($scope);
		var data = {
				_id: ($scope.id) ? $scope.id : undefined,
	            fName : $scope.fName, 
	            lName : $scope.lName, 
	            tittle : $scope.tittle,
	            age : $scope.age,
	            gender : $scope.gender,
	            manager : $scope.manager,
	            location : $scope.location,
	            homePhone : $scope.homePhone,
	            workPhone : $scope.workPhone,
	            cellPhone : $scope.cellPhone,
	            email : $scope.email,
	            profilePic : $scope.profilePic
			  };
		console.log(data);
		$http.put('API/emp/' + $scope.id, data)
			.then(function(response) {
				$scope.emps = response.data;
			}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};	

	this.test = function($scope) {
    	if ($scope.passw1 !== $scope.passw2) {
    		$scope.error = true;
    	} 
    	else {
    		$scope.error = false;
    	}
    	if ($scope.fName.length && $scope.lName.length && $scope.passw1.length && $scope.passw2.length) {
			$scope.incomplete = false;
    	}
  	};
});