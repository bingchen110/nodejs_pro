const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const session = require('koa-session-minimal')

require('./config/db.config')

const app = new Koa()

// 应用级
app.use(bodyParser()) // 获取post参数
app.use(static(path.join(__dirname, "public"))) // 静态资源

// 配置模板引擎
app.use(views(path.join(__dirname, "views"), {
    extension: "ejs"
}))

// session 配置
// app.use(session({
//     key: 'mySessionId',
//     cookie: {
//         maxAge: 1000 * 60 * 60
//     }
// }))

// session 判断拦截
// app.use(async (ctx, next) =>{
//     // 排除login相关的路由和接口
//     if(ctx.url.includes('login')) {
//         await next()
//         return
//     }
//     if(ctx.session.user) {
//         // 重新设置以下session
//         ctx.session.mydate = Date.now()
//         await next()
//     }else {
//         ctx.redirect('/login')
//     }
// })

// token 判断拦截
app.use(async (ctx, next) => {
    if (ctx.url.includes('login')) {
        await next()
        return
    }
    const token = ctx.headers['authorization']?.split(' ')[1]
    if (token) {
        const payload = JWT.vertify(token)
        if (payload) {
            // 重新计算过期时间
            let newToken = JWT.generate({
                _id: payload._id,
                username: payload.username
            }, '1h')
            ctx.set("Authorization", newToken)
            await next()
        } else {
            // 401
            ctx.status = 401
            ctx.body = {
                errorCode: -1,
                errorInfo: 'token过期'
            }
        }
    } else {
        await next()
    }
})


const router = require('./routers/index');
const JWT = require('./utils/JWT');

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)