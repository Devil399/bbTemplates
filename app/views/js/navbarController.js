bbTemplates.controller("navbarController", function($scope, $http){
  if(localStorage.getItem('token') === null){
    $scope.loggedIn = false;
  }else{
    $scope.loggedIn = true;
  }
  if(localStorage.getItem('admin') === 'true'){
    $scope.admin = true;
  }else{
    $scope.admin = false;
  }
  $scope.logout = function(){
    localStorage.clear();
    $scope.loggedIn = false;
    $scope.admin = false;
  }
});
