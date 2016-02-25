import template from './item.html';

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
      controller: [ '$scope', function( $scope ) {

        $scope.deleteItem = function() {
          $scope.delete()($scope.item);
        };

        $scope.editItem = function() {
          //to do
        };

      }]
    };
  });

}
