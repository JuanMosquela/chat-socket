import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

//'http://localhost:4000'

const socket = io('http://localhost:4000')

function App() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [date, setDate] = useState(new Date()) 

  
  const [user, setUser] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({
    title: '',
    price: ''
  })

  



  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([message, ...messages])
    })   

    socket.on('loadMessages', (dataMessages) => setMessages(dataMessages))

    socket.on('loadProducts', (dataProducts) => setProducts(dataProducts))   
    

    setDate(new Date().toLocaleTimeString())

  }, [messages])
  



  const handleSubmit = (e) => {
    e.preventDefault()

    const mensaje = {
      body: message,
      from: user
    }

    if(message){
      socket.emit('message', mensaje )
      const newMessage = {
      body: message,
      from: 'Me',
      
      }
      setMessages([newMessage, ...messages])
      setMessage('')

    }    

  }

  const handleLogged = () => (user) && setIsLogged(true)

  const handleProduct = (e) => {

    e.preventDefault()

    console.log(product)
    socket.emit('products', product)
    
    setProducts([...products, product])
   
    

  }

  useEffect(() => {
    socket.on('product', (data) => setProducts([...product, data]))
  }, [product])
  

   console.log(products)
   console.log(messages)
   

  

    
  



  

  return (
    <div className="App">

      <form className='form-product' onSubmit={(e) => handleProduct(e)}>
        <h2>Productos</h2>
        <div className='container-controlls products'>
          <input type="text" name='title'  onChange={(e) => setProduct({ ...product,[e.target.name]: e.target.value})} placeholder='Ingresa un producto' required/>
          <input type="text" name='price'  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})} placeholder='Ingresa un precio' required/>
          
          <button type="submit" >Ingresar</button>
        </div>
        {products.length > 0 && (
          <table>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
          {products.map(product => (
          <tr key={product.title} className='product'>
            
            <th>{product.title}</th>
            <th>{product.price}</th>
          </tr>
        ))}
          
        </table>
        )}
        

      </form>
     

      
      <form className='form-chat' onSubmit={(e) => handleSubmit(e)} >

        

        {!isLogged ? (
          <div className='container-login'>
            <input type="text" onChange={(e) => setUser(e.target.value)} placeholder='Ingresa tu nombre para chatear' required/>
            <button type="submit" onClick={() => handleLogged()}>Ingresar</button>
          </div>

        ): (
          <div className='chat-room'>
            <div className="container-controlls">
              <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder='Ingrese un mensaje'  />
              <button type="submit">Enviar</button>
            </div>

            <ul className="messages-container">
              {messages.map((message,index) => (
                <div className={`message ${message.from}`} key={index}>
                  <li >{message.from}: {message.body}</li>
                  <span>{date}</span>
                </div>
              ))}  
                    
            </ul>
              
          </div>

        )}
        
         
        
        
          
      </form>

      
    </div>
  );
}

export default App;
