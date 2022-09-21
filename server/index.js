import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import { PORT } from './config.js'
import cors from 'cors'

 const dataMessages = []


const app = express()
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

        console.log(dataMessages)
        
        client.broadcast.emit('message', {
            body: mensaje.body,
            from: mensaje.from
        })  
        

    })

    client.emit('signin', dataMessages)
    
})

httpServer.listen(PORT, () => {
     console.log(`escuchando puerto ${PORT}` )
})