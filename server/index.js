const express =require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {origin: "*"}
});

const port = 8080;
const currentGameWord = 'trove'

// app.get('/', (req, res) => {
//     res.send('Hello')
// })


io.on('connection', (socket) => {
    console.log('a user connected');


    //Join room 
    socket.join('room1')

    //Game Start event
    // will need to One person to trigger the game start
    // -Future, data will include settings options recieved from client
    socket.on('GameStart', (data) => {
        io.emit('Start', currentGameWord)
    })

    //Give word to client, client recieves
    // -Test word is 'TROVE'
    // - Store words in JSON for now




    socket.on('message', (message) => {
        console.log(message);
        // io.emit('message', `${socket.id} said ${message}`);
         io.emit('message', `${message}`);
    });
});


server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})