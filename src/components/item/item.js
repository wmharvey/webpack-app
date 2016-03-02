import template from './item.html';
import formTemplate from '../item-editform/item-editform.html';
import './item.css';

export default function( ngModule ) {

  ngModule.directive('item', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        item: '=',
        delete: '&'
      },
      template,
      controller: [ '$scope', 'ngDialog', function( $scope, ngDialog ) {

        $scope.deleteItem = function() {
          $scope.delete()($scope.item);
        };

        $scope.openEdit = function() {
          ngDialog.open({
            template: formTemplate,
            plain: true,
            controller: 'itemEditCtrl',
            scope: $scope
          });
        };

      }]
    };
  });

}
