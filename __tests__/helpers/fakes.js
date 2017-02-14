/* @flow */
'use strict'

/* :: import type { NgModelController } from '../../types.js' */

const noop = () => undefined

const fakeNgModel = () /* : NgModelController */ => ({
  $commitViewValue: noop,
  $isEmpty: (value /* : any */) => true,
  $render: noop,
  $rollbackViewValue: noop,
  $setDirty: noop,
  $setPristine: noop,
  $setTouched: noop,
  $setUntouched: noop,
  $setValidity: noop,
  $setViewValue: noop,
  $validate: () => true,

  $modelValue: null,
  $viewValue: null
})

module.exports = {
  fakeNgModel
}
