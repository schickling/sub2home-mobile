[![wercker status](https://app.wercker.com/status/2c51ad0340170fd74cdbd133fe770a79/m "wercker status")](https://app.wercker.com/project/bykey/2c51ad0340170fd74cdbd133fe770a79)

sub2home-mobile
===============

## Dependencies
* NPM
* Grunt (`npm install -g gulp`)

## Usage

#### Install & Update
```sh
$ npm install
```

#### Development / Server
Starts webserver on `localhost:8080` with livereload.
```sh
$ gulp
```

#### Build (just needed for deployment)
```sh
$ gulp build
```

## Supported browsers

IE  | Firefox | Chrome | Safari | Opera | iOS  | Android | Blackberry
--- | ---     | ---    | ---    | ---   | ---  | ---     | ---
7+  | 4+      | 4+     | 5+     | 10.5+ | 3.2+ | 2.1+    | 7+

### Polyfills

* [html5shiv](https://github.com/aFarkas/html5shiv) (IE7, IE8)
* [JSON2](https://github.com/douglascrockford/JSON-js) (IE7, iOS 3.2)
