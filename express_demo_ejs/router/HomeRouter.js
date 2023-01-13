const express = require('express')

const router = express.Router()

router.get('/', (req, res) =>{
    let list = ['aaa','bbbbb', 'c']
    let html = '<b>消息。。。</b>'
    res.render('home', {list, html})
})

router.post('/', (req, res) =>{
    console.log(req.body)
    res.send('home')
})

module.exports = router