# blinkmobile / angular-location [![npm](https://img.shields.io/npm/v/@blinkmobile/angular-location.svg?maxAge=2592000)](https://www.npmjs.com/package/@blinkmobile/angular-location) [![Travis CI Status](https://travis-ci.org/blinkmobile/angular-location.js.svg?branch=master)](https://travis-ci.org/blinkmobile/angular-location.js)

Angular 1.x components for maps and geolocation


## API


### Configuration

You must define a "googleMapsApiKey" property on the `$rootScope` with your API key.


### bmStaticLocationOnMap

Displays an inert map, with a pin at the desired coordinates

Uses Google's Static Maps API

Attributes:

-   coords?: string | { latitude: number, longitude, number }
-   height?: number | string
-   width?: number | string
-   zoom?: number | string


### bmLocationOnMap

Displays an interactive map, with a pin at the desired coordinates

Uses Google's JavaScript Maps API

Attributes:

-   disabled?: boolean | string
-   onChange?: function
-   readonly?: boolean | string
-   ... plus all attributes for bmStaticLocationOnMap (above)

If "disabled", then the map will not be interactive at all

If "readonly", then user can pan the map, but the pin will be inert

Otherwise, the pin is interactive and the user may reposition it

This features a 1-way data-binding design, so this component notifies the parent controller / component / scope when the pin's position changes


## Testing

You may find it useful to temporarily change the Google Maps API key in the example app.js file to perform manual tests.

Take care not to commit this to version control.
