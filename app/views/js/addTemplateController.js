bbTemplates.controller("addTemplateController", function($scope, $http, $window, $location){
  $('#modal-addNewTemplate').modal('show');
  $('#modal-addNewTemplate').on('hidden.bs.modal', function () {
    window.location.replace("/");
  });
  var url = "/api/templates";
  $scope.post = function(){
    $http({
      method: 'POST',
      url: url,
      data: $.param({template: $scope.template}),
      headers: {'x-access-token': localStorage.getItem('token'), 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    }).success(function(response){
      if(response.message === "Template created!"){
        upload(response.id, function(res){
          if(res === "Image uploaded!"){
            $window.location.reload();
            $location.path("/");
          }else{
            alert(JSON.stringify(res));
          }
        });
      }else{
        alert(JSON.stringify(response));
      }
    });
  };

  var upload = function(id, callback){
    var file = $scope.myFile;
    var url = "/api/templates/" + id + "/image";
    var fd = new FormData();
    fd.append('file', file);
    $http.post(url, fd, {
        transformRequest: angular.identity,
        headers: {'x-access-token': localStorage.getItem('token'), 'Content-Type': undefined}
    })
    .success(function(response){
      callback(response)
    });
  };
});
