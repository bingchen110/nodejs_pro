var express = require('express');
const UserController = require('../controllers/UserController');
const UserModel = require('../model/UserModel');
var router = express.Router();

const multer = require('multer');
const upload = multer({dest: 'public/uploads/'})

/* GET users listing. */
router.get('/', function(req, res, next) {
  // 读取前端的cookie值
  console.log(req.cookies)

  // 设置前端的cookie值
  res.cookie("gender","male")

  res.send('respond with a resource');
});

/**
 * 
 * @api {post} /api/user/add userAdd
 * @apiName userAdd
 * @apiGroup usergroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} username 用户名
 * @apiParam  {String} password 密码
 * @apiParam  {Number} age 年龄
 * @apiParam  {String} avatar 头像
 * 
 * @apiSuccess (200) {Number} ok 标识成功字段
 * 
 * @apiParamExample  {multipart/form-data} Request-Example:
 * {
 *     username : '张三'
 *     age : 18
 *     password : '123456'
 *     avatar : File
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     ok : 1
 * }
 * 
 * 
 */
router.post('/add', upload.single('avatar'), UserController.add)

router.post('/update/:id', UserController.update)

router.get('/delete/:id', UserController.del)

router.get('/list', UserController.getList)

// 登录
router.post('/login', UserController.login)
router.get('/logout', (req, res) =>{
  req.session.destroy(() =>{
    res.send({ok: 1})
  })
})

module.exports = router;
