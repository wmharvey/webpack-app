import template from './capsule.html';
import formTemplate from '../capsule-editform/capsule-editform.html';

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
      controller: [ '$scope', 'ngDialog', function( $scope, ngDialog ) {

        $scope.openEdit = function() {
          ngDialog.open({
            template: formTemplate,
            plain: true,
            controller: 'capsuleEditCtrl',
            scope: $scope
          });
        };

        $scope.deleteCapsule = function() {
          $scope.delete()($scope.capsule);
        };

      }]
    };
  });

}
