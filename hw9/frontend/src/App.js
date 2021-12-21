import './App.css'
import { useState, useEffect, useRef } from 'react';
import useChat from './useChat';
import { Button, Input, Tag, message } from 'antd'

function App({username}) {
  // define states and methods
  const { status, messages, sendMessage, clearMessages } = useChat();
  const bodyRef = useRef(null);
  const [body, setBody] = useState(''); // text body

  const displayStatus = (payload) => {
    if(payload.msg) {
      const {type, msg} = payload;
      const content = { content: msg, duration: 0.7};
      switch(type) {
        case 'success': {
          message.success(content);
          break;
        }
        case 'info': {
          message.info(content);
          break;
        }
        case 'error':
        default: {
          message.error(content);
          break;
        }
      }
    }
  }
  useEffect(() => {
    displayStatus(status);
  }, [status])

  return (
    <div className="App">
      <div className="App-title">
        <h1>{`${username}'s Chat`}</h1>
        <Button type="primary" danger onClick = {clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            No messages...
          </p>
        ) : (
          messages.map(({name, body}, i) => (
            <p className="App-message" key = {i}>
              <Tag color="blue">{name}</Tag>
              {body}
            </p>
          ))
        )}
      </div>
      <Input.Search
        enterButton="Send"
        placeholder="Type a message here..."
        value = {body}
        ref = {bodyRef}
        onChange = {(e) => setBody(e.target.value)}
        // when 'Send', call sendMessage()
        onSearch = {(msg) => {
          if(!msg) {
            displayStatus({type: 'error', msg: 'message body cannot be empty!'});
            return;
          }
          sendMessage({name: username, body: msg});
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}

export default App
