module.exports = function (firstValidationFn, secondValidationFn) {

  return function (key, msg, object, callback) {
    var result = false
      , validError
    firstValidationFn(key, msg, object, function (error, valid) {
      if (valid === undefined) {
        result = true
      } else {
        validError = valid
      }
      secondValidationFn(key, msg, object, function (error, valid) {
        if (valid === undefined) {
          result = true
        } else {
          validError = valid
        }
        if (result) {
          return callback(null)
        } else {
          return callback(null, validError)
        }
      })
    })
  }

}
