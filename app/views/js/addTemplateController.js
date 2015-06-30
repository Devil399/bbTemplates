bbTemplates.controller("addTemplateController", function($scope, $http, $location){
  $scope.post = function(){
    $http({
      method: 'POST',
      url: "/api/templates",
      data: $.param({template: $scope.template}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    }).success(function(response){
      if(response.message === "Template created!"){
        $location.path("/#/listTemplate");
      }else{
        alert(response.message);
      }
    });
  };
});
