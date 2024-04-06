const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const dotenv = require('dotenv');
var cors = require('cors');

dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});


//socket.on is used to handle events specific to individual clients.
//io.on is used to handle server-wide events or events that involve interactions between multiple clients.
io.on('connection', (socket) => {
    socket.emit('me', socket.id);            //socket.id whill give our own id

    socket.on('disconnect',()=>{
        socket.broadcast.emit('callended');
    })

    socket.on('calluser',({userToCall,signalData,from,name})=>{
        io.to(userToCall).emit('calluser',{signal:signalData,from,name});
    })

    socket.on('answercall',(data)=>{
        io.to(data.to).emit('callaccepted',data.signal)
    });

});

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
