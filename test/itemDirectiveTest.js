// describe( 'Item', () => {

//   beforeEach( angular.mock.module( 'myApp' ) );

//   var item = {
//     _id: '123',
//     capsule: '123abc',
//     type: 'tops',
//     description: 'white tee',
//     url:'www.example.com',
//     image: 'www.example.jpg',
//     importance: 3
//   };

//   var $scope, render;

//   function getElement(scope) {
//     const element = render(scope);
//     scope.$digest();
//     return element;
//   }

//   beforeEach( angular.mock.inject( function( $rootScope, $compile ) {
//     $scope = $rootScope.$new();
//     const html = `<item item="item" delete="deleteItem"></item>`;
//     render = $compile( html );
//   }));

//   it( 'deletes an item by calling a passed in function', () => {

//     $scope.item = item;
//     var items = [item, item];

//     $scope.delete = function() {
//       return function (item) {
//         items.splice(items.indexOf(item), 1);
//       }
//     };

//     const element = getElement($scope);

//     const isoScope = element.isolateScope();

//     isoScope.deleteItem();

//     expect(items.length).to.equal(1);
//   });

// });
