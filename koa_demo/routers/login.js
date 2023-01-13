const Router = require('koa-router');
const router = new Router()

router.get('/', async (ctx, next) =>{
    // 获取cookie 
    // console.log(ctx.cookies.get("username"))
    // 设置cookie
    // ctx.cookies.set('gender','male')
   await ctx.render("login") // 自动找views/home.ejs
})

module.exports = router