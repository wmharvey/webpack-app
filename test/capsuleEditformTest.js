describe( 'The Capsule Edit Form Controller', () => {

  beforeEach( angular.mock.module( 'myApp' ) );

  var $controller, $scope, $httpBackend;
  var capsule = {
    _id: '123abc',
    description: '2016',
    season: 'Spring'
  };

  beforeEach( angular.mock.inject( function( _$controller_, _$httpBackend_, $rootScope) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
  }));

  afterEach( () => {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it( 'copies the capsule as editCapsule', () => {
    $scope.capsule = capsule;
    $controller( 'capsuleEditCtrl', {
      $scope
    });
    expect($scope.editCapsule).to.be.an('object');
    expect($scope.editCapsule).to.not.equal($scope.capsule);
    expect($scope.editCapsule).to.deep.equal($scope.capsule);
  });

  it( 'can edit a capsule', () => {
    $scope.capsule = capsule;
    $controller( 'capsuleEditCtrl', {
      $scope
    });
    $httpBackend.expectPATCH('http://localhost:8000/api/capsules/123abc')
      .respond( () => {
        return[200, capsule];
      });
    $scope.submitEdit();
    $httpBackend.flush();
    expect($scope.$parent.capsule).to.be.an('object');
  });

});
