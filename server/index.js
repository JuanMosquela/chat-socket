import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { PORT } from './config.js';
import cors from 'cors';
import {dirname, join} from 'path'
import { fileURLToPath } from 'url';
const dataMessages = []

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors:{
        origin: 'http://localhost:3000'
    }
})
app.use(cors())

io.on('connection', (client) => {
    client.on('disconnect', (client) => {       
        console.log('cliente desconectado')
    })  

    client.on('message', (mensaje) => {

        dataMessages.push(mensaje)       
        
        client.broadcast.emit('message', {
            body: mensaje.body,
            from: mensaje.from
        })  
    })
    client.emit('signin', dataMessages)    
})

app.use(express.static(join(__dirname, '../client/build')))

httpServer.listen(PORT, () => {
     console.log(`escuchando puerto ${PORT}` )
})