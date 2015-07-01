bbTemplates.controller("addTemplateController", function($scope, $http, $location){
  
  var url = "/api/templates/";
  $scope.url = url;
  $scope.post = function(){
    $http({
      method: 'POST',
      url: url,
      data: $.param({template: $scope.template}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    }).success(function(response){
      if(response.message === "Template created!"){
        $location.path("/");
      }else{
        alert(response);
      }
    });
  };
});
