var Isotope = require('isotope-layout');
require('../../lib/star-rating/star-rating.js');
const angular = require('angular');

export default function( app ) {

  app.controller( 'detailCtrl', [ '$scope', '$http', '$routeParams', function( $scope, $http, $routeParams ) {

    var iso = new Isotope( '.grid', {
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });

    $('.heart-rating').rating();

    $http.get('http://localhost:8000/api/capsules/' + $routeParams.id).then( res => {
      $scope.items = res.data.tops.concat(res.data.shoes).concat(res.data.bottoms).concat(res.data.accessories);
      $scope.capsule = res.data;
    });

    $scope.delete = function (item, index) {
      $http.delete('http://localhost:8000/api/clothes/' + item._id).then( res => {
        $scope.items.splice(index, 1);
      });
    };

    $scope.addItem = function(item) {
      // $('.heart-rating').rating();
      item.importance = $('.heart-rating').filter(':last').val();
      $http.post('http://localhost:8000/api/clothes/', {
        capsule: $routeParams.id,
        type: item.type,
        description: item.description,
        url: item.url,
        image: item.image,
        importance: item.importance
      }).then( res => {
        $scope.items.push(res.data);
      });
    };

  }]);

}
