bbTemplates.controller("viewTemplateController", function($scope, $http, $routeParams){
  var url = "/api/templates/" + $routeParams.id;
  console.log(url);
  $http.get(url).success(function(response){
    $scope.template = response;
  });
});
