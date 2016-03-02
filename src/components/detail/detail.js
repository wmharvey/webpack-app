import template from './detail.html';
require('../../lib/star-rating/star-rating.js');
require('./detail.css');

export default function( ngModule ) {

  ngModule.directive( 'detail', function() {
    return {
      replace: true,
      restrict: 'E',
      template,
      scope: {
        items: '=',
        capsule: '='
      },
      controller: [ '$scope', 'ClothesService',
        function( $scope, Clothes) {

        $scope.deleteItem = function (item) {
          return Clothes.remove({id: item._id}).$promise.then(function() {
            return $scope.items.splice($scope.items.indexOf(item), 1)[0];
          });
        };

        $scope.addItem = function(item) {
          var saved = Clothes.save({
            capsule: $scope.capsule._id,
            type: item.type,
            description: item.description,
            url: item.url,
            image: item.image,
            importance: item.importance
          });
          saved.$promise.then( function (data) {
            $scope.items.push(data);
          });
        };

      }]
    };
  });

}
