describe( 'The Detail Controller', () => {

  beforeEach( angular.mock.module( 'myApp' ) );

  var $controller, $scope, $httpBackend;
  var item = {
    _id: '123',
    capsule: '123abc',
    type: 'tops',
    description: 'white tee',
    url:'www.example.com',
    image: 'www.example.jpg',
    importance: 3
  };
  var capsule = {
    _id: '123abc',
    description: '2016',
    season: 'Spring',
    tops: [item],
    bottoms: [],
    accessories: [],
    shoes: []
  };

  beforeEach( angular.mock.inject( function( _$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $scope = {};
  }));

  afterEach( () => {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it( 'can get items from a capsule', () => {
    $controller( 'detailCtrl', {
      $scope,
      $routeParams: {id: '123abc'}
    });
    $httpBackend.expectGET('http://localhost:8000/api/capsules/123abc')
      .respond( () => {
        return[200, capsule];
      });
    $httpBackend.flush();
    expect($scope.items).to.be.an('array');
    expect($scope.capsule).to.be.an('object');
    expect($scope.items.length).to.equal(1);
  });

  it( 'can delete an item', () => {
    $controller( 'detailCtrl', {
      $scope,
      $routeParams: {id: '123abc'}
    });
    $httpBackend.expectGET('http://localhost:8000/api/capsules/123abc')
      .respond( () => {
        return[200, capsule];
      });
    $httpBackend.expectDELETE('http://localhost:8000/api/clothes/123')
      .respond( () => {
          return[200];
        });
    $scope.deleteItem(item);
    $httpBackend.flush();
    expect($scope.items).to.have.length(0);
  });

  it( 'can add an item', () => {
    $controller( 'detailCtrl', {
      $scope,
      $routeParams: {id: '123abc'}
    });
    $httpBackend.expectGET('http://localhost:8000/api/capsules/123abc')
      .respond( () => {
        return[200, capsule];
      });
    $httpBackend.expectPOST('http://localhost:8000/api/clothes/')
      .respond( () => {
          return[200, item];
        });
    $scope.addItem(item);
    $httpBackend.flush();
    expect($scope.items).to.have.length(2);
  });

});
