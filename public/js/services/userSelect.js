angular.module('userSelectService', [])

  .factory('userSelect', function() {
    var currentUser;
    return {
      setCurrentUser : function(user) {
        currentUser = user;
        console.log(currentUser);
      },
      getCurrentUser : function() {
        return currentUser;
      }
    }
  });
