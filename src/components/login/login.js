import './login.css';
import template from './login.html';

export default function( ngModule ) {

  ngModule.directive( 'login', function() {
    return {
      replace: true,
      restrict: 'E',
      template,
      scope: {},
      controller: function( $scope, store, $state, UserService ) {

        $scope.user = {};

        $scope.login = function() {
          UserService.login($scope.user).then( data => {
            store.set('jwt', data.id_token);
            $state.go('home');
          }, function(error) {
            // alert(error.data);
          });
        };

      }
    };
  });

}
