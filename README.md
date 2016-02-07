# druids

> These are the druids you are looking for.

Dependency Reporter UI Data Server, used as middleware between dep-rep and, most likely, a frontend UI.

## Install

```
npm i (-g) druids
```

## CLI

If you installed it globally, just run `druids`

This will start a RESTful server on http://localhost:3221

You can set another port by running:

```
druids --port 4000
```

## NPM

If you want to use druids as node module:

```
var druids = require('../druids')

druids.exec(options);
```

Options has the following optional properties:

```
var options = {
    port: 4000      // Default value is 3221
}
```

## Use

### Remotely hosted package.json

http://localhost:3000/dep-rep?remote=https://raw.githubusercontent.com/kevin-smets/clam/master/package.json

Beware: the url query is passed on to dep-rep *AS-IS*.

### Local package.json

First, create a locals.json in druids's folder root. Run `which druids` in terminal to find this folder if you're unsure. It can look like this:

```
{
  "dep-rep": "../dep-rep/package.json",
  "druids": "package.json"
}
```

To then GET the available locals: http://localhost:3000/dep-rep/locals

To GET the dependency report for a given local: http://localhost:3000/dep-rep/local/dep-rep

## Disclaimer

This project is currently in alpha, at best. It's not meant to run this middleware publicly, anywhere.

This is currently not in scope either so I'm not looking into any security concerns as of yet.