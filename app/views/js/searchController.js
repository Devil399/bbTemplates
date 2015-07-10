bbTemplates.controller("searchController", function($scope, $http){

  var url = "/api/templates";

  $http.get(url).success(function(response){
    $scope.templates = response;
    $scope.templates.forEach(function(template){
      template.createdOn = template.createdOn.replace(/T.*$/,'');
    });

    $('#searchTable').DataTable({
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

  $scope.search = function(){
    
  }
});
