/* @flow */
'use strict'

const geolocation = require('@blinkmobile/geolocation')

/* :: import type {
  AngularCallbackOptions, Coordinates, NgModelController
} from '../../types.js' */

const mod = require('../module.js')
const utils = require('../utils.js')

class BmConfirmLocationOnMapController {
  /* :: static $inject : string[] */

  // internal use

  /* :: $apply: () => () => void */
  /* :: coords: ?Coordinates */
  /* :: isEditing: boolean */

  // public attributes (after casts / checks)

  /* :: ngDisabled: boolean */
  /* :: ngModel: NgModelController */
  /* :: ngReadonly: boolean */

  constructor ($scope /* : Object */) {
    this.$apply = $scope.$apply.bind($scope)
    this.coords = null
    this.isEditing = false
  }

  $onInit () {
    this.ngModel.$render = () => {
      this.coords = this.ngModel.$viewValue
    }
  }

  $onDestroy () {
    delete this.ngModel.$render
  }

  $onChanges () {
    this.ngDisabled = utils.parseBooleanAttribute(this.ngDisabled)
    this.ngReadonly = utils.parseBooleanAttribute(this.ngReadonly)
    this.coords = this.ngModel.$viewValue
  }

  onCancel (event /* : Event */) {
    this.coords = this.ngModel.$viewValue
    this.isEditing = false
  }

  onChange (value /* : ?Coordinates */) {
    this.coords = value
  }

  onClear (event /* : Event */) {
    this.coords = null
    this.ngModel.$setViewValue(this.coords, event)
  }

  onConfirm (event /* : Event */) {
    this.isEditing = false
    this.ngModel.$setViewValue(this.coords, event)
  }

  isCoordsValid () {
    return utils.isCoordsValid(this.coords)
  }

  onFindMe () {
    geolocation.getCurrentPosition()
      .then((position) => {
        this.$apply(() => {
          if (position.coords) {
            const { latitude = 0, longitude = 0 } = position.coords || {}
            this.coords = { latitude, longitude }
          } else {
            this.coords = null
          }
        })
      })
      .catch((err /* : Error */) => {
        /* eslint-disable no-console */ // useful for debugging
        console.error('geolocation.getCurrentPosition()', err)
        /* eslint-enable no-console */
        this.coords = null
      })
  }

  onEdit () {
    this.isEditing = true
    if (!this.isCoordsValid()) {
      this.onFindMe()
    }
  }
}

// minification-safe dependency-injection
BmConfirmLocationOnMapController.$inject = [ '$scope' ]

mod.component('bmConfirmLocationOnMap', {
  bindings: {
    ngDisabled: '@?',
    ngReadonly: '@?'
  },
  controller: BmConfirmLocationOnMapController,
  require: {
    ngModel: 'ngModel'
  },
  template: `
  <div class="bm-location">
    <bm-location-on-map
      coords="$ctrl.coords"
      ng-disabled="{{!$ctrl.isEditing}}"
      ng-readonly="{{$ctrl.ngReadonly}}"
      on-change="$ctrl.onChange(value)"
      ng-if="$ctrl.isEditing || $ctrl.isCoordsValid()"
    ></bm-location-on-map>

    <div
      class="bm-button-container bm-location__button-container"
      ng-if="!$ctrl.ngDisabled &amp;&amp; !$ctrl.ngReadonly"
    >

      <button type="button"
        class="bm-button bm-button-cancel bm-location__button bm-location__button-cancel"
        ng-if="$ctrl.isEditing"
        ng-click="$ctrl.onCancel()"
      >Cancel</button>
      <button type="button"
        class="bm-button bm-button-confirm bm-location__button bm-location__button-confirm"
        ng-if="$ctrl.isEditing"
        ng-click="$ctrl.onConfirm()"
      >Confirm</button>

      <button type="button"
        class="bm-button bm-button-clear bm-location__button bm-location__button-clear"
        ng-if="!$ctrl.isEditing"
        ng-click="$ctrl.onClear()"
      >Clear</button>
      <button type="button"
        class="bm-button bm-button-edit bm-location__button bm-location__button-edit"
        ng-if="!$ctrl.isEditing"
        ng-click="$ctrl.onEdit()"
      >Locate
      </button>

    </div>
  </div>
`
})

module.exports = {
  BmConfirmLocationOnMapController
}
