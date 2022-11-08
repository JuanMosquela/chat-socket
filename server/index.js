import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { PORT } from './config.js';
import cors from 'cors';
import {dirname, join} from 'path'
import { fileURLToPath } from 'url';
import fs, { readFile } from 'fs'
import knex from 'knex'




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
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors:{
        origin: 'http://localhost:3000'
    }
})
app.use(cors())

io.on('connection', (socket) => {

    const msg = 'SELECT * FROM messages';
    db.query(msg, (err, dataMessages) => {
        if(err) return res.json(err)
        socket.emit('loadMessages', dataMessages)
    })

    const products = 'SELECT * FROM products';
    db.query(products, (err, dataProducts) => {
        if(err) return res.json(err)
        socket.emit('loadProducts', dataProducts)
    })    

    socket.on('message', (mensaje) => {        
        
        const q = "INSERT INTO messages (description) VALUES (?)"
        const message = req.body.message ;
        db.query(q, message, (err,data) => {
            if(err) return res.json(err)
            return res.json(data)
        })
        
        socket.broadcast.emit('message', {
            body: mensaje.body,
            from: mensaje.from
        })  
    })

    socket.on('products', (products) => {
        const q = "INSERT INTO products (name, description, price, img) VALUES (?)"
        const values = [
            req.body.name,
            req.body.description,
            req.body.price,
            req.body.img
        ];
        db.query(q, [values], (err,data) => {
            if(err) return res.json(err)
            return res.json(data)
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