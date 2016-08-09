// js/core.js

angular.module('bogoTodo', ['ngRoute', 'todoController', 'todoService'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/', {
      templateUrl : 'views/home.html'
    })

    .when('/details/:_id', {
      templateUrl : 'views/details.html'
    })

     // use the HTML5 History API
    $locationProvider.html5Mode(true);

  });

  // TODO: implement nicer URLS (aka minus the hashtag)
  // https://scotch.io/tutorials/pretty-urls-in-angularjs-removing-the-hashtag
