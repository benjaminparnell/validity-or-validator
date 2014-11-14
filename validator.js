module.exports = function (firstValidationFn, secondValidationFn) {

  return function (key, msg, object, callback) {
    var result = false
      , errorMessage = ''

    firstValidationFn(key, msg, object, function (error, valid) {
      if (valid === undefined) {
        result = true
      } else {
        errorMessage += valid + ' or '
      }

      secondValidationFn(key, msg, object, function (error, valid) {
        if (valid === undefined) {
          result = true
        } else {
          errorMessage += valid
        }

        if (result) {
          return callback(null)
        } else {
          return callback(null, errorMessage)
        }
      })
    })
  }

}
