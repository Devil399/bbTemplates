
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



    //function for custom filters on data Table
    $.fn.dataTableExt.afnFiltering.push(
            function( oSettings, aData, iDataIndex ) {
                //Getting start an end date
                var sdt = document.getElementById('startDate').value; //start date
                var edt = document.getElementById('endDate').value; //end date
                var createddt = aData[4]; //Created on, data on 4th column

                if(sdt === "") var dt1=sdt //initially no date defined
                    else var dt1 = parseDt(sdt);
                if(edt === "")var dt2 = edt
                    else var dt2 = parseDt(edt);
                var dt = parseDt2(createddt); 
                
                if ( dt1 == "" && dt <= dt2){
                    return true; //start date not given bt end date given
                }
                else if ( dt1 =="" && "" <= dt2 ){
                    return true;
                }
                else if ( dt1 <= dt && "" == dt2 ){
                    return true;
                }
                else if ( dt1 <= dt && dt <= dt2 ){
                    return true;
                }
                return false;
            }
        );

    function parseDt(rawDate){ 
        var dateArr = rawDate.split('/');
        var parsedDate = dateArr[0] + dateArr[1] + dateArr[2];
        return parsedDate;
    }
    function parseDt2(rawDate){
        var dateArr = rawDate.split('-');
        var parsedDate = dateArr[0] + dateArr[1] + dateArr[2];
        return parsedDate;
    }


    $(document).ready( function () {
      table = $('#searchTable').DataTable({
        data: $scope.templates,
        columns: [ //show the following columns
            { data: 'name' },
            { data: 'price' },
            { data: 'url' },
            { data: 'createdBy' },
            { data: 'createdOn' },
            { data: 'likes' },
            { data: 'dislikes' }
        ],
        dom: 'T<"clear">lfrtip',
        tableTools: { //tools for csv,excel,pdf....
            "sSwfPath": "./libs/dataTable/extensions/TableTools/swf/copy_csv_xls_pdf.swf"
        }
      });

      $('#startDate').keyup( function() { table.draw(); } ); //redraw table on changing start/end dates
      $('#endDate').keyup( function() {table.draw(); } );
    });
  });

});


