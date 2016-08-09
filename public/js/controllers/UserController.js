// angular.module('userModule', [])
//   .controller('UserController', ['$scope', '$http', function($scope, $http) {
//     $scope.message = "hi there";
//
//     // Users.get()
//     //   .success(function() {
//     //     $scope.users = data;
//     //     console.log(data);
//     //   });
//
//   }]);


angular.module('userModule', [])
  .controller('UserController', ['$scope', '$http', 'Users', function($scope, $http, Users) {
    $scope.message = "hi there";

    Users.get()
      .success(function(data) {
        $scope.users = data;
        console.log(data);
      });

  }]);
