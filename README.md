# validity-or-validator [![Build Status](https://travis-ci.org/benjaminparnell/validity-or-validator.svg)](https://travis-ci.org/benjaminparnell/validity-or-validator)

Validate that at least one validator in a group of validators passes.

## Installation

```
npm install validity-or-validator --save
```

## Usage

Below is a simple example for usage with schemata and save:

``` js
var validity = require('validity')
  , schemata = require('schemata')
  , save = require('save')
  , collection = save('article')
  , validateMailTo = require('validity-mailto-link')
  , or = require('validity-or-validator')

var schema = schemata(
    { type:
      { type: String
      }
    , callToActionLink:
      { type: String
      , validators: { all: [ or([ validity.url, validateMailTo() ]) ] }
      }
    })

```

You can also specify a custom validation message to be returned if all of the
supplied validators fail.

```js
...
, validators: { all: [ or([ validity.url, validateMailTo() ], 'Both validators failed.') ] }
...
```

The validator will produce the following error message if all validators fail:
`{validation message 1} or {validation message 2} or...`

## Credits
[Ben Parnell](https://github.com/benjaminparnell/)
