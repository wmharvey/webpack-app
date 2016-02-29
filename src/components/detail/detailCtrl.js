var Isotope = require('isotope-layout');
require('../../lib/star-rating/star-rating.js');
const angular = require('angular');

export default function( app ) {

  app.controller( 'detailCtrl', [ '$scope', 'CapsuleService', 'ClothesService', '$routeParams', '$timeout',
  function( $scope, Capsule, Clothes, $routeParams, $timeout ) {

    var iso = new Isotope( '.grid', {
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });

    var capsuleContents = Capsule.get({id: $routeParams.id});
    capsuleContents.$promise.then(function(data) {
      $scope.items = data.tops.concat(data.shoes, data.bottoms, data.accessories);
      $scope.capsule = data;
    });

    $scope.deleteItem = function (item) {
      Clothes.remove({id: item._id});
      $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.addItem = function(item) {
      var saved = Clothes.save({
        capsule: $routeParams.id,
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

  }]);

}
