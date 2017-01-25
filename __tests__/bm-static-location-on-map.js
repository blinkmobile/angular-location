/* @flow */
'use strict'

// see: https://docs.angularjs.org/guide/unit-testing
// see: http://facebook.github.io/jest/docs/tutorial-jquery.html

const ng = require('angular')
require('angular-mocks')

require('../lib/index.js')

beforeEach(ng.mock.module('bmLocation'))

let $compile, $rootScope
beforeEach(ng.mock.inject((_$compile_, _$rootScope_) => {
  $compile = _$compile_
  $rootScope = _$rootScope_
}))

test('no attributes', () => {
  const html = '<bm-static-location-on-map></bm-static-location-on-map>'

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('$rootScope.googleMapsApiKey, [coords], [height], [width], [zoom]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  const coords = JSON.stringify({ latitude: -35, longitude: 150 })

  const html = `
  <bm-static-location-on-map
    coords='${coords}'
    height="200"
    width="200"
    zoom="10"
  ></bm-static-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})

test('invalid [coords]', () => {
  $rootScope.googleMapsApiKey = 'secret'
  const html = `
  <bm-static-location-on-map
    coords="abc"
  ></bm-static-location-on-map>
  `

  const element = $compile(html)($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})
