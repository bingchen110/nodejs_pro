const { default: axios } = require("axios")
// const assert = require('assert')

const supertest = require('supertest')
const app = require('../app')

// describe('http测试1', () =>{
//     it('返回html代码片段测试1',async () =>{
//         var res = await axios.get('http://localhost:3000/')
//         assert.strictEqual(res.data, '<h1>hello</h1>')
//     })
// })

describe('http测试2', () =>{
    let server
    it('返回html代码片段测试2',async () =>{
        await supertest(server).get('/')
        .expect("Content-Type", /text\/html/)
        .expect(200, '<h1>hello</h1>')
    })
    before(() =>{
        server = app.listen(3000)
    })

    after(() =>{
        server.close()
    })

    beforeEach(() =>{
        console.log('beforeEach');
    })

    afterEach(() =>{
        console.log('afterEach');
    })

})