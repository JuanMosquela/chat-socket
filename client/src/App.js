import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

const socket = io('http://localhost:4000')

function App() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([message, ...messages])
    })
  }, [messages])

  console.log(messages)
  



  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message',message)
    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([newMessage, ...messages])
    setMessage('')

  }

  return (
    <div className="App">
      <h1>Chat con Socket IO</h1>
      <form onSubmit={(e) => handleSubmit(e)} >
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>

      {messages.map((message,index) => (
        <p key={index}>{message.from}: {message.body}</p>
      ))}
    </div>
  );
}

export default App;
