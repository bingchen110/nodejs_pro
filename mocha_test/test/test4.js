// 异步测试
const fs = require('fs')
const fsp = fs.promises
const chai = require('chai')
const assert = chai.assert

describe('异步测试', () =>{
    it('异步读取文件 1.txt',async() =>{
        let data = await fsp.readFile('./1.txt', 'utf-8')
        assert.equal(data, 'hello')
    })
})