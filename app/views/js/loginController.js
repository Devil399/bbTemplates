bbTemplates.controller("loginController", function($scope, $http){
  var url = "/authApi/login";
  $scope.login = function(){
    $http({
      method: 'POST',
      url: url,
      data: $.param({user: $scope.user}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    }).success(function(response){
      if(response.success === false){
        alert(JSON.stringify(response));
      }else if(response.success === true){
        localStorage.setItem('token', response.token);
        if(response.admin === true){
          localStorage.setItem('admin', true);
        }else{
          localStorage.setItem('admin', false);
        }
        window.location.replace("/");
      }
    });
  }
});
