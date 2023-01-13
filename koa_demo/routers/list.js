const Router = require('koa-router');
const router = new Router()

router.get('/', (ctx, next) =>{
    ctx.body = [{
        _id:1,
        username: 'zs',
        age: 10
    },{
        _id:2,
        username: 'ls',
        age: 20
    },{
        _id:3,
        username: 'ww',
        age: 30
    }]
})

module.exports = router