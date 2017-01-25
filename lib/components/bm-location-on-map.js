/* @flow */
'use strict'

const mod = require('../module.js')

const utils = require('../utils.js')
const DEFAULT_ATTRS = require('../values.js').DEFAULT_ATTRS

const JS_URL = 'https://maps.google.com/maps/api/js'

class BmLocationOnMapController {
  constructor ($rootScope) {
    Object.assign(this, {
      $rootScope,

      googleMapsUrl: `${JS_URL}?key=${$rootScope.googleMapsApiKey}`
    }, DEFAULT_ATTRS)

    this.onDragEnd = this.onDragEnd.bind(this) // take back from ngMap marker
  }

  $onInit () {}

  $onDestroy () {
    this.$rootScope = null
  }

  $onChanges () {
    this.disabled = utils.parseBooleanAttribute(this.disabled)
    this.readonly = utils.parseBooleanAttribute(this.readonly)

    this.height = this.height || DEFAULT_ATTRS.height
    this.width = this.width || DEFAULT_ATTRS.width
    this.zoom = Number(this.zoom) || DEFAULT_ATTRS.zoom

    this.coords = utils.parseCoords(this.coords)

    this.style = {
      height: this.height,
      width: this.width
    }
  }

  center () {
    if (utils.isCoordsValid(this.coords)) {
      return [ this.coords.latitude, this.coords.longitude ]
    }
    return [ 0, 0 ]
  }

  // for an explanation of `this.onChange({ value: { /* ... */ } })`
  // see: http://www.codelord.net/2016/05/13/understanding-angulars-and-binding/

  onDragEnd (event) {
    if (typeof this.onChange === 'function') {
      this.onChange({
        value: {
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng()
        }
      })
    }
  }
}
BmLocationOnMapController.$inject = [ '$rootScope' ]

mod.component('bmLocationOnMap', {
  bindings: {
    coords: '<?',
    disabled: '@?',
    height: '@?',
    onChange: '&?',
    readonly: '@?',
    width: '@?',
    zoom: '@?'
  },
  controller: BmLocationOnMapController,
  template: `
  <bm-static-location-on-map
    ng-if="$ctrl.disabled"
    coords="$ctrl.coords"
  ></bm-static-location-on-map>
  <figure
    ng-if="!$ctrl.disabled"
    map-lazy-load="https://maps.google.com/maps/api/js"
    map-lazy-load-params="{{$ctrl.googleMapsUrl}}"
  >
    <ng-map
      ng-style="{{$ctrl.style}}"
      center="{{$ctrl.center()}}"
      zoom="{{$ctrl.zoom}}"
    >
      <marker
        animation="Animation.DROP"
        draggable="{{!$ctrl.readonly}}"
        on-dragend="$ctrl.onDragEnd()"
        position="{{$ctrl.center()}}"
      ></marker>
    </ng-map>
  </figure>
`
})

module.exports = {
  BmLocationOnMapController
}
