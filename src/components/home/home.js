import './home.css';
import template from './home.html';

export default function( ngModule ) {

  ngModule.directive( 'home', function() {
    return {
      replace: true,
      restrict: 'E',
      template,
      scope: {},
      controller: function( $scope, store, $state, jwtHelper ) {

        var token = store.get('jwt');
        if (token) {
          var payload = jwtHelper.decodeToken(token);
          $scope.profile = payload;
        }

        $scope.logout = function() {
          store.remove('jwt');
          $state.go('login');
        };

      }
    };
  });

}
