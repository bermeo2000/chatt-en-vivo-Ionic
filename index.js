const express = require("express")
const path = require("path")
const app = express()
const port = process.env.PORT || 3000


app.use(express.static(path.join(__dirname, 'public')))
const server = app.listen(port, () => {
    console.log(`la app se esta ejecutando en el puerto pipipipippi  ${port}`);
})
const socket = require("socket.io")
const io = socket(server);
io.on('connection', (socket) => {
    console.log("conectado");

    socket.on('chat:msg', (data) => {
            io.sockets.emit('chat:msgback', data)
        })
        // para que salga escribiendo
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

    console.log("nueva coneccion");

});