bbTemplates.controller("viewTemplateController", function($scope, $http, $routeParams, $window, $location){
  $('#modal-updateTemplate').modal('show');
  $('#modal-updateTemplate').on('hidden.bs.modal', function () {
    window.location.replace("/");
  });
  document.getElementById('selectedFile').onchange = function(e) {
    //JS to replace the current image on upload, will be saved when submitted
    var imageFile = this.files[0];
    var url = window.URL.createObjectURL(imageFile);
    document.getElementById('viewImg').src = url;
    console.log(url);
  }
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
        upload($routeParams.id, function(res){
          if(res === "Image uploaded!"){
            $window.location.reload();
            $location.path("/");
          }else{
            alert(res);
          }
        });
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

  var upload = function(id, callback){
    var file = $scope.myFile;
    var url = "/api/templates/" + id + "/image";
    var fd = new FormData();
    fd.append('file', file);
    $http.post(url, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    })
    .success(function(response){
      callback(response)
    });
  };
});
