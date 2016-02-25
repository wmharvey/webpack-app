import template from './capsule.html';

export default function( ngModule ) {

  ngModule.directive('capsule', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        capsule: '=',
        delete: '&',
        dateFormat: '@date'
      },
      template,
      controller: [ '$scope', function( $scope ) {

        $scope.deleteCapsule = function() {
          $scope.delete()($scope.capsule);
        };

        $scope.editCapsule = function() {
          //to do
        };

      }]
    };
  });

}
