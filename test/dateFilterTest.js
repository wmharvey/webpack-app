describe( 'The date filter', () => {

  beforeEach( angular.mock.module( 'myApp' ) );

  var dateFilter;

  beforeEach( angular.mock.inject( [ 'dateFilter', function( _dateFilter_ ) {
    dateFilter = _dateFilter_;
  }]));

  it( 'defaults to ISO format', () => {
    assert.equal( dateFilter( new Date() ), moment(new Date).format() );
  });

  it( 'accepts an elasped option', () => {
    assert.equal( dateFilter( new Date(), 'elasped' ), 'a few seconds ago' );
  });

  it( 'accepts a standard option', () => {
    assert.equal( dateFilter( new Date(), 'standard' ), moment(new Date()).format("dddd, MMMM Do YYYY") );
  });

});
