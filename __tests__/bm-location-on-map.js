/* @flow */
'use strict'

// see: https://docs.angularjs.org/guide/unit-testing
// see: http://facebook.github.io/jest/docs/tutorial-jquery.html

const ng = require('angular')
require('angular-mocks')

const mod = require('../lib/components/bm-location-on-map.js')
require('../lib/index.js')

beforeEach(ng.mock.module('bmLocation'))

let $compile, $rootScope
beforeEach(ng.mock.inject((_$compile_, _$rootScope_) => {
  $compile = _$compile_
  $rootScope = _$rootScope_
}))

test('no attributes', () => {
  const html = '<bm-location-on-map></bm-location-on-map>'

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('$rootScope.googleMapsApiKey, [coords]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  const coords = JSON.stringify({ latitude: -35, longitude: 150 })

  const html = `
  <bm-location-on-map
    coords='${coords}'
  ></bm-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('$rootScope.googleMapsApiKey, [coords] [ng-disabled]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  const coords = JSON.stringify({ latitude: -35, longitude: 150 })

  const html = `
  <bm-location-on-map
    coords='${coords}'
    ng-disabled="ng-disabled"
  ></bm-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('$rootScope.googleMapsApiKey, [coords] [ng-readonly]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  const coords = JSON.stringify({ latitude: -35, longitude: 150 })

  const html = `
  <bm-location-on-map
    coords='${coords}'
    ng-readonly="ng-readonly"
  ></bm-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('$rootScope.googleMapsApiKey, [coords] [ng-disabled] [ng-readonly]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  const coords = JSON.stringify({ latitude: -35, longitude: 150 })

  const html = `
  <bm-location-on-map
    coords='${coords}'
    ng-disabled="ng-disabled"
    ng-readonly="ng-readonly"
  ></bm-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('controller constructor', () => {
  const ctrl = new mod.BmLocationOnMapController({})
  expect(ctrl).toBeDefined()
})

test('$onChanges correctly populates style', () => {
  const ctrl = new mod.BmLocationOnMapController({})

  const FAKE_STYLE = { height: 600, width: 600 }
  Object.assign(ctrl, FAKE_STYLE)

  ctrl.$onChanges()

  expect(ctrl.style).toMatchObject(FAKE_STYLE)
})
