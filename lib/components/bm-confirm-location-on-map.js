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

  /* :: $digest: () => void */
  /* :: coords: ?Coordinates */
  /* :: isEditing: boolean */

  // public attributes (after casts / checks)

  /* :: ngDisabled: boolean */
  /* :: ngModel: NgModelController */
  /* :: ngReadonly: boolean */

  constructor ($scope /* : Object */) {
    this.$digest = $scope.$digest.bind($scope)
    this.coords = null
    this.isEditing = false
  }

  $onInit () {}

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

  onFindMe (event /* : Event */) {
    geolocation.getCurrentPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords || {}
        this.coords = { latitude, longitude } || null
        this.$digest()
      })
  }

  onEdit (event /* : Event */) {
    this.isEditing = true
  }
}

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
  <div>
    <bm-location-on-map
      coords="$ctrl.coords"
      ng-disabled="{{!$ctrl.isEditing}}"
      ng-readonly="{{$ctrl.ngReadonly}}"
      on-change="$ctrl.onChange(value)"
    ></bm-location-on-map>

    <div ng-if="!$ctrl.ngDisabled &amp;&amp; !$ctrl.ngReadonly">

      <button type="button"
        ng-if="$ctrl.isEditing"
        ng-click="$ctrl.onCancel()"
      >Cancel</button>
      <button type="button"
        ng-if="$ctrl.isEditing"
        ng-click="$ctrl.onFindMe()"
      >Find Me</button>
      <button type="button"
        ng-if="$ctrl.isEditing"
        ng-click="$ctrl.onConfirm()"
      >Confirm</button>

      <button type="button"
        ng-if="!$ctrl.isEditing"
        ng-click="$ctrl.onClear()"
      >Clear</button>
      <button type="button"
        ng-if="!$ctrl.isEditing"
        ng-click="$ctrl.onEdit()"
      >Edit
      </button>

    </div>
  </div>
`
})

module.exports = {
  BmConfirmLocationOnMapController
}
