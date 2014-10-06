// flicker_viewer App

angular.module('flicker_viewer', ['ngRoute','flicker_viewer.controllers']) //['ui.router', 'flicker_viewer.controllers', 'ngGrid'])

.config(function($routeProvider, $locationProvider) {
  $routeProvider

    .when('/', {
        templateUrl: "templates/home.html",
        controller: "homeCtrl"
    })
});

