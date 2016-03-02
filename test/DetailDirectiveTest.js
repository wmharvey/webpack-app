describe( 'The Detail Directive', () => {

  var Clothes = {};
  var $scope, render;

  beforeEach( angular.mock.module( 'myApp', function($provide) {
    $provide.value('ClothesService', Clothes);
  }));

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

  function getElement() {
    const element = render( $scope );
    $scope.$digest();
    return element;
  }

  beforeEach( angular.mock.inject( function( $rootScope, $compile) {
    $scope = $rootScope.$new();
    const html = `<detail items="items" capsule="capsule"></detail>`;
    render = $compile( html );
  }));

  it( 'can delete items', done => {

    $scope.items = [item];
    $scope.capsule = capsule;
    var removeCalled = false;

    Clothes.remove = function(passedItem) {
      removeCalled = true;
      assert.equal(passedItem.id, item._id);
      var promise = Promise.resolve(true);
      Clothes.$promise = promise;
      return Clothes;
    };

    const element = getElement( $scope );

    const isoScope = element.isolateScope();
    expect(isoScope.items).to.equal($scope.items);

    isoScope.deleteItem(item).then( function() {
      assert.ok(removeCalled);
      expect(isoScope.items.length).to.equal(0);
      done();
    });

  });

  it( 'can add an item', () => {
    $scope.items = [item];
    $scope.capsule = capsule;
    var addCalled = false;

    Clothes.save = function(newItem) {
      addCalled = true;
      assert.equal(newItem.capsule, item.capsule);
      var promise = Promise.resolve(true);
      Clothes.$promise = promise;
      return Clothes;
    }

    const element = getElement( $scope );
    const isoScope = element.isolateScope();
    expect(isoScope.items).to.equal($scope.items);

    isoScope.addItem(item);
  });

});
