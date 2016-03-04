import template from './signup.html';

export default function( ngModule ) {

  ngModule.directive( 'signup', function() {
    return {
      replace: true,
      restrict: 'E',
      template,
      scope: {},
      controller: function( $scope, store, $state, UserService ) {

        $scope.user = {};

        $scope.createUser = function() {
          UserService.signup($scope.user).then( data => {
            store.set('jwt', data.id_token);
            $state.go('home');
          }, function(error) {
            alert(error.data);
          });
        };

      }
    };
  });

}
