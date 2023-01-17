const UserService = require('../services/UserService')
const JWT = require('../utils/jwt')
const UserController = {
    add: async (req, res) => {
        // 插入数据库
        // 1.创建一个模型（user), 一一对应数据库的集合（users）
        const avatar = req.file?`/uploads/${req.file.filename}`: '/images/user.png'
        const {
            username,
            password,
            age
        } = req.body
        await UserService.addUser(username, password, age, avatar)
        res.send({
            ok: 1
        })
    },
    update: async (req, res) => {
        const {
            username,
            password,
            age
        } = req.body
        await UserService.updateUser(req.params.id, username, password, age)
        res.send({
            ok: 1
        })
    },
    del: async (req, res) => {
        await UserService.delUser(req.params.id)
        res.send({
            ok: 1
        })
    },
    getList: async (req, res) => {
        const {
            page,
            limit
        } = req.query
        let data = await UserService.getList(page, limit)
        res.send(data)
    },
    login: async (req, res) =>{
        const {username, password} = req.body
        let data = await UserService.login(username, password)
        if(data.length === 0) {
            res.send({
                ok: 0
            })
        }else {
            // 设置session
            // req.session.user = data[0] //设置session 对象
            // 设置token
            const token = JWT.generate({
                _id: data[0]._id,
                username: data[0].username
            }, '1h')
            res.header("Authorization", token)
            res.send({
                ok: 1
            })
        }
    }
}

module.exports = UserController