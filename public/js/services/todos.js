// js/services/todos.js
angular.module('todoService', [])

  // super simple service
  // each function returns a promise object
  .factory('Books', function($http) {
    return {
      get : function() {
        console.log('get books from todo services');
        return $http.get('/api/todos');
      },
      create : function(todoData) {
        return $http.post('/api/todos', todoData);
      },
      delete : function(id) {
        return $http.delete('/api/todos/' + id);
      },
      update : function(todoData) {
        return $http.put('/api/todos', todoData);
      }
    }
  });
