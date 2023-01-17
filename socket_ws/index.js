const express = require('express')

const app = express()
app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.send({
        ok: 1
    })
})

app.listen(3000, () =>{})


const WebSocket = require('ws')
const { WebSocketServer } = WebSocket

const wss = new WebSocketServer({ port: 9000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    // 转发给所有人
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: false });
        }
      });
  });

  ws.send('something');
});