export default function( ngModule ) {

  ngModule.directive('heartRating', [ '$timeout', function($timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      value: '=',
      readOnly: '@'
    },
    template: `<input class="heart-rating" ng-show="false" ng-value={{value}}>`,
    link: function (scope, element, attr) {
      if (scope.readOnly) {
        element.attr('data-readonly', true);
      }
      $timeout( function() {
        $(element)
          .rating({
            filled: "glyphicon glyphicon-heart heart",
            empty: "glyphicon glyphicon-heart-empty heart"
          })
          .on('change', function() {
            var node = $(this);
            scope.$apply( function() {
              scope.value = node.val();
            });
          });
      });
    }
  };
}]);

}
