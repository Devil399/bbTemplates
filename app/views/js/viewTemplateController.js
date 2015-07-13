bbTemplates.controller("viewTemplateController", function($scope, $http, $routeParams, $window, $location){
  if(localStorage.getItem('admin') === 'false' || localStorage.getItem('token') === null){
    window.location.replace("/");
  }
  $('#modal-updateTemplate').modal('show');
  $('#modal-updateTemplate').on('hidden.bs.modal', function () {
    window.location.replace("/");
  });
  var url = "/api/templates/" + $routeParams.id;
  $http.get(url).success(function(response){
    if(response.success){
      $scope.template = response.templates;
    }else{
      window.location.replace("/");
    }
  });
  $scope.put = function(){
    $http({
      method: 'POST',
      url: url,
      data: $.param({template: $scope.template}),
      headers: {'x-access-token': localStorage.getItem('token'), 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    }).success(function(response){
      if(response.message === "Template updated!"){
        $window.location.reload();
        $location.path("/");
      }else{
        alert(JSON.stringify(response));
      }
    });
  }
  $scope.delete = function(){
    $http.delete(url,{
      headers: {'x-access-token': localStorage.getItem('token')}
    }).success(function(response){
      if(response.message === "Template deleted!"){
        $window.location.reload();
        $location.path("/");
      }else{
        alert(JSON.stringify(response));
      }
    });
  }
});
