var bbTemplates = angular.module("bbTemplates", ['ngRoute']);

bbTemplates.config(['$routeProvider',function($routeProvider){
  $routeProvider.when('/addTemplate',{
    templateUrl: './partials/_add.html',
    controller: 'addTemplateController'
  }).
  when('/:id',{
    templateUrl: './partials/_view.html',
    controller: 'viewTemplateController'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);

bbTemplates.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
