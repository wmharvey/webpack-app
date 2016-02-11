import angular from 'angular';
import router from 'angular-route';

import template from './template.html';
import view1 from './view1.html';
import view2 from './view2.html';
import './css/main.css';

const app = angular.module( 'myApp', [
	router
]);

app.controller( 'AppCtrl', [ '$scope', '$http', function($scope, $http) {
	$http.get( 'http://localhost:8000/api/cities' ).then( res => {
		$scope.cities = res.data;
	});
}]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/view1', {
		template: view1
	});
	$routeProvider.when('/view2', {
		template: view2
	});
	$routeProvider.otherwise({redirectTo: '/view1'});
}]);

document.body.innerHTML = template;

angular.bootstrap( document, [ app.name ], {

});
