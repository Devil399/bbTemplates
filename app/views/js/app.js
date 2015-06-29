var bbTemplates = angular.module("bbTemplates", ['ngRoute']);

bbTemplates.config(['$routeProvider',function($routeProvider){
  $routeProvider.when('/listTemplate',{
    templateUrl: './partials/_list.html',
    controller: 'listTemplateController'
  }).
  when('/listTemplate/:id',{
    templateUrl: './partials/_view.html',
    controller: 'viewTemplateController'
  }).
  when('/addTemplate',{
    templateUrl: './partials/_add.html',
    controller: 'addTemplateController'
  }).
  otherwise({
    redirectTo: '/listTemplate'
  });
}]);
