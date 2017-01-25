/* @flow */
'use strict'

const querystring = require('querystring')

const mod = require('../module.js')

const API_URL = 'https://maps.googleapis.com/maps/api/staticmap'

const utils = require('../utils.js')
const DEFAULT_ATTRS = require('../values.js').DEFAULT_ATTRS

class BmStaticLocationOnController {
  constructor ($rootScope) {
    Object.assign(this, { $rootScope }, DEFAULT_ATTRS)
  }

  $onInit () {}

  $onDestroy () {
    this.$rootScope = null
  }

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
    if (!this.isValid()) {
      return ''
    }
    const qsa = querystring.stringify({
      center: `${this.coords.latitude},${this.coords.longitude}`,
      key: this.$rootScope.googleMapsApiKey,
      markers: `color:red|${this.coords.latitude},${this.coords.longitude}`,
      scale: 2, // retina
      size: `${this.width}x${this.height}`,
      zoom: this.zoom
    })
    return `${API_URL}?${qsa}`
  }

  title () {
    if (!this.isValid()) {
      return 'map of unspecified location'
    }
    return `map with center at ${this.coords.latitude} latitude, ${this.coords.longitude} longitude`
  }
}
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
  <figure>
    <img ng-src="{{$ctrl.imgSrc()}}" title="{{$ctrl.title()}}" height="{{$ctrl.height}}" width="{{$ctrl.height}}" />
  </figure>
`
})

module.exports = {
  BmStaticLocationOnController
}
