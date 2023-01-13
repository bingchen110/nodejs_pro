const express = require('express')

const router = express.Router()

router.get('/', (req, res) =>{
    console.log(req.query)
    res.send('home')
})

router.post('/', (req, res) =>{
    console.log(req.body)
    res.send('home')
})

module.exports = router