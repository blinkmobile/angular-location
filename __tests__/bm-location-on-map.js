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

test('adds component template HTML to DOM', () => {
  const element = $compile('<bm-location-on-map></bm-location-on-map>')($rootScope)
  $rootScope.$digest()
  expect(element.html()).toMatchSnapshot()
})
