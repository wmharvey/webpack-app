export default function( ngModule ) {

  ngModule.factory( 'UserService', function( apiUrl, $http ) {

    var service = {};

    service.login = function(user) {
      return $http({
        url: apiUrl + '/auth/signin',
        method: 'POST',
        data: user
      }).then(function(res) {
        return res.data;
      });
    };

    service.signup = function(user) {
      return $http({
        url: apiUrl + '/auth/signup',
        method: 'POST',
        data: user
      }).then(function(res) {
        return res.data;
      });
    };

    return service;

  });

}
