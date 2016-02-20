describe( 'The App Controller', () => {

  beforeEach( angular.mock.module( 'myApp' ) );

  var $controller, $scope;

  beforeEach( angular.mock.inject( function( _$controller_ ) {
    $controller = _$controller_;
    $scope = {};
  }));

  it( 'can greet people', () => {
    $controller( 'View1Ctrl', { $scope } );
    $scope.greet('Ben', 'Portland');
    assert.deepEqual( $scope.greeting, 'Hello Ben from Portland!' );
  });

});
