import './overview.css';
import template from './overview.html';

export default function( ngModule ) {

  ngModule.directive( 'overview', function() {
    return {
      replace: true,
      restrict: 'E',
      template,
      scope: {
        capsules: '='
      },
      controller: [ '$scope', 'CapsuleService', 'ImageService', 'welcomeMessage', function( $scope, Capsule, Image, welcome ) {

        $scope.order = {};
        $scope.message = welcome;

        $scope.addCapsule = function(form) {
          Capsule.save({
            season: form.season,
            description: form.description
          }).$promise.then( capsule => {
            $scope.capsules.push( Image.setImage(capsule) );
          });
        };

        $scope.deleteCapsule = function (capsule) {
          Capsule.delete({id: capsule._id})
            .$promise.then( () => {
              $scope.capsules.splice($scope.capsules.indexOf(capsule), 1);
            });
        };

      }]
    };
  });

}
