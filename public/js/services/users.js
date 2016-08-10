angular.module('userService', [])

  // each function returns a promise object
  .factory('Users', function($http) {
    return {
      get : function() {
        return $http.get('/api/users');
      },
      create : function(userData) {
        return $http.post('/api/users', userData);
      },
      delete : function(id) {
        return $http.delete('/api/users/' + id);
      },
      update : function(userData) {
        return $http.put('/api/users', userData);
      }
    }
  });
