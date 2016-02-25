import template from './detail-filterbar.html';

export default function( ngModule ) {

  ngModule.directive('detailFilterbar', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        sort: '=',
        order: '='
      },
      template
    };
  });

}
