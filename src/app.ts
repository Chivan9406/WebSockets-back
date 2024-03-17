import {WebSocketServer, WebSocket} from 'ws'

const wss = new WebSocketServer({port: 3000})

wss.on('connection', function connection(ws) {
    console.log('Client connected')

    ws.on('error', console.error)

    ws.on('message', function message(data) {
        const payload = JSON.stringify({
            type: 'Custom message',
            payload: data.toString()
        })
        // ws.send(JSON.stringify(payload))

        // Mensaje a todos incluyente
        // wss.clients.forEach(function each(client) {
        //     if (client.readyState === WebSocket.OPEN) {
        //         client.send(payload, {binary: false});
        //     }
        // })

        // Mensaje a todos excluyente
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(payload, {binary: false});
            }
        })
    })

    ws.on('close', () => {
        console.log('Client disconnected')
    })
})

console.log('ws://localhost:3000')