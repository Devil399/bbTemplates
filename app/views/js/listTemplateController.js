bbTemplates.controller("listTemplateController", function($scope, $http){
  if(localStorage.getItem('admin') === 'true'){
    $scope.admin = true;
  }else{
    $scope.admin = false;
  }

  var url = "/api/templates";
  $http.get(url).success(function(response){
    $scope.templates = response;
    $scope.templates.forEach(function(template){
      template.createdOn = template.createdOn.replace(/T.*$/,'');
    });
  });

  $scope.filterBy = '-likes';
  $scope.filter = function(filterBy){
    $scope.filterBy = filterBy;
  }

  $scope.like = function(id){
    $http.get(url + "/" + id + "/like", {
      headers: {'x-access-token': localStorage.getItem('token')}
    }).success(function(response){
      if(response.success){
        $scope.templates.forEach(function(template){
          if(template._id === id){
            template.likes = response.likes;
            template.likedBy = response.likedBy;
          }
        });
      }else{
        window.location.replace("/login.html");
      }
    });
  }

  $scope.dislike = function(id){
    $http.get(url + "/" + id + "/dislike", {
      headers: {'x-access-token': localStorage.getItem('token')}
    }).success(function(response){
      if(response.success){
        $scope.templates.forEach(function(template){
          if(template._id === id){
            template.dislikes = response.dislikes;
            template.dislikedBy = response.dislikedBy;
          }
        });
      }else{
        window.location.replace("/login.html");
      }
    });
  }
});
