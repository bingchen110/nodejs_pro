const app = require('express')()
const db = require('./db/db')

app.use('/api/get', (req, res) =>{
    db.query('select * from user;', (err, data) =>{
        if(err) {
            console.log(err)
            return
        }
        console.log(data)
        res.send(data)
    })
    
})

app.listen(9000, () =>{
    console.log('localhost:9000启动成功')
})