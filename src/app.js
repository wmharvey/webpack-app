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

app.config( function(jwtInterceptorProvider, $httpProvider) {

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('jwt');
  };

  $httpProvider.interceptors.push('jwtInterceptor');
});

app.config( function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state( 'home', {
			url: '/home',
			template: `<home />`
		})
		.state( 'login', {
			url: '/login',
			template: `<login />`
		})
		.state( 'signup', {
			url: '/signup',
			template: `<signup />`
		})
		.state( 'overview', {
			url: '/capsules',
			template: `<overview capsules="capsules"/>`,
			data: {
			  requiresLogin: true
			},
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
			data: {
			  requiresLogin: true
			},
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
			url: '/profile',
			views: {
				'': { template:
											`<div>Hello</div><div ui-view="profile"></div>
								 			<div ui-view="stats"></div>`
						},
				'profile@profile': { template: `<div>Profile View</div>` },
				'stats@profile': { template: `<div>Stats View</div>`}
			},
			data: {
			  requiresLogin: true
			}
		});
});

app.run(function($rootScope, $state, store, jwtHelper) {
  $rootScope.$on('$stateChangeStart', function(e, to) {
    if (to.data && to.data.requiresLogin) {
      if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
        e.preventDefault();
        console.log('rerouting to login');
        $state.go('login');
      }
    }
  });
});

document.body.innerHTML = template;

angular.bootstrap( document, [ app.name ], {} );
