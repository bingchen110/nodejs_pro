const WebSocket = require('ws');
const JWT = require('../utils/jwt');
const { WebSocketServer } = WebSocket

const wss = new WebSocketServer({ port: 9000 });

wss.on('connection', function connection(ws, req) {
    const myUrl = new URL(req.url, "http://127.0.0.1:3000")

    // 校验token
    const payload = JWT.vertify(myUrl.searchParams.get('token'))
    if (payload) {
        // ws.send() 参数只能是字符串
        ws.send(createMessage(websocketType.GroupChat, null, '欢迎来到聊天室'))

        ws.user = payload

        // 群发
        sendAll()
    } else {
        ws.send(createMessage(websocketType.Error, null, 'token过期'))
    }
    ws.on('message', function message(data) {
        // console.log('received: %s', data);
        // 转发给所有人
        // wss.clients.forEach(function each(client) {
        //     if (client !== ws && client.readyState === WebSocket.OPEN) {
        //         client.send(data, { binary: false });
        //     }
        // });
        const msgObj = JSON.parse(data)
        switch (msgObj.type) {
            case websocketType.Error:
                localStorage.removeItem('token')
                location.href = '/login'
                break;
            case websocketType.GroupList:
                ws.send(createMessage(websocketType.GroupList, null, JSON.stringify(Array.from(wss.clients).map(item => item.user))))
                break;
            case websocketType.GroupChat:
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(createMessage(websocketType.GroupChat, null, msgObj.data));
                    }
                });
                break;
            case websocketType.SingleChat:
                wss.clients.forEach(function each(client) {
                    if (client.user.username === msgObj.to && client.readyState === WebSocket.OPEN) {
                        client.send(createMessage(websocketType.SingleChat, ws.user, msgObj.data));
                    }
                });
                break;
            default:
                break;
        }
    });

    ws.on('close', () =>{
        wss.clients.delete(ws.user)
        sendAll()
    })

    // ws.send('something');
});

const websocketType = {
    Error: 0,
    GroupList: 1,
    GroupChat: 2,
    SingleChat: 3
}
function createMessage(type, user, data) {
    return JSON.stringify({
        type,
        user,
        data
    })
}

function sendAll() {
    // 转发给所有人
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(createMessage(websocketType.GroupList, null, JSON.stringify(Array.from(wss.clients).map(item => item.user))));
        }
    });
}