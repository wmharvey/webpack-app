import template from './item-form.html';

export default function( ngModule ) {

  ngModule.directive('itemForm', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        add: '&'
      },
      template,
      controller: [ '$scope', function( $scope ) {

        $scope.resetForm = function() {
          $scope.new = {
            url: "",
            image: "",
            description: "",
            type: ""
          };
          $scope.itemForm.$setUntouched();
          $scope.heartError = false;
        };

        $scope.addItem = function() {
          if(!$scope.new.importance) {
            $scope.heartError = true;
          } else {
            $scope.add()($scope.new);
            $scope.new = {
              url: "",
              image: "",
              description: "",
              type: ""
            };
            $scope.itemForm.$setUntouched();
            $scope.heartError = false;
          }

        };

      }]
    };
  });

}
