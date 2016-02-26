export default function( app ) {

  app.controller( 'itemEditCtrl', [ '$scope', '$http', 'ngDialog', function( $scope, $http, ngDialog ) {

    $scope.new = angular.copy($scope.item);

    $scope.submitEdit = function() {
      $http.patch('http://localhost:8000/api/clothes/' + $scope.new._id, {
        description: $scope.new.description,
        url: $scope.new.url,
        image: $scope.new.image,
        importance: $scope.new.importance
      }).then( res => {
        $scope.$parent.item = res.data;
        ngDialog.close();
      });
    };

  }]);

}
