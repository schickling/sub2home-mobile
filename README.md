[![wercker status](https://app.wercker.com/status/2c51ad0340170fd74cdbd133fe770a79/m/ "wercker status")](https://app.wercker.com/project/bykey/2c51ad0340170fd74cdbd133fe770a79)

sub2home-mobile
===============

## Dependencies
* node.js (with NPM)

## Usage

#### Install & Update
```sh
$ npm install
```

#### Development / Server
Starts webserver on `localhost:8080` with livereload.
```sh
$ npm start
```

#### Run tests

##### Once
```sh
$ npm test
```

##### Watch for changes
```sh
$ karma start
```


#### Build (just needed for deployment)
```sh
$ npm run-script build
```

## Supported browsers

IE  | Firefox | Chrome | Safari | Opera | iOS  | Android | Blackberry
--- | ---     | ---    | ---    | ---   | ---  | ---     | ---
8+  | 4+      | 4+     | 5+     | 10.5+ | 4+   | 2.1+    | 7+

### Polyfills

* [html5shiv](https://github.com/aFarkas/html5shiv) (IE8)
* [HTML5-History-API](https://github.com/devote/HTML5-History-API) (IE8, IE9, Android 2.1 - Android 4.1)
