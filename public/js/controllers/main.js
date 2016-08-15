// js/controllers/main.js

//$scope is the application object (the owner of application variables and functions)
//$http is an XMLHttpRequest object for requesting external data.

//modules are little packages or containers for related stuff
angular.module('mainModule', [])

    // inject the Todo service factory into our controller
    .controller('mainController', ['$scope', '$http', 'Books', 'userSelect', function($scope, $http, Books, userSelect) {

      console.log(userSelect.getCurrentUser());

      $scope.formData = {};
      console.log('main controler here');
      Books.get()
        .success(function(data) {
          debugger;
          $scope.books = data;
          // console.log(data);
        });

      // CREATE ==================================================================
      // when submitting the add form, send the text to the node API
      $scope.createBook = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        // people can't just hold enter to keep adding the same book anymore
        if (!$.isEmptyObject($scope.formData)) {

          // call the create function from our service (returns a promise object)
          Books.create($scope.formData)

            // if successful creation, call our get function to get all the new books
            .success(function(data) {
              $scope.formData = {}; // clear the form so our user is ready to enter another
              $scope.books = data; // assign our new list of books
            });
        }
      };

      // DELETE ==================================================================
      $scope.deleteBook = function(id) {
        Books.delete(id)
            // if successful creation, call our get function to get all the new books
          .success(function(data) {
              $scope.books = data; // assign our new list of books
          });
      };

      $scope.setBookStatus = function(id, bookStatus) {
        console.log(id);
        var bookData = {
          id : id,
          bookStatus : bookStatus
        }
        debugger;
        Books.update(bookData)
          .success(function(data) {
            // $http({
            //     url: 'https://hooks.slack.com/services/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',
            //     method: "POST",
            //     data: 'payload=' + JSON.stringify({"text": "tori's test"})
            // })
            // .then(function(response) {
            //     console.log(response)
            // });


            $($scope.books).each(function(index) {
              if ($scope.books[index]._id === data._id) {
                $scope.books[index].checkedOut = data.checkedOut;
              }
            });
          })
      };

      //TODO: combine setBookStatus and assignBookToUser (pushes book to array of checked out books associated with user)

    }]);
