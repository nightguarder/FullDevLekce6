import { WebSocket,WebSocketServer } from "ws";

const wss = new WebSocketServer({port:3000})
wss.on('connection',function connection(ws){
    console.log('Client connected');
    //handle error
    ws.on('error',console.error)
    //handle messages
    //Send them to all clients that are connected to ws
    ws.on('message',function incoming(message){
        wss.clients.forEach(function each(client){
            //if client is ready open the communication and send the message
            if(client.readyState === WebSocket.OPEN){
                client.send(message)
            }
        })
    })
})
ws.on('close', () => {
    console.log('Client disconnected');
  });

console.log("Websocket is running at {PORT}")