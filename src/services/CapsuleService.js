export default function( ngModule ) {


  ngModule.factory( 'CapsuleService', [ 'apiUrl', '$resource', function( apiUrl, $resource ) {

   return $resource( apiUrl + '/capsules/:id', {
     id: '@_id'
   }, {
     update: { method: 'PATCH' }
   });

  }]);

}
