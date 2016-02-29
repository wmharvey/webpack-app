import template from './capsule-form.html';

export default function( ngModule ) {

  ngModule.directive('capsuleForm', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        add: '&'
      },
      template,
      controller: [ '$scope', function( $scope ) {

        $scope.reset = function() {
          $scope.capsule = {
            season: "",
            description: ""
          };
          $scope.capsuleForm.$setUntouched();
        };

        $scope.addCapsule = function() {
          $scope.add()($scope.capsule);
          $scope.capsule = {
            season: "",
            description: ""
          };
          $scope.capsuleForm.$setUntouched();
        };

      }]
    };
  });

}
