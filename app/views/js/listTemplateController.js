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

  $scope.liked = function(id){
    //alert(id);
    var url = "/api/templates/" + id + "/like";
    cute(url, id);
  }
  $scope.disliked = function(id){
    //alert(id);
    var url = "/api/templates/" + id + "/dislike";
    cute(url, id);
  }

  var cute = function(url, id){
    alert(url + " " + id);
    $http.get(url).success(function(response){
      alert('response');
    });
  }

});
