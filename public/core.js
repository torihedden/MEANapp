// js/core.js

angular.module('bogoTodo', ['ngRoute', 'todoController', 'todoService'])
  .config(function($routeProvider) {
    $routeProvider

    .when('/', {
      templateUrl : 'views/home.html'
    })

    .when('/details/:_id', {
      templateUrl : 'views/details.html'
    })

  });

  // TODO: implement nicer URLS (aka minus the hashtag)
  // https://scotch.io/tutorials/pretty-urls-in-angularjs-removing-the-hashtag
