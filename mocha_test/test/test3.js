const sum = require('../sum')
const chai = require('chai')
var assert = chai.assert


// describe 一组测试， 嵌套
// it 一个测试

describe('大的组测试', () =>{
    describe('小的组1测试',() =>{
        it("sum() 结果应该返回 0", () =>{
            assert.equal(sum(), 0)
        })
        it("sum(1) 结果应该返回 1", () =>{
            assert.equal(sum(1), 1)
        })
        it("sum(1, 2) 结果应该返回 3", () =>{
            assert.equal(sum(1, 2), 3)
        })
        it("sum(1, 2, 3) 结果应该返回 6", () =>{
            assert.equal(sum(1, 2, 3), 6)
        })
    })
    describe('小的组2测试',() =>{

    })
    
})
describe('大的组2测试', () =>{

})