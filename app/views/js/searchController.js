
angular.module('bbTemplates', []).controller('searchController', function($scope, $http) {
  //console.log('here');
  
  if(localStorage.getItem('admin') === 'true'){
    $scope.admin = true;
  }else{
    $scope.admin = false;
  }
  var obj;
  var url = "/api/templates";

  $http.get(url).success(function(response){
    $scope.templates = response;
    $scope.templates.forEach(function(template){
      template.createdOn = template.createdOn.replace(/T.*$/,'');
    });



    $(document).ready( function () {
      var table = $('#searchTable').DataTable({
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
            "sSwfPath": "./DataTables-1.10.7/extensions/TableTools/swf/copy_csv_xls_pdf.swf"
        }
      });
    });
    $.fn.dataTableExt.afnFiltering.push(function( settings, data, dataIndex ) {
        function(oSettings, aData, iDataIndex){
            alert('here');
        }
    });
  });

});


