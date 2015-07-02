bbTemplates.controller("viewTemplateController", function($scope, $http, $routeParams, $window, $location){
  $('#modal-updateTemplate').modal('show');
  $('#modal-updateTemplate').on('hidden.bs.modal', function () {
    window.location.replace("/");
  });
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
        $window.location.reload();
        $location.path("/");
      }else{
        alert(response);
      }
    });
  }
  $scope.delete = function(){
    $http.delete(url).success(function(response){
      if(response.message === "Template deleted!"){
        $window.location.reload("/");
      }else{
        alert(response);
      }
    });
  }
});
