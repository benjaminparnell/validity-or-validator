# validity-or-validator

Validate that one or both of two validators pass for the current property

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
      , validators: { all: [ or(validity.url, validateMailTo()) ] }
      }
    })

```

## Credits
[Ben Parnell](https://github.com/benjaminparnell/)