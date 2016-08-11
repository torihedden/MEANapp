// js/controllers/main.js

//$scope is the application object (the owner of application variables and functions)
//$http is an XMLHttpRequest object for requesting external data.

//modules are little packages or containers for related stuff
angular.module('mainModule', [])

    // inject the Todo service factory into our controller
    .controller('mainController', ['$scope', '$http', 'Todos', function($scope, $http, Todos) {
      $scope.formData = {};

      Todos.get()
        .success(function(data) {
          $scope.books = data;
          console.log(data);
        });

      // CREATE ==================================================================
      // when submitting the add form, send the text to the node API
      $scope.createBook = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        // people can't just hold enter to keep adding the same book anymore
        if (!$.isEmptyObject($scope.formData)) {

          // call the create function from our service (returns a promise object)
          Todos.create($scope.formData)

            // if successful creation, call our get function to get all the new books
            .success(function(data) {
              $scope.formData = {}; // clear the form so our user is ready to enter another
              $scope.books = data; // assign our new list of books
            });
        }
      };

      // DELETE ==================================================================
      $scope.deleteBook = function(id) {
        Todos.delete(id)
            // if successful creation, call our get function to get all the new books
          .success(function(data) {
              $scope.books = data; // assign our new list of books
          });
      };

      $scope.setBookStatus = function(id, bookStatus) {
        // debugger;
        var bookData = {
          id : id,
          bookStatus : bookStatus
        }
        Todos.update(bookData)
          .success(function(data) {

          //
            $($scope.books).each(function(index) {
              if ($scope.books[index]._id === data._id) {
                $scope.books[index].checkedOut = data.checkedOut;
              }
            });


            // debugger;
            // console.log('retrieved book status');
          })
        // console.log('check book out, set checkedOut to ' + bookStatus);
      };

    }]);
