const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io=require('socket.io')(http)

const port = process.env.port || 3300;


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// Socket.io
io.on('connection',(socket)=>{
    console.log('Connected')

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

