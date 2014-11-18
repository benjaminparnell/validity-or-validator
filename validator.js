var async = require('async')

module.exports = function (validationFns) {

  return function (key, msg, object, done) {
    var result = false
      , errorMessage = ''

    if (!Array.isArray(validationFns)) {
      return done(new Error('Requires an array of validators'))
    }

    function runFn(fn, callback) {
      fn.call(null, key, msg, object, function (error, valid) {
        if (error) {
          return callback(error)
        } else if (valid === undefined) {
          result = true
          return callback()
        } else {
          errorMessage += valid
          if (validationFns.indexOf(fn) !== validationFns.length - 1) {
            errorMessage += ' or '
          }
          return callback()
        }
      })
    }

    async.each(validationFns, runFn, function (error) {
      if (error || result) {
        return done(error)
      }
      return done(null, errorMessage)
    })
  }

}
