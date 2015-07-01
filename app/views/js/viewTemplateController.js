bbTemplates.controller("viewTemplateController", function($scope, $http, $routeParams, $location){
  var url = "/api/templates/" + $routeParams.id;
  $http.get(url).success(function(response){
    $scope.template = response;
  });
  $scope.put = function(){
    $http({
      method: 'POST',
      url: url,
      data: $.param({template: $scope.template}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    }).success(function(response){
      if(response.message === "Template updated!"){
        $location.path("/");
      }else{
        alert(response);
      }
    });
  }
  $scope.delete = function(){
    $http.delete(url).success(function(response){
      if(response.message === "Template deleted!"){
        $location.path("/");
      }else{
        alert(response);
      }
    });
  }
});
