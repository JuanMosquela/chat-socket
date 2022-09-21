import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import { PORT } from './config.js'
import cors from 'cors'


const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors:{
        origin: 'http://localhost:3000'
    }
})
app.use(cors())


io.on('connection', (client) => {    
    client.on('message', (message) => {
        client.broadcast.emit('message', {
            body: message,
            from: client.id
        })       

    })
    
})

httpServer.listen(PORT, () => {
     console.log(`escuchando puerto ${PORT}` )
})