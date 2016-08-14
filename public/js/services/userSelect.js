angular.module('userSelectService', [])

  .factory('userSelect', function($scope) {
  
    return $scope.selectSlackName;
  });
