const mysql = require('mysql')

const pool = mysql.createPool({
    host:'localhost',
    port: '3307',
    user: 'root',
    password: '123123',
    database: 'test'
})

function query(sql, cb) {
    pool.getConnection(function(err, conn){
        conn.query(sql, function(err, rows) {
            cb(err, rows)
            conn.release()
        })
    })
}

exports.query = query