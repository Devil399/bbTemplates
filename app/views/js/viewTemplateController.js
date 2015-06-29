bbTemplates.controller("viewTemplateController", function($scope, $http, $routeParams){
  var url = "/api/templates/" + $routeParams.id;
  $scope.url = url;
  $http.get(url).success(function(response){
    $scope.template = response;
  });
  $scope.delete = function(){
    $http.delete(url).success(function(response){
      alert(response.message);
    });
  }
});
