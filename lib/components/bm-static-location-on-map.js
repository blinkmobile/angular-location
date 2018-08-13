/* @flow */
'use strict'

const querystring = require('querystring')

/* :: import type { Coordinates } from '../../types.js' */

const mod = require('../module.js')
const utils = require('../utils.js')
const DEFAULT_ATTRS = require('../values.js').DEFAULT_ATTRS

const API_URL = 'https://maps.googleapis.com/maps/api/staticmap'

class BmStaticLocationOnController {
  /* :: static $inject : string[] */

  // internal use

  /* :: googleMapsUrl: string */

  // public attributes (after casts)

  /* :: coords: Coordinates */
  /* :: height: number */
  /* :: width: number */
  /* :: zoom: number */

  constructor ($rootScope /* : Object */) {
    Object.assign(this, {
      googleMapsUrl: `${API_URL}?key=${$rootScope.googleMapsApiKey}`
    }, DEFAULT_ATTRS)
  }

  $onInit () {}

  $onDestroy () {}

  $onChanges () {
    this.height = this.height || DEFAULT_ATTRS.height
    this.width = this.width || DEFAULT_ATTRS.width
    this.zoom = Number(this.zoom) || DEFAULT_ATTRS.zoom

    this.coords = utils.parseCoords(this.coords)
  }

  isValid () {
    return utils.isCoordsValid(this.coords)
  }

  imgSrc () {
    const options = {
      scale: 2, // retina
      size: `${this.width}x${this.height}`,
      zoom: this.zoom
    }

    if (!this.isValid()) {
      const qsa = querystring.stringify(Object.assign({}, options, {
        center: '0,0',
        zoom: 0
      }))
      return `${this.googleMapsUrl}&${qsa}`
    }

    const qsa = querystring.stringify(Object.assign({}, options, {
      center: `${this.coords.latitude},${this.coords.longitude}`,
      markers: `color:red|${this.coords.latitude},${this.coords.longitude}`
    }))
    return `${this.googleMapsUrl}&${qsa}`
  }

  title () {
    if (!this.isValid()) {
      return 'map of unspecified location'
    }
    return `map with center at ${this.coords.latitude} latitude, ${this.coords.longitude} longitude`
  }
}

// minification-safe dependency-injection
BmStaticLocationOnController.$inject = [ '$rootScope' ]

mod.component('bmStaticLocationOnMap', {
  bindings: {
    coords: '<?',
    height: '@?',
    width: '@?',
    zoom: '@?'
  },
  controller: BmStaticLocationOnController,
  template: `
  <figure class="bm-location__map-container ob-location__map-container">
    <img class="bm-location__map ob-location__map" ng-src="{{$ctrl.imgSrc()}}" alt="{{$ctrl.title()}}" height="{{$ctrl.height}}" width="{{$ctrl.height}}" />
  </figure>
`
})

module.exports = {
  BmStaticLocationOnController
}
