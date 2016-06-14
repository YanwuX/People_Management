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
              if($scope.emps.manager == 'not assigned') return;

              	$http.get("API/emp/" + $scope.emps.manager)
		          .then(function(response) {
		              $scope.emps.manager = response.data;
		              if(response.data != undefined) $scope.hasManager = true;
		      	}, function errorCallback(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});

      	}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	this.getNextEmp = function($scope) {
		console.log("in service getNextEmp");
		if ($scope.busy) return;
    		$scope.busy = true;
		console.log($scope);

		var id = ($scope.emps != undefined) ? $scope.emps[$scope.emps.length - 1]._id : undefined;

		$http.get("API/emp/" + id + "/next/")
          .then(function(response) {
          	  if(response.data.length < 10) $scope.done = true;
              $scope.emps = ($scope.emps != undefined) ? $scope.emps.concat(response.data) : response.data;
              $scope.busy = false;

              $scope.emps.forEach(function(emp) {
              	$http.get("API/emp/" + emp._id + "/dirReports/")
		          .then(function(response) {
		           			emp.dirReports = response.data;
		      	}, function errorCallback(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
              });

      	}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	this.getDirReports = function($scope) {
		console.log("in service getDirReports");
		console.log($scope);

		$http.get("API/emp/" + $scope.id + "/dirReports/")
          .then(function(response) {
              $scope.dirReports = response.data;
              
              $scope.dirReports.forEach(function(emp) {
              	$http.get("API/emp/" + emp._id + "/dirReports/")
		          .then(function(response) {
		           			emp.dirReports = response.data;
		      	}, function errorCallback(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
              });

      	}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	this.getAvailableManager = function(id, $scope) {
		console.log("in service getAvailableManager");
		console.log($scope);
		$http.get("API/emp/" + id + "/managers/")
          .then(function(response) {
              $scope.availableManagers = response.data;
      	}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	this.deleteEmp = function(id) {
		console.log("in service deleteEmp");
		console.log(id);

		$http.delete("API/emp/" + id)
		   .then(function(response) {
		   		console.log(response);
		   		// error handling

		   		$http.get("API/emp/" + id + "/dirReports/")
		          .then(function(response) {
		              response.data.forEach(function(emp) {
		              	var updates = { manager : "not assigned" };
		              	console.log(updates);
		              	$http.put('API/emp/' + emp._id, updates)
							.then(function(response) {
								console.log("updated dirReports employees");
							}, function errorCallback(response) {
						    // called asynchronously if an error occurs
						    // or server returns response with an error status.
						});
		              });

		      	}, function errorCallback(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});

		    }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

	this.updateEmp = function($scope) {
		console.log("in service updateEmp");
		console.log($scope);

		var data = {
				// _id: ($scope.id) ? $scope.id : undefined,
	            fName : $scope.emps.fName, 
	            lName : $scope.emps.lName, 
	            tittle : $scope.emps.tittle,
	            age : $scope.emps.age,
	            gender : $scope.emps.gender,
	            manager : $scope.emps.manager,
	            location : $scope.emps.location,
	            homePhone : $scope.emps.homePhone,
	            workPhone : $scope.emps.workPhone,
	            cellPhone : $scope.emps.cellPhone,
	            email : $scope.emps.email,
	            profilePic : $scope.emps.profilePic
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

    this.upLoadImg = function(img, id, $scope) {
        var formData = new FormData();
        formData.append("file", img);
        var url = 'IMG/upload/' + id;

        var data = { profilePic : id };
        console.log('in service upLoadImg');
        console.log(data);
		$http.put('API/emp/' + id, data)
			.then(function(response) {
				$scope.emps.profilePic = response.data;
			}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

        $http.post(url, formData, {
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
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