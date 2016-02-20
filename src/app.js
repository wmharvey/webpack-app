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

app.controller( 'View1Ctrl', [ '$scope', function($scope) {
	$scope.greet = function (name, city) {
		$scope.greeting = `Hello ${name} from ${city}!`;
	};
}]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/view1', {
		template: view1,
		controller: 'View1Ctrl'
	});
	$routeProvider.when('/view2', {
		template: view2,
		controller: 'View2Ctrl'
	});
	$routeProvider.otherwise({redirectTo: '/view1'});
}]);

document.body.innerHTML = template;

angular.bootstrap( document, [ app.name ], {

});
