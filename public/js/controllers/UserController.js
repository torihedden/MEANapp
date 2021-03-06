angular.module('userModule', [])
  .controller('UserController', ['$scope', '$http', 'Users', 'userSelect', function($scope, $http, Users, userSelect) {

    $scope.selectedUser;

    $scope.setUser = function(user) {
      userSelect.setCurrentUser(user);
    }

    $scope.formData = {};

    Users.get()
      .success(function(data) {
        $scope.users = data;
        // console.log(data);
      });

      $scope.createNewUser = function() {
        if (!$.isEmptyObject($scope.formData)) {
          Users.create($scope.formData)
            .success(function(data) {
              $scope.formData = {}; // clear the form so our user is ready to enter another
              $scope.users = data; // assign our new list of todos
            });
        }
      };

  }]);
