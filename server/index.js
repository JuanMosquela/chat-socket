import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { PORT } from './config.js';
import cors from 'cors';
import {dirname, join} from 'path'
import { fileURLToPath } from 'url';
import fs, { readFile } from 'fs'

const dataMessages = [];
const dataProducts = [];
//READ MESSAGES

const readFiles = async(file) => {
    try {
        const fileData = await fs.promises.readFile(file, "utf-8")
         
        const array = JSON.parse(fileData)        
        array.forEach(message => dataMessages.push(message))
             
       
        
    } catch (error) {
        console.log(error)
        
    }

}

console.log(dataMessages)







//SAVE MESSAGES
const save = async (data, file) => {
    try {
        const writteMessages = await fs.promises.writeFile(file, JSON.stringify(data))
       
        return console.log(`Mensaje enviado exitosamente `);
    }        
    catch (error) {
        console.log(error);        
    } 
   
};

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

io.on('connection', (socket) => {

    readFiles("./messages.txt")
    readFiles("./products.txt")

    socket.emit('loadMessages', dataMessages)    
    socket.emit('loadProducts', dataProducts)
    

    socket.on('message', (mensaje) => {

        dataMessages.push(mensaje) 
        console.log(dataMessages)
        save(dataMessages, "./messages.txt");      
        
        socket.broadcast.emit('message', {
            body: mensaje.body,
            from: mensaje.from
        })  
    })

    socket.on('products', (products) => {
        dataProducts.push(products)
        console.log(dataProducts)
        save(dataProducts, "./products.txt"); 
        
        socket.broadcast.emit('product', {
            title: products.title,
            price: products.price
        })
    })

    socket.on('disconnect', (socket) => {       
        console.log('cliente desconectado')
    })  



    
})

app.use(express.static(join(__dirname, '../socket/build')))

httpServer.listen(PORT, () => {
     console.log(`escuchando puerto ${PORT}` )
})