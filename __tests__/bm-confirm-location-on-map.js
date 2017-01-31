/* @flow */
'use strict'

// see: https://docs.angularjs.org/guide/unit-testing
// see: http://facebook.github.io/jest/docs/tutorial-jquery.html

const ng = require('angular')
require('angular-mocks')

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
  const ctrl = new mod.BmConfirmLocationOnMapController({})
  expect(ctrl).toBeDefined()
})
