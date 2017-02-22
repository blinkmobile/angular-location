/* @flow */
'use strict'

/* :: import type {
  AngularCallback, Coordinates, GoogleMapsMouseEvent
} from '../../types.js' */

const mod = require('../module.js')
const utils = require('../utils.js')
const DEFAULT_ATTRS = require('../values.js').DEFAULT_ATTRS

const JS_URL = 'https://maps.google.com/maps/api/js'

class BmLocationOnMapController {
  /* :: static $inject: string[] */

  // internal use

  /* :: googleMapsUrl: string */
  /* :: onDragEnd: (event: Object) => void */
  /* :: style: Object */

  // public attributes (after casts / checks)

  /* :: coords: Coordinates */
  /* :: height: number */
  /* :: ngDisabled: boolean */
  /* :: ngReadonly: boolean */
  /* :: onChange: AngularCallback */
  /* :: width: number */
  /* :: zoom: number */

  constructor ($rootScope /* : Object */) {
    Object.assign(this, {
      googleMapsUrl: `${JS_URL}?key=${$rootScope.googleMapsApiKey}`
    }, DEFAULT_ATTRS)

    this.onDragEnd = this.onDragEnd.bind(this) // take back from ngMap marker
  }

  $onInit () {}

  $onDestroy () {}

  $onChanges () {
    this.ngDisabled = utils.parseBooleanAttribute(this.ngDisabled)
    this.ngReadonly = utils.parseBooleanAttribute(this.ngReadonly)

    this.height = Number(this.height) || DEFAULT_ATTRS.height
    this.width = Number(this.width) || DEFAULT_ATTRS.width
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

  onDragEnd (event /* : GoogleMapsMouseEvent */) {
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

// minification-safe dependency-injection
BmLocationOnMapController.$inject = [ '$rootScope' ]

mod.component('bmLocationOnMap', {
  bindings: {
    coords: '<?',
    height: '@?',
    ngDisabled: '@?',
    ngReadonly: '@?',
    onChange: '&?',
    width: '@?',
    zoom: '@?'
  },
  controller: BmLocationOnMapController,
  template: `
  <bm-static-location-on-map
    ng-if="$ctrl.ngDisabled"
    coords="$ctrl.coords"
  ></bm-static-location-on-map>
  <figure
    class="bm-location__map-container"
    ng-if="!$ctrl.ngDisabled"
    map-lazy-load="https://maps.google.com/maps/api/js"
    map-lazy-load-params="{{$ctrl.googleMapsUrl}}"
  >
    <ng-map
      class="bm-location__map"
      ng-style="{{$ctrl.style}}"
      center="{{$ctrl.center()}}"
      zoom="{{$ctrl.zoom}}"
    >
      <marker
        animation="Animation.DROP"
        draggable="{{!$ctrl.ngReadonly}}"
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
