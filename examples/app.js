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

  class BmLocationOnMapDemoController {
    // public attributes

    /* :: demo: Object */

    constructor () {
      this.demo = {
        coords: {
          latitude: -30,
          longitude: 140
        },
        disabled: null,
        readonly: null
      }
    }

    onChange (newCoords) {
      this.demo.coords = newCoords
    }
  }

  mod.controller('BmLocationOnMapDemoController', BmLocationOnMapDemoController)
}())
