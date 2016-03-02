describe( 'The Overview Directive', () => {

  var Capsule = {};
  var Message = {};
  var Image = {};
  var $scope, render;

  beforeEach( angular.mock.module( 'myApp', function($provide) {
    $provide.value('CapsuleService', Capsule);
    $provide.value('welcomeMessage', Message);
    $provide.value('ImageService', Image);
  }));

  var capsule = {
    _id: '123abc',
    season: 'Spring',
    description: '2016',
    createdAt:'2016-02-22T07:33:08.000Z',
    updatedAt: '2016-02-22T07:59:17.915Z'
  };

  function getElement() {
    const element = render( $scope );
    $scope.$digest();
    return element;
  }

  beforeEach( angular.mock.inject( function( $rootScope, $compile) {
    $scope = $rootScope.$new();
    const html = `<overview capsules="capsules"></overview>`;
    render = $compile( html );
  }));

  it( 'can add a capsule', done => {
    $scope.capsules = [capsule];
    var saveCalled = false;

    Capsule.save = function(savedCapsule) {
      saveCalled = true;
      assert.equal(savedCapsule.season, capsule.season);
      var promise = Promise.resolve(true);
      Capsule.$promise = promise;
      return Capsule;
    };

    Image.setImage = function(cap) {
      cap.url = 'some reference';
      return cap;
    }

    const element = getElement( $scope );

    const isoScope = element.isolateScope();
    expect(isoScope.capsules).to.equal($scope.capsules);

    isoScope.addCapsule(capsule);
    assert.ok(saveCalled);
    done();
  });

  it( 'can delete a capsule', done => {

    $scope.capsules = [capsule];
    var deleteCalled = false;

    Capsule.delete = function (deleteCapsule) {
      deleteCalled = true;
      assert.equal(deleteCapsule.id, capsule._id);
      var promise = Promise.resolve(true);
      Capsule.$promise = promise;
      return Capsule;
    };

    const element = getElement( $scope );

    const isoScope = element.isolateScope();
    expect(isoScope.capsules).to.equal($scope.capsules);

    isoScope.deleteCapsule(capsule)
    assert.ok(isoScope.capsules);
    assert.ok(deleteCalled);
    done();

  });


});
