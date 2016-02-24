import './overview.css';
import spring from '../../images/seasons/spring.png';
import summer from '../../images/seasons/summer.jpg';
import autumn from '../../images/seasons/autumn.jpg';
import winter from '../../images/seasons/winter.png';

export default function( app ) {

  app.controller( 'overviewCtrl', [ '$scope', '$http', function( $scope, $http ) {

    $scope.dateFormat = 'elasped';
    $scope.order = {};
    $scope.order.date = '-createdAt';
    $scope.form = {};

    $http.get('http://localhost:8000/api/capsules').then( res => {
      res.data.forEach( capsule => {
        if (capsule.season === 'Spring') capsule.url = spring;
        if (capsule.season === 'Summer') capsule.url = summer;
        if (capsule.season === 'Autumn') capsule.url = autumn;
        if (capsule.season === 'Winter') capsule.url = winter;
      });
      $scope.capsules = res.data;
    });

    $scope.addCapsule = function(form) {
      $http.post('http://localhost:8000/api/capsules', {
        season: form.season,
        description: form.description
      }).then( res => {
        if (res.data.season === 'Spring') res.data.url = spring;
        if (res.data.season === 'Summer') res.data.url = summer;
        if (res.data.season === 'Autumn') res.data.url = autumn;
        if (res.data.season === 'Winter') res.data.url = winter;
        $scope.capsules.push(res.data);
        $scope.form.season = '';
        $scope.form.description = '';
      });
    };


    $scope.reset = function() {
      $scope.form.season = '';
      $scope.form.description = '';
    };

    $scope.deleteCapsule = function(capsule) {
      $http.delete('http://localhost:8000/api/capsules/' + capsule._id).then( res => {
        $scope.capsules.splice($scope.capsules.indexOf(capsule),1);
      });
    };

  }]);

}
