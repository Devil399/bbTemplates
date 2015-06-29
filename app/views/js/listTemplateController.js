bbTemplates.controller("listTemplateController", function($scope, $http){
  var url = "/api/templates";
  $http.get(url).success(function(response){
    $scope.templates = response;
  });
});
