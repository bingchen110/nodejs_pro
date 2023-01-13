const UserModel = require('../model/UserModel')

const UserService = {
    addUser: (username, password, age, avatar) => {
        return UserModel.create({
            username,
            password,
            age,
            avatar
        })
    },
    updateUser: (_id, username, password, age) => {
        return UserModel.updateOne({
            _id
        }, {
            username,
            password,
            age
        })
    },
    delUser: (_id) =>{
       return UserModel.deleteOne({_id})
    },
    getList: (page, limit) =>{
       return UserModel.find({}, ['_id', 'username', 'age', 'avatar']).sort({age: -1}).skip((page - 1) * limit).limit(limit)
    },
    login: (username, password) =>{
        return UserModel.find({username, password})
    }
}

module.exports = UserService