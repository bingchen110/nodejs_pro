const Router = require('koa-router');
const router = new Router()

const multer = require('@koa/multer')
const upload = multer({dest: "public/uploads"})

const JWT = require('../utils/JWT');
const UserModel = require('../model/UserModel');

router.get('/', (ctx, next) =>{
    console.log(ctx.query, ctx.querystring)
    ctx.body = [444,555,666]
})
.post('/', (ctx, next) =>{
    console.log(ctx.request.body)
    ctx.body = {
        ok: 1
    }
})
.post('/login', (ctx, next) =>{
    const {username, password} = ctx.request.body
    if(username === 'admin' && password === '111'){
        // 设置sessionId
        // ctx.session.user = {
        //     username
        // }

        // 设置token header
        const token = JWT.generate({
            _id: '111',
            username
        }, '10s')
        // token 返回在header中
        ctx.set('Authorization', token)
        ctx.body = {
            ok: 1
        }
    }else {
        ctx.body = {
            ok: 0
        }
    }
    
})
.post('/upload', upload.single("avatar"), async (ctx) =>{
    const {username, age, password} = ctx.request.body
    const avatar = ctx.file?`/uploads/${ctx.file.filename}`: ''

    // 利用user模型进行存储操作 
    await UserModel.create({
        username,
        age,
        password,
        avatar
    })
    ctx.body = {
        ok: 1
    }
})

module.exports = router