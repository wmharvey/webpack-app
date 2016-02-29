import './overview.css';
import spring from '../../images/seasons/spring.png';
import summer from '../../images/seasons/summer.jpg';
import autumn from '../../images/seasons/autumn.jpg';
import winter from '../../images/seasons/winter.png';

export default function( app ) {

  app.controller( 'overviewCtrl', [ '$scope', 'CapsuleService', 'welcomeMessage', function( $scope, Capsule, welcome ) {

    $scope.order = {};
    $scope.message = welcome;

    Capsule.query().$promise.then( data => {
      data.forEach( capsule => {
        if (capsule.season === 'Spring') capsule.url = spring;
        if (capsule.season === 'Summer') capsule.url = summer;
        if (capsule.season === 'Autumn') capsule.url = autumn;
        if (capsule.season === 'Winter') capsule.url = winter;
      });
      $scope.capsules = data;
    });

    $scope.addCapsule = function(form) {
      Capsule.save({
        season: form.season,
        description: form.description
      }).$promise.then( data => {
        if (data.season === 'Spring') data.url = spring;
        if (data.season === 'Summer') data.url = summer;
        if (data.season === 'Autumn') data.url = autumn;
        if (data.season === 'Winter') data.url = winter;
        $scope.capsules.push(data);
      });
    };

    $scope.deleteCapsule = function (capsule) {
      Capsule.delete({id: capsule._id});
      $scope.capsules.splice($scope.capsules.indexOf(capsule), 1);
    };

  }]);

}
