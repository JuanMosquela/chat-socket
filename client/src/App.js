import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

const socket = io('http://localhost:4000')

function App() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const [date, setDate] = useState(new Date())
  const [count, setCount] = useState(0)
  const [dataMessages, setDataMessages] = useState([])
  const [user, setUser] = useState('')
  const [isLogged, setIsLogged] = useState(false)




  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([message, ...messages])
    })

    socket.on('counter', (client) => {
      setCount([...count, client.id])

    })

    

    setDate(new Date().toLocaleTimeString())

    




  }, [messages])

  useEffect(() => {
    
  
    socket.on('signin', (dataMessages) => setDataMessages(dataMessages))
  }, [dataMessages])
  

  console.log(count)
  
  



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
   

    
  



  

  return (
    <div className="App">
     

      
      <form onSubmit={(e) => handleSubmit(e)} >

        

        {!isLogged ? (
          <div className='container-login'>
            <input type="text" onChange={(e) => setUser(e.target.value)} placeholder='Ingresa tu nombre' required/>
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
              {dataMessages.map((message, index) => (
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
