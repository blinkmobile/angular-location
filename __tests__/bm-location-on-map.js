/* @flow */
'use strict'

// see: https://docs.angularjs.org/guide/unit-testing
// see: http://facebook.github.io/jest/docs/tutorial-jquery.html

const ng = require('angular')
require('angular-mocks')
require('ngmap')

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

test('$rootScope.googleMapsApiKey, [coords] [disabled]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  const coords = JSON.stringify({ latitude: -35, longitude: 150 })

  const html = `
  <bm-location-on-map
    coords='${coords}'
    disabled="disabled"
  ></bm-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('$rootScope.googleMapsApiKey, [coords] [readonly]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  const coords = JSON.stringify({ latitude: -35, longitude: 150 })

  const html = `
  <bm-location-on-map
    coords='${coords}'
    readonly="readonly"
  ></bm-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('$rootScope.googleMapsApiKey, [coords] [disabled] [readonly]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  const coords = JSON.stringify({ latitude: -35, longitude: 150 })

  const html = `
  <bm-location-on-map
    coords='${coords}'
    disabled="disabled"
    readonly="readonly"
  ></bm-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})
