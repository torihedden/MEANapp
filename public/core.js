// js/core.js

angular.module('ironLibraryApp', ['ngRoute', 'mainModule', 'userModule', 'todoService', 'userService'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/', {
      templateUrl : 'views/home.html'
    })

    .when('/users', {
      templateUrl : 'views/allUsers.html'
    })

    .when('/newBook', {
      templateUrl : 'views/bookEntry.html'
    })

    .when('/catalogue', {
      templateUrl : 'views/viewCatalogue.html'
    })

    .when('/return', {
      templateUrl : 'views/returnBook.html'
    })


    // .when('/details/:_id', {
    //   templateUrl : 'views/details.html'
    // })

     // use the HTML5 History API
    $locationProvider.html5Mode(true);

  });

  // TODO: implement nicer URLS (aka minus the hashtag)
  // https://scotch.io/tutorials/pretty-urls-in-angularjs-removing-the-hashtag
  // http://www.getursolution.com/2016/06/15/angularjs-pretty-url-remove-hash/
