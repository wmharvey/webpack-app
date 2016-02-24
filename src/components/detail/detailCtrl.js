var Isotope = require('isotope-layout');
require('../../lib/star-rating/star-rating.js');
const angular = require('angular');

export default function( app ) {

  app.controller( 'detailCtrl', [ '$scope', '$http', '$routeParams', '$timeout', function( $scope, $http, $routeParams, $timeout ) {

    var iso = new Isotope( '.grid', {
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });

    $scope.heartError = false;

    $http.get('http://localhost:8000/api/capsules/' + $routeParams.id).then( res => {
      $scope.items = res.data.tops.concat(res.data.shoes, res.data.bottoms, res.data.accessories);
      $scope.capsule = res.data;
    });

    $scope.delete = function (item) {
      $http.delete('http://localhost:8000/api/clothes/' + item._id).then( res => {
        $scope.items.splice($scope.items.indexOf(item), 1);
      });
    };

    $scope.addItem = function(item) {
      if ( !$('.heart-rating').filter(':last').val() ) {
        $scope.heartError = true;
      } else {
        $http.post('http://localhost:8000/api/clothes/', {
          capsule: $routeParams.id,
          type: item.type,
          description: item.description,
          url: item.url,
          image: item.image,
          importance: $('.heart-rating').filter(':last').val()
        }).then( res => {
          $scope.items.push(res.data);
        });
        $scope.new = {};
        $scope.itemForm.url.$setUntouched();
        $scope.itemForm.image.$setUntouched();
        $scope.itemForm.description.$setUntouched();
        $scope.itemForm.category.$setUntouched();
      }
    };

  }]);

}
