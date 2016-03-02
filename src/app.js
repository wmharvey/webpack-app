import angular from 'angular';
import app from './js/app-module';

import template from './template.html';
import overview from './components/overview/overview.html';
import detail from './components/detail/detail.html';

require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require('ng-dialog/css/ngDialog.css');
require('ng-dialog/css/ngDialog-theme-default.css');
import './css/main.css';

app.config(['welcomeMessageProvider', function(welcome) {
	welcome.setWelcome('message', 'Welcome to the site!');
}]);

app.config( function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/overview');

	$stateProvider
		.state( 'overview', {
			url: '/capsules',
			template: `<overview capsules="capsules"/>`,
			resolve: {
				capsules ( CapsuleService ) {
					return CapsuleService.query().$promise;
				}
			},
			controller: function( $scope, capsules, ImageService ) {
				$scope.capsules = capsules.map( capsule => ImageService.setImage(capsule) );
			}
		})
		.state( 'details', {
			url: '/capsules/:id',
			template: `<detail items="items" capsule="capsule"/>`,
			resolve: {
				capsule ( CapsuleService, $stateParams ) {
					return CapsuleService.get({id: $stateParams.id}).$promise;
				}
			},
			controller: function( $scope, capsule ) {
				$scope.items = capsule.tops.concat(capsule.shoes, capsule.bottoms, capsule.accessories);
				$scope.capsule = capsule;
			}
		})
		.state( 'details.iframe', {
			url: '/iframe?url',
			template: `<detail-iframe url={{url}}/>`,
			controller: function( $scope, $stateParams ) {
				$scope.url = $stateParams.url;
			}
		})
		.state( 'profile', {
			abstract: true,
			url: '/profile',
			template: `<div ui-view="profile"></div>
								 <div ui-view="stats"></div>`
		})
	  .state('profile.parts', {
	    views: {
	      'profile': {
	      	template: `<div>Profile View</div>`
	      },
	      'stats': {
	      	template: `<div>Stats View</div>`
	      }
	    }
	  });
});

app.run(['$state', function ($state) {
	$state.transitionTo('overview');
}]);

document.body.innerHTML = template;

angular.bootstrap( document, [ app.name ], {} );
