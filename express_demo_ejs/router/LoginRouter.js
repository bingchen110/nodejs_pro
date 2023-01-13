const express = require('express')

const router = express.Router()

router.get('/', (req, res) =>{
    // console.log(req.query)
    // res.send('login') // send片段 & json
    // res.json([1,2,3]) // json

    // 渲染模板后返回给前端
    res.render("login", {error: ''}) // 找views文件夹下的login.ejs
})

router.post('/', (req, res) =>{
    if(req.body.username === 'zs' && req.body.password === '123123') {
        res.redirect('/home')
    }else {
        res.render('login', {error: '登录失败，用户名密码不匹配'})
    }
    
})



module.exports = router