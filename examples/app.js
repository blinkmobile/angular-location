/* @flow */

/* global angular */
/* :: declare var angular: any */ // FlowType global

(function () {
  'use strict'

  const mod = angular.module('app', [ 'bmLocation' ])

  mod.run([
    '$rootScope',
    ($rootScope) => {
      $rootScope.googleMapsApiKey = 'secret'
    }
  ])

  mod.controller('BmLocationOnMapDemoController', [
    '$scope',
    function BmLocationOnMapDemoController ($scope) {
      $scope.demo = {
        coords: {
          latitude: -30,
          longitude: 140
        },
        disabled: null,
        readonly: null
      }

      $scope.onChange = function (newCoords) {
        $scope.demo.coords = newCoords
      }
    }
  ])
}())
