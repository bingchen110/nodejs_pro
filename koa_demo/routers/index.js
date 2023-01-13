const Router = require('koa-router');
const router = new Router()

const listRouter = require('./list')
const userRouter = require('./user')
const homeRouter = require('./home')
const loginRouter = require('./login')
const uploadRouter = require('./upload')

// 统一加前缀
// router.prefix("/api")

// 先注册路由级中间件
router.use('/list', listRouter.routes())
router.use('/user', userRouter.routes())

router.use('/home', homeRouter.routes())
router.use('/login', loginRouter.routes())
router.use('/upload', uploadRouter.routes())
router.redirect('/', '/home')

module.exports = router