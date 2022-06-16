const express= require("express");
const path = require("path");
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')
const PORT=8080;

const app= express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


const pathStatic = path.resolve(__dirname, "./public");



// ************ Para usar Post ************
app.use(express.urlencoded({extended:false}));

app.use(express.json());
app.set('socketio',io);


app.use(express.static(pathStatic));
app.set('view engine', 'ejs');
const productsRoutes = require('./routers/productsRoutes');
app.use('/' ,productsRoutes);
const messageRoutes = require('./routers/messageRoutes');
app.use('/message' ,messageRoutes);


httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
  })
  
  io.on('connection', (socket) => {
    console.log('Usuario conectado', socket.id)
    app.set('socket',socket);
  })
 