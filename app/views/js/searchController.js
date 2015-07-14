bbTemplates.controller("searchController", function($scope, $http){
  if(localStorage.getItem('admin') === 'false' || localStorage.getItem('token') === null){
    window.location.replace("/");
  }
  var url = "/api/templates";


  $http.get(url).success(function(response){
    $scope.templates = response;
    $scope.templates.forEach(function(template){
      template.createdOn = template.createdOn.replace(/T.*$/,'');
    });

    $('#searchTable').DataTable({
      bDestroy: true,
      data: $scope.templates,
      columns: [
          { data: 'name' },
          { data: 'price' },
          { data: 'url' },
          { data: 'createdBy' },
          { data: 'createdOn' },
          { data: 'likes' },
          { data: 'dislikes' }
      ],
      dom: 'T<"clear">lfrtip',
      tableTools: {
          "sSwfPath": "./libs/dataTables/extensions/TableTools/swf/copy_csv_xls_pdf.swf"
      }
    });
  });

  auto_comp = function(name, urlAuto, createdBy){
    
    if(name){
      name =  document.getElementById('srch-name').value;
      complete('name', name)
    }
    if(urlAuto) urlAuto = document.getElementById('srch-url').value;
    if(createdBy) createdBy = document.getElementById('srch-by').value;
  }

  complete = function(attr, val){
    $http({
      method: 'POST',
      url: "/api/templates/search",
      data: $.param({template: $scope.template}),
      headers: {'x-access-token': localStorage.getItem('token'), 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    }).success(function(response){
        var nameArray = [];
        for(i=0; i<response.length; i++){
          nameArray.push(response[i].name);
        }
        $("#srch-name").autocomplete({
            source : nameArray
        });

    });
    
  };

  url = "/api/templates";
  $scope.search = function(){
    $http({
      method: 'POST',
      url: url + "/search",
      data: $.param({template: $scope.template}),
      headers: {'x-access-token': localStorage.getItem('token'), 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    }).success(function(response){
      console.log(response);
      $scope.templates = response;
      $scope.templates.forEach(function(template){
        template.createdOn = template.createdOn.replace(/T.*$/,'');
      });

      $("#searchTable").dataTable().fnDestroy();

      $('#searchTable').DataTable({
        bDestroy: true,
        data: $scope.templates,
        columns: [
            { data: 'name' },
            { data: 'price' },
            { data: 'url' },
            { data: 'createdBy' },
            { data: 'createdOn' },
            { data: 'likes' },
            { data: 'dislikes' }
        ],
        dom: 'T<"clear">lfrtip',
        tableTools: {
            "sSwfPath": "./libs/dataTables/extensions/TableTools/swf/copy_csv_xls_pdf.swf"
        }
      });
    });
  };
});