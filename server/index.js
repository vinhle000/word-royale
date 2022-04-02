const express =require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {origin: "*"}
});

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello')
})


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id} said ${message}`);
    });
});


server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})