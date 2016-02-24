describe( 'The Overview Controller', () => {

  beforeEach( angular.mock.module( 'myApp' ) );

  var $controller, $scope, $httpBackend;
  var capsule = {
          _id: '123abc',
          season: 'Spring',
          description: '2016',
          createdAt:'2016-02-22T07:33:08.000Z',
          updatedAt: '2016-02-22T07:59:17.915Z'
        };

  beforeEach( angular.mock.inject( function( _$controller_, _$httpBackend_ ) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $httpBackend.whenRoute('GET', 'http://localhost:8000/api/capsules')
      .respond( () => {
        return[200, [capsule]];
      });
    $scope = {};
  }));

  afterEach( () => {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it( 'can get capsules', () => {
    $controller( 'overviewCtrl', { $scope } );
    $httpBackend.expectGET('http://localhost:8000/api/capsules')
    $httpBackend.flush();
    expect($scope.capsules).to.be.an('array');
    expect($scope.capsules).to.have.length(1);
    expect($scope.capsules[0].url).to.be.a('string');
  });

  it( 'can delete a capsule', () => {
    $controller( 'overviewCtrl', { $scope } );
    $httpBackend.expectDELETE('http://localhost:8000/api/capsules/123abc')
      .respond( () => {
          return[200, capsule];
        });
    $scope.deleteCapsule(capsule, 0);
    $httpBackend.flush();
    expect($scope.capsules).to.have.length(0);
  });

  it( 'can add a capsule', () => {
    $controller( 'overviewCtrl', { $scope } );
    $httpBackend.expectPOST('http://localhost:8000/api/capsules')
      .respond( () => {
          return[200, capsule];
        });
    $scope.addCapsule('Spring', '2016');
    $httpBackend.flush();
    expect($scope.capsules).to.have.length(2);
  });

});
