import template from './detail-iframe.html';
import './detail-iframe.css';

export default function( ngModule ) {

  ngModule.directive('detailIframe', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        url: '@'
      },
      controller: [ '$sce', '$scope', function( $sce, $scope ) {
        $scope.trustedUrl = $sce.trustAsResourceUrl($scope.url);
      }],
      template
    };
  });

}
