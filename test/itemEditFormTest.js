describe( 'The Item Edit Form Controller', () => {

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

  beforeEach( angular.mock.inject( function( _$controller_, _$httpBackend_, $rootScope) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
  }));

  afterEach( () => {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it( 'copies the item as new', () => {
    $scope.item = item;
    $controller( 'itemEditCtrl', {
      $scope
    });
    expect($scope.new).to.be.an('object');
    expect($scope.new).to.not.equal($scope.item);
    expect($scope.new).to.deep.equal($scope.item);
  });

  it( 'can edit an item', () => {
    $scope.item = item;
    $controller( 'itemEditCtrl', {
      $scope
    });
    $httpBackend.expectPATCH('http://localhost:8000/api/clothes/123')
      .respond( () => {
        return[200, item];
      });
    $scope.submitEdit();
    $httpBackend.flush();
    expect($scope.$parent.item).to.be.an('object');
  });

});
