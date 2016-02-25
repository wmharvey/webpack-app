import template from './filter-nav.html';

export default function( ngModule ) {

  ngModule.directive('filterNav', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: {
        "leftSide": '?div',
        "rightSide": '?span'
      },
      scope: {},
      template,
      controller: [ '$scope', function( $scope ) {

        $scope.temp = 'arg';

      }]
    };
  });

}
