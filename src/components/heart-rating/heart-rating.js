export default function( ngModule ) {

  ngModule.directive('myHeart', [ '$timeout', function($timeout) {
  return {
    restrict: 'EA',
    template: `<input class="heart-rating" type="hidden" data-filled="glyphicon glyphicon-heart heart" data-empty="glyphicon glyphicon-heart-empty heart" data-readonly ng-value="{{item.importance}}" />`,
    link: function (scope) {
      if (scope.$last) {
        $timeout( function() {
          $('.heart-rating').rating();
        }, 0);
      }
    }
  };
}]);

}
