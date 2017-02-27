# blinkmobile / angular-location [![npm](https://img.shields.io/npm/v/@blinkmobile/angular-location.svg?maxAge=2592000)](https://www.npmjs.com/package/@blinkmobile/angular-location) [![Travis CI Status](https://travis-ci.org/blinkmobile/angular-location.js.svg?branch=master)](https://travis-ci.org/blinkmobile/angular-location.js)

Angular 1.x components for maps and geolocation


## API


### Configuration

You must define a "googleMapsApiKey" property on the `$rootScope` with your API key.

```js
(function () {
  'use strict'

  const mod = angular.module('app', [ 'bmLocation' ])

  mod.run([
    '$rootScope', // minification-safe dependency-injection
    ($rootScope) => {
      $rootScope.googleMapsApiKey = 'secret'
    }
  ])
}())
```


### bmStaticLocationOnMap

Displays an inert map, with a pin at the desired coordinates

Uses Google's Static Maps API

Attributes:

-   coords?: string | { latitude: number, longitude, number }
-   height?: number | string
-   width?: number | string
-   zoom?: number | string

```html
<bm-static-location-on-map
  coords='{"latitude":10,"longitude":10}'
></bm-static-location-on-map>
```


### bmLocationOnMap

Displays an interactive map, with a pin at the desired coordinates

Uses Google's JavaScript Maps API

Attributes:

-   ngDisabled?: boolean | string
-   ngReadonly?: boolean | string
-   onChange?: function
-   ... plus all attributes for bmStaticLocationOnMap (above)

If "ngDisabled", then the map will not be interactive at all

If "ngReadonly", then user can pan the map, but the pin will be inert

Otherwise, the pin is interactive and the user may reposition it

This features a 1-way data-binding design, so this component notifies the parent controller / component / scope when the pin's position changes

```html
<div ng-controller="MyController">
  <bm-location-on-map
    coords="coords"
    on-change="onChange(value)"
  ></bm-location-on-map>
</div>
```

```js
class MyController {
  constructor () {
    this.coords = { latitude: 10, longitude: 10 }
  }
  onChange (value) {
    this.coords = value
  }
}
mod.controller('MyController', MyController)
```

Note: in your HTML template, for your on-change handler, you must name the argument `value`


### bmConfirmLocationOnMap

Displays an interactive map, with a pin at the desired coordinates

Uses Google's JavaScript Maps API

Attributes:

-   ngDisabled?: boolean | string
-   ngReadonly?: boolean | string
-   ngModel?: [ngModel](https://docs.angularjs.org/api/ng/directive/ngModel)

Field is interactive when neither "ngDisabled" or "ngReadonly" are truthy

This features a 2-way data-binding design via ngModel

```html
<div ng-controller="MyController as $ctrl">
  <bm-confirm-location-on-map
    ng-model="$ctrl.coords"
  ></bm-confirm-location-on-map>
</div>
```

```js
class MyController {
  constructor () {
    this.coords = { latitude: 10, longitude: 10 }
  }
}
mod.controller('MyController', MyController)
```


## Development

-   `npm run build` produces output in the "dist" directory

-   `npm test` executes tests


## Testing

We recommend using [http-server](https://github.com/indexzero/http-server) or similar.

You may find it useful to temporarily change the Google Maps API key in the example app.js file to perform manual tests.
Take care not to commit this to version control.
