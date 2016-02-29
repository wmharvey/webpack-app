import spring from '../../images/seasons/spring.png';
import summer from '../../images/seasons/summer.jpg';
import autumn from '../../images/seasons/autumn.jpg';
import winter from '../../images/seasons/winter.png';

export default function( app ) {

  app.controller( 'capsuleEditCtrl', [ '$scope', 'CapsuleService', 'ngDialog', function( $scope, Capsule, ngDialog ) {

    $scope.editCapsule = angular.copy($scope.capsule);

    $scope.submitEdit = function() {
      var capsule = Capsule.update( {id: $scope.editCapsule._id}, {
        season: $scope.editCapsule.season,
        description: $scope.editCapsule.description
      });
      if (capsule.season === 'Spring') capsule.url = spring;
      if (capsule.season === 'Summer') capsule.url = summer;
      if (capsule.season === 'Autumn') capsule.url = autumn;
      if (capsule.season === 'Winter') capsule.url = winter;
      $scope.$parent.capsule = capsule;
      ngDialog.close();
    };

  }]);

}
