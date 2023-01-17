const express = require('express')
const app = express()
const mysql2 = require('mysql2')

app.get('/', async (req, res) =>{
    // 创建连接池，进行操作
    let config = getConfigDB()
    const promisePool = mysql2.createPool(config).promise()
    var users = await promisePool.query('insert into user values(?,?,?,?,?)', [12, '韩信', 80, '2020-01-22 12:00:00', 1])
    console.log(users[0]);
    res.send({
        ok: 1,
        data: users[0]
    })
})

app.listen(3000)

function getConfigDB() {
    return {
        host: '127.0.0.1',
        port: 3307,
        user: 'root',
        password: '123123',
        database: 'test',
        connectionLimit: 1
    }
}