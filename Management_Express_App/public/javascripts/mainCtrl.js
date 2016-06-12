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
            otherwise({
                redirectTo: '/mainpage/'
            });
    }]);

app.controller('empCtrl', ['$scope', '$http', 'myService', function($scope, $http, myService) {

  // $scope.error = false;
  // $scope.incomplete = false; 
  $scope.reverse = false;
  $scope.busy = false;

  var temp;

  $scope.getNext = function() {
    console.log("getting next");
    myService.getNextEmp($scope);
  };

  $scope.getNext();

  $scope.getDirReports = function($scope) {
    console.log("getting dirReports");
    myService.getDirReports($scope);
  };

  $scope.sortBy = function(ref) {
    $scope.sortReference = ref;
    $scope.reverse = ($scope.sortReference === temp) ? !$scope.reverse : false;
    temp = $scope.sortReference;
  };
  
  $scope.deleteEmp = function(id){
    myService.deleteEmp(id, $scope);
    // myService.getEmp($scope);
  };

  // function getPageId(n) {
  //   return 'article-page-' + n;
  // }

  // function getDocumentHeight() {
  //   const body = document.body;
  //   const html = document.documentElement;
    
  //   return Math.max(
  //     body.scrollHeight, body.offsetHeight,
  //     html.clientHeight, html.scrollHeight, html.offsetHeight
  //   );
  // };

  // function getScrollTop() {
  //   return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  // }

  // function getEmpData() {
  //   const hash = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  //   const image = new Image;
  //   image.className = 'article-list__item__image article-list__item__image--loading';
  //   image.src = 'http://api.adorable.io/avatars/250/' + hash;
    
  //   image.onload = function() {
  //     image.classList.remove('article-list__item__image--loading');
  //   };
    
  //   return image;
  // }

  // function getArticle() {
  //   const articleImage = getEmpData();
  //   const article = document.createElement('article');
  //   article.className = 'article-list__item';
  //   article.appendChild(articleImage);
    
  //   return article;
  // }

  // function getArticlePage(page, articlesPerPage = 16) {
  //   const pageElement = document.createElement('div');
  //   pageElement.id = getPageId(page);
  //   pageElement.className = 'article-list__page';
    
  //   while (articlesPerPage--) {
  //     pageElement.appendChild(getArticle());
  //   }
    
  //   return pageElement;
  // }

  // function addPaginationPage(page) {
  //   const pageLink = document.createElement('a');
  //   pageLink.href = '#' + getPageId(page);
  //   pageLink.innerHTML = page;
    
  //   const listItem = document.createElement('li');
  //   listItem.className = 'article-list__pagination__item';
  //   listItem.appendChild(pageLink);
    
  //   articleListPagination.appendChild(listItem);
    
  //   if (page === 2) {
  //     articleListPagination.classList.remove('article-list__pagination--inactive');
  //   }
  // }

  // function fetchPage(page) {
  //   articleList.appendChild(getArticlePage(page));
  // }

  // function addPage(page) {
  //   fetchPage(page);
  //   addPaginationPage(page);
  // }

  // const articleList = document.getElementById('article-list');
  // const articleListPagination = document.getElementById('article-list-pagination');
  // let page = 0;

  // addPage(++page);

  // window.onscroll = function() {
  //   if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
  //   addPage(++page);
  // };

}]);

app.controller('createCtrl', function($scope, myService) {
  $scope.error = false;
  $scope.incomplete = true;

  $scope.createEmp = function(){
    console.log("createUser");
    console.log($scope);
    myService.updateEmp($scope);
  };

  // $scope.$watch('passw1',function() {myService.test($scope);});
  // $scope.$watch('passw2',function() {myService.test($scope);});
  // $scope.$watch('fName', function() {myService.test($scope);});
  // $scope.$watch('lName', function() {myService.test($scope);});

  $scope.getAvailableManager = function() {
    myService.getAvailableManager();
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
  console.log("in edit" +" " + $scope.id);
  console.log($scope);
    $scope.$watch('emps', function() {
            $scope.fName = $scope.emps.fName;
            $scope.lName = $scope.emps.lName;
            $scope.tittle = $scope.emps.tittle;
            $scope.age = $scope.emps.age;
            $scope.gender = $scope.emps.gender;
            $scope.manager = $scope.emps.manager;
            $scope.location = $scope.emps.location;
            $scope.homePhone = $scope.emps.hPhone;
            $scope.workPhone = $scope.emps.wPhone;
            $scope.cellPhone = $scope.emps.cPhone;
            $scope.email = $scope.emps.email;
            $scope.startDate = $scope.emps.startDate;
            $scope.profilePic = $scope.emps.profilePic;
    });
            // $scope.fName = "";
            // $scope.lName = "";
            // $scope.tittle = "";
            // $scope.age = "";
            // $scope.gender = "";
            // $scope.manager = "";
            // $scope.location = "";
            // $scope.homePhone = "";
            // $scope.workPhone = "";
            // $scope.cellPhone = "";
            // $scope.email = "";
            // $scope.startDate = ""
            // $scope.profilePic = "";

  $scope.editEmp = function () {
    console.log("in editUser");
    console.log($scope);

    myService.updateEmp($scope);
  }; 

  $scope.getAvailableManager = function() {
    myService.getAvailableManager();
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
