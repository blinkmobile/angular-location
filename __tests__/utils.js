/* @flow */
'use strict'

const utils = require('../lib/utils.js')

test('isCoordsValid(falsey)', () => {
  const result = utils.isCoordsValid('')
  expect(result).toBe(false)
})

test('isCoordsValid() latitude:NaN ', () => {
  const result = utils.isCoordsValid({ latitude: 'abc', longitude: 10 })
  expect(result).toBe(false)
})

test('isCoordsValid(coords)', () => {
  const result = utils.isCoordsValid({ latitude: '20', longitude: 10 })
  expect(result).toBe(true)
})

test('parseBooleanAttribute("true")', () => {
  const result = utils.parseBooleanAttribute('true')
  expect(result).toBe(true)
})

test('parseBooleanAttribute("false")', () => {
  const result = utils.parseBooleanAttribute('false')
  expect(result).toBe(false)
})

test('parseBooleanAttribute("anything")', () => {
  const result = utils.parseBooleanAttribute('anything')
  expect(result).toBe(true)
})

test('parseBooleanAttribute(falsey)', () => {
  const result = utils.parseBooleanAttribute('')
  expect(result).toBe(false)
})

test('parseCoords(undefined)', () => {
  const result = utils.parseCoords(undefined)
  expect(result).toMatchObject({})
})

test('parseCoords("not JSON")', () => {
  const result = utils.parseCoords('not JSON')
  expect(result).toMatchObject({})
})

test('parseCoords() good JSON', () => {
  const data = { latitude: 123, longitude: 123 }
  const result = utils.parseCoords(JSON.stringify(data))
  expect(result).toMatchObject(data)
})
