/* @flow */
'use strict'

const querystring = require('querystring')

const mod = require('../module.js')

const API_URL = 'https://maps.googleapis.com/maps/api/staticmap'

const DEFAULT_ATTRS = {
  height: '300',
  width: '300',
  zoom: 5
}

class BmStaticLocationOnController {
  constructor ($rootScope) {
    if (!new.target) {
      return new BmStaticLocationOnController($rootScope)
    }

    Object.assign(this, { $rootScope }, DEFAULT_ATTRS)
  }

  $onInit () {}

  $onDestroy () {
    this.$rootScope = null
  }

  $onChanges (...args) {
    this.height = this.height || DEFAULT_ATTRS.height
    this.width = this.width || DEFAULT_ATTRS.width
    this.zoom = Number(this.zoom) || DEFAULT_ATTRS.zoom

    if (typeof this.coords === 'string') {
      try {
        this.coords = JSON.parse(this.coords)
      } catch (err) { /* just ignore any parse errors */ }
    }
  }

  isValid () {
    if (!this.coords) {
      return false
    }
    const latitude = Number(this.coords.latitude)
    const longitude = Number(this.coords.longitude)
    return !isNaN(latitude) && !isNaN(longitude)
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
