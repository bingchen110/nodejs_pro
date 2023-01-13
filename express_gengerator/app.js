var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const MongoStore = require('connect-mongo')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var uploadRouter = require('./routes/upload');
const JWT = require('./utils/jwt');

var app = express();

// 注册session中间件
// app.use(session({
//   name: 'backSystem',
//   secret:'bbbaaadddd',
//   cookie: {
//     maxAge: 1000*60*60,
//     secure: false
//   },
//   resave: true, // 重新设置session后,才重新设置过期时间
//   saveUninitialized: true,
//   store: MongoStore.create({
//     mongoUrl: 'mongodb://127.0.0.1:27017/express_session',
//     ttl: 1000 * 60 * 60 // 过期时间
//   })
// }))

// 设置中间件 session过去校验
// 判断 req.session.user
// app.use((req, res, next) =>{
//   if(req.url.includes('login')) {
//     next()
//     return
//   }
//   if(req.session.user) {
//     req.session.mydate = Date.now() // 每次访问让过期时间延期
//     next()
//   }else {
//     // 是接口， 返回 错误码
//     // 不是接口， 就重定向
//     req.url.includes('api')?res.status(401).json({ok: 0}):
//     res.redirect('/login')
//   }
// })


// jwt token校验
app.use((req, res, next) =>{
  if(req.url.includes('login')) {
    next()
    return
  }
  const token = req.headers.authorization?.split(' ')[1]
  if(token) {
    const payload = JWT.vertify(token)
    if(payload) {
      let newToken = JWT.generate({
        _id: payload._id,
        username: payload.username
      }, '1h')
      res.header("Authorization", newToken)
      next()
    }else {
      res.status(401).send({
        errorCode: -1,
        errorInfo: 'token过期'
      })
    }
  }else {
    next()
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
