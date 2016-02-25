import template from './overview-filterbar.html';

export default function( ngModule ) {

  ngModule.directive('overviewFilterbar', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        format: '=',
        sort: '=',
        order: '='
      },
      template,
      controller: [ '$scope', function( $scope ) {

        $scope.format = 'elasped';
        $scope.order.date = '-createdAt';

      }]
    };
  });

}
