const express = require('express')

const router = express.Router()

router.get('/', (req, res) =>{
    console.log(req.query)
    res.send('login')
})

router.post('/', (req, res) =>{
    console.log(req.body)
    if(req.body.username === 'zs' && req.body.password === '123123') {
        res.send({
            ok: 1
        })
    }else {
        res.send({
            ok: 0
        })
    }
    
})



module.exports = router