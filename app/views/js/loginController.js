bbTemplates.controller("loginController", function($scope, $http){
  $scope.error = false;
  $scope.errorValue = "Invalid username or password!";
  if(localStorage.getItem('token')){
    window.location.replace("/");
  }
  var url = "/authApi/login";
  $scope.login = function(){
    $http({
      method: 'POST',
      url: url,
      data: $.param({user: $scope.user}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    }).success(function(response){
      if(response.success === false){
        $scope.error = true;
        $scope.errorValue = response.message;
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
