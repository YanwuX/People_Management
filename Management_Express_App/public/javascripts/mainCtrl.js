app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/mainpage/', {
                templateUrl: 'emp.html',
                controller: 'empCtrl'
            }).
            when('/edit/:id', {
                templateUrl: 'edit.html',
                controller: 'editCtrl'
            }).
            when('/create/', {
                templateUrl: 'create.html',
                controller: 'createCtrl'
            }).
            when('/dircReports/:id', {
                templateUrl: 'dircReports.html',
                controller: 'dircReportsCtrl'
            }).
            otherwise({
                redirectTo: '/mainpage/'
            });
    }]);

app.controller('empCtrl', ['$scope', 'myService', function($scope, myService) {

  $scope.reverse = false;
  $scope.busy = false;
  $scope.done = false;

  var temp;

  $scope.getNext = function() {
    console.log("getting next");
    myService.getNextEmp($scope);
  };

  $scope.getNext();

  $scope.getDirReports = function(id) {
    console.log("getting dirReports");
    myService.getDirReports(id);
  };

  $scope.sortBy = function(ref) {
    $scope.sortReference = ref;
    $scope.reverse = ($scope.sortReference === temp) ? !$scope.reverse : false;
    temp = $scope.sortReference;
  };
}]);

app.controller('createCtrl', function($scope, myService) {

  $scope.createEmp = function(){
    console.log("createUser");
    myService.updateEmp($scope);
  };

  $scope.getAvailableManager = function(id) {
    myService.getAvailableManager(id, $scope);
  };

  $scope.partialDownloadLink = 'http://localhost:8888/download?filename=';
  $scope.filename = '';

  $scope.uploadFile = function() {
      $scope.processQueue();
  };

  $scope.reset = function() {
      $scope.resetDropzone();
  };

});

app.controller('editCtrl', function($scope, $routeParams, myService) {
  $scope.id = $routeParams.id;
  myService.getEmpById($scope);

  $scope.hasManager = false;

  $scope.editEmp = function () {
    console.log("in editUser");
    console.log($scope);

    myService.updateEmp($scope);
  }; 

  $scope.getAvailableManager = function(id) {
    console.log('in ctrl getAvailableManager' + id);
    myService.getAvailableManager(id, $scope);
  };

  $scope.deleteEmp = function(){
    console.log("in deleteEmp");
    myService.deleteEmp($scope.emps._id);
  };


  $scope.partialDownloadLink = 'http://localhost:8888/download?filename=';
  $scope.filename = '';

  $scope.uploadFile = function() {
      $scope.processQueue();
  };

  $scope.reset = function() {
      $scope.resetDropzone();
  };

});

app.controller('dircReportsCtrl', function($scope, $routeParams, myService) {
  $scope.id = $routeParams.id;

  $scope.reverse = false;
  $scope.busy = false;
  $scope.done = false;

  var temp;

  // $scope.getNext = function() {
  //   console.log("getting next");
  //   myService.getNextEmp($scope);
  // };

  $scope.getDirReports = function() {
    console.log("getting dirReports");
    console.log($scope.id);
    myService.getDirReports($scope);
  };
  
  $scope.getDirReports();

  $scope.sortBy = function(ref) {
    $scope.sortReference = ref;
    $scope.reverse = ($scope.sortReference === temp) ? !$scope.reverse : false;
    temp = $scope.sortReference;
  };
});