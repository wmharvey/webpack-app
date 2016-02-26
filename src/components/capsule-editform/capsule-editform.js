import spring from '../../images/seasons/spring.png';
import summer from '../../images/seasons/summer.jpg';
import autumn from '../../images/seasons/autumn.jpg';
import winter from '../../images/seasons/winter.png';

export default function( app ) {

  app.controller( 'capsuleEditCtrl', [ '$scope', '$http', 'ngDialog', function( $scope, $http, ngDialog ) {

    $scope.editCapsule = angular.copy($scope.capsule);

    $scope.submitEdit = function() {
      $http.patch('http://localhost:8000/api/capsules/' + $scope.editCapsule._id, {
        season: $scope.editCapsule.season,
        description: $scope.editCapsule.description
      }).then( res => {
        var capsule = res.data;
        if (capsule.season === 'Spring') capsule.url = spring;
        if (capsule.season === 'Summer') capsule.url = summer;
        if (capsule.season === 'Autumn') capsule.url = autumn;
        if (capsule.season === 'Winter') capsule.url = winter;
        $scope.$parent.capsule = res.data;
        ngDialog.close();
      });
    };

  }]);

}
