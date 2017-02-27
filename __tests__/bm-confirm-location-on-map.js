/* @flow */
'use strict'

// see: https://docs.angularjs.org/guide/unit-testing
// see: http://facebook.github.io/jest/docs/tutorial-jquery.html

const ng = require('angular')
require('angular-mocks')

jest.mock('@blinkmobile/geolocation', () => ({
  getCurrentPosition: jest.fn(() => Promise.resolve({
    coords: { latitude: 10, longitude: 10 }
  }))
}))

const fakes = require('./helpers/fakes.js')
const mod = require('../lib/components/bm-confirm-location-on-map.js')
require('../lib/index.js')

beforeEach(ng.mock.module('bmLocation'))

let $compile, $rootScope
beforeEach(ng.mock.inject((_$compile_, _$rootScope_) => {
  $compile = _$compile_
  $rootScope = _$rootScope_
}))

test('no attributes', () => {
  expect(() => {
    $rootScope.googleMapsApiKey = 'secret'
    const html = `
    <bm-confirm-location-on-map></bm-confirm-location-on-map>
    `
    $compile(html)($rootScope)
  }).toThrow()
})

test('$rootScope.googleMapsApiKey [ng-model]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  $rootScope.coords = null
  const html = `
  <bm-confirm-location-on-map
    ng-model="coords"
  ></bm-confirm-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('$rootScope.googleMapsApiKey [ng-disabled] [ng-model]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  $rootScope.coords = null
  const html = `
  <bm-confirm-location-on-map
    ng-disabled="ng-disabled"
    ng-model="coords"
  ></bm-confirm-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('$rootScope.googleMapsApiKey [ng-model] [ng-readonly]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  $rootScope.coords = null
  const html = `
  <bm-confirm-location-on-map
    ng-readonly="ng-readonly"
    ng-model="coords"
  ></bm-confirm-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('$rootScope.googleMapsApiKey [ng-disabled] [ng-model] [ng-readonly]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  $rootScope.coords = null
  const html = `
  <bm-confirm-location-on-map
    ng-disabled="ng-disabled"
    ng-model="coords"
    ng-readonly="ng-readonly"
  ></bm-confirm-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('controller constructor', () => {
  const ctrl = new mod.BmConfirmLocationOnMapController({ $apply: () => {} })
  expect(ctrl).toBeDefined()
})

test('onEdit() does not trigger geolocation if coords is set', () => {
  const ctrl = new mod.BmConfirmLocationOnMapController({ $apply: () => {} })
  const { getCurrentPosition } = require('@blinkmobile/geolocation')

  ctrl.onChange({ latitude: 10, longitude: 10 })
  ctrl.onEdit()

  expect((getCurrentPosition /* : Function */).mock.calls.length).toBe(0)
})

test('onEdit() does trigger geolocation if coords is set', () => {
  const ctrl = new mod.BmConfirmLocationOnMapController({ $apply: () => {} })
  const { getCurrentPosition } = require('@blinkmobile/geolocation')

  ctrl.onChange(null)
  ctrl.onEdit()

  expect((getCurrentPosition /* : Function */).mock.calls.length).toBe(1)
})

test('$onChanges correctly copies coords', () => {
  const ctrl = new mod.BmConfirmLocationOnMapController({ $apply: () => {} })

  const FAKE_COORDS = { latitude: 20, longitude: 20 }
  ctrl.ngModel = Object.assign(fakes.fakeNgModel(), { $viewValue: FAKE_COORDS })

  ctrl.$onChanges()

  expect(ctrl.coords).toMatchObject(FAKE_COORDS)
})
