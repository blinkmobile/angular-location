/* @flow */
'use strict'

const geolocation = require('@blinkmobile/geolocation')

/* :: import type { NgModelController } from '../../types.js' */

const mod = require('../module.js')
const utils = require('../utils.js')

class BmConfirmLocationOnMapController {
  /* :: static $inject : string[] */

  // internal use

  /* :: isEditing: boolean */

  // public attributes (after casts / checks)

  /* :: ngDisabled: boolean */
  /* :: ngModel: NgModelController */
  /* :: ngReadonly: boolean */

  constructor () {
    this.isEditing = false
  }

  $onInit (...args) {
  }

  $onChanges (...args) {
    this.ngDisabled = utils.parseBooleanAttribute(this.ngDisabled)
    this.ngReadonly = utils.parseBooleanAttribute(this.ngReadonly)
  }

  onCancel (event /* : Event */) {
    this.ngModel.$rollbackViewValue()
    this.isEditing = false
  }

  onClear (event /* : Event */) {
    this.ngModel.$setViewValue(null, event)
    this.ngModel.$commitViewValue()
  }

  onConfirm (event /* : Event */) {
    this.ngModel.$commitViewValue()
    this.isEditing = false
  }

  onFindMe (event /* : Event */) {
    geolocation.getCurrentPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords
        this.ngModel.$setViewValue({ latitude, longitude }, event)
      })
  }

  onEdit (event /* : Event */) {
    this.isEditing = true
  }
}

BmConfirmLocationOnMapController.$inject = []

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
      coords="$ctrl.ngModel.$viewValue"
      ng-disabled="{{!$ctrl.isEditing}}"
      ng-readonly="{{$ctrl.ngReadonly}}"
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
