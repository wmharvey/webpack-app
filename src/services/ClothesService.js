export default function( ngModule ) {


  ngModule.factory( 'ClothesService', [ 'apiUrl', '$resource', function( apiUrl, $resource ) {

   return $resource( apiUrl + '/clothes/:id', {
     id: '@_id'
   }, {
     update: { method: 'PATCH' }
   });

  }]);

}
