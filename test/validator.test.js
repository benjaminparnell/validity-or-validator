var or = require('../')
  , validity = require('validity')
  , assert = require('assert')

describe('or validator', function () {

  it('should return undefined if both validators pass', function () {
    var obj = { email: 'me@benparnell.com' }
    or(validity.email, validity.required)('email', 'email', obj, function (error, valid) {
      assert.equal(valid, undefined)
    })
  })

  it('should return undefined if one validator passes', function () {
    var obj = { email: 'me@benparnell.com' }
    or(validity.integer, validity.email)('email', 'email', obj, function (error, valid) {
      assert.equal(valid, undefined)
    })
  })

  it('should not return if both validators fail', function () {
    var obj = { email: 'a' }
    or(validity.integer, validity.email)('email', 'email', obj, function (error, valid) {
      assert.notEqual(valid, undefined)
    })
  })

})
