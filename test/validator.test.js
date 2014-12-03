var or = require('../')
  , validity = require('validity')
  , assert = require('assert')

function errorValidator(key, msg, obj, callback) {
  return callback(new Error('Error!'))
}

describe('or validator', function () {

  it('should return undefined if both validators pass', function () {
    var obj = { email: 'me@benparnell.com' }
    or([ validity.email, validity.required ])('email', 'email', obj, function (error, valid) {
      assert.equal(valid, undefined)
    })
  })

  it('should return undefined if one validator passes', function () {
    var obj = { email: 'me@benparnell.com' }
    or([ validity.integer, validity.email ])('email', 'email', obj, function (error, valid) {
      assert.equal(valid, undefined)
    })
  })

  it('should not return undefined if both validators fail', function () {
    var obj = { email: 'a' }
    or([ validity.integer, validity.email ])('email', 'email', obj, function (error, valid) {
      assert.notEqual(valid, undefined)
      assert.equal(valid, 'email must be an integer or email must be a valid email address')
    })
  })

  it('should return an error if one of the validators produces one', function () {
    var obj = { email: 'me@benparnell.com' }
    or([ validity.email, errorValidator ])('email', 'email', obj, function (error, valid) {
      assert.equal(error.message, 'Error!')
      assert.equal(valid, undefined)
    })
  })

  it('should return an error if an array isnt passed as the argument', function () {
    or(1)(null, null, null, function (error) {
      assert.equal(error.message, 'Requires an array of validators')
    })
  })

  it('should return a custom error message if passed one when both validators fail', function () {
    var obj = { email: 'a' }
    or([ validity.integer, validity.email ], 'Custom error message!')('email', 'email', obj, function (error, valid) {
      assert.equal(error, null)
      assert.equal(valid, 'Custom error message!')
    })
  })

})
