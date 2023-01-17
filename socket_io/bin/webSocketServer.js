const JWT = require('../utils/jwt');

function start(server) {
    const io = require('socket.io')(server)
    io.on('connection', (socket) => {
        // console.log(socket.handshake.query.token);
        const payload = JWT.vertify(socket.handshake.query.token)
        if(payload) {
            socket.user = payload
            // 发送欢迎
            socket.emit(websocketType.GroupChat, createMessage(socket.user, '欢迎来到聊天室'))
            // 给所有发送用户列表
            sendAll(io)
        }else {
            socket.emit(websocketType.Error, createMessage(null, 'token过期'))
        }

        socket.on(websocketType.GroupList, () =>{
            console.log(Array.from(io.sockets.sockets).map(item =>item[1].user));
        
        })
        socket.on(websocketType.GroupChat, (msg) =>{
            // 给所有人发
            io.sockets.emit(websocketType.GroupChat, createMessage(socket.user, msg.data))
            // 除了自己不发，给其他人发
            // socket.broadcast.emit(websocketType.GroupChat, createMessage(socket.user, msg.data))
        })
        socket.on(websocketType.SingleChat, (msg) =>{
            Array.from(io.sockets.sockets).forEach(item =>{
                if(item[1].user.username === msg.to) {
                    item[1].emit(websocketType.SingleChat, 
                        createMessage(socket.user, msg.data))
                }
            })
        })

        socket.on('disconnect', () =>{
            sendAll(io)
        })
    })
}

const websocketType = {
    Error: 0,
    GroupList: 1,
    GroupChat: 2,
    SingleChat: 3
}
function createMessage(user, data) {
    return {
        user,
        data
    }
}

function sendAll(io) {
    // 转发给所有人
    io.sockets.emit(websocketType.GroupList, createMessage(null, Array.from(io.sockets.sockets).map(item =>item[1].user).filter(item=>item)))
}

module.exports = start