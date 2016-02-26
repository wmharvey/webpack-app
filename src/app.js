import angular from 'angular';
import router from 'angular-route';
import messages from 'angular-messages';
import ngDialog from 'ng-dialog';

import filters from './filters';
import components from './components';

import template from './template.html';
import overview from './components/overview/overview.html';
import detail from './components/detail/detail.html';

require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require('ng-dialog/css/ngDialog.css');
require('ng-dialog/css/ngDialog-theme-default.css');
import './css/main.css';

const app = angular.module( 'myApp', [
	router, filters, components, messages, ngDialog
]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/capsules', {
		template: overview,
		controller: 'overviewCtrl'
	});
	$routeProvider.when('/capsules/:id', {
		template: detail,
		controller: 'detailCtrl'
	});
	$routeProvider.otherwise({redirectTo: '/capsules'});
}]);

document.body.innerHTML = template;

angular.bootstrap( document, [ app.name ], {

});
