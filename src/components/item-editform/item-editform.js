export default function( app ) {

  app.controller( 'itemEditCtrl', [ '$scope', 'ClothesService', 'ngDialog', function( $scope, Clothes, ngDialog ) {

    $scope.new = angular.copy($scope.item);

    $scope.submitEdit = function() {
      $scope.$parent.item = Clothes.update({id: $scope.new._id}, {
        description: $scope.new.description,
        url: $scope.new.url,
        image: $scope.new.image,
        importance: $scope.new.importance
      });
      ngDialog.close();
    };

  }]);

}
