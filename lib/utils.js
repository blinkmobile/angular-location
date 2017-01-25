/* @flow */
'use strict'

function isCoordsValid (coords) {
  if (!coords) {
    return false
  }
  const latitude = Number(coords.latitude)
  const longitude = Number(coords.longitude)
  return !isNaN(latitude) && !isNaN(longitude)
}

function parseBooleanAttribute (value) {
  if (!value || value === 'false') {
    return false
  }
  return true
}

function parseCoords (coords) {
  if (!coords) {
    return {}
  }
  if (typeof coords === 'string') {
    try {
      coords = JSON.parse(coords)
    } catch (err) {
      coords = {}
    }
  }
  return coords
}

module.exports = {
  isCoordsValid,
  parseBooleanAttribute,
  parseCoords
}
