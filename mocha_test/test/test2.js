const chai = require('chai')
var assert = chai.assert

describe('assert Demo', () =>{
    it('use assert lib', () =>{
        var value = 'hello'
        assert.typeOf(value, 'string')
        assert.equal(value, 'hello')
        assert.lengthOf(value, 5)
    })
})