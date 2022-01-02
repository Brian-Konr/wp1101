import { useState } from 'react'
// import { w3cwebsocket as W3CWebSocket } from 'websocket'

// const client = new W3CWebSocket('ws://localhost:4000')
// 宣告 Client 端
// 使用 WebSocket 的網址向 Server 開啟連結 
const client = new WebSocket('ws://localhost:4000')

const useChat = () => {
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState({})
  const [opened, setOpened] = useState(false)

  // 接收 Server 發送的訊息 
  // onmessage(): 使用一個參數 event 而從 Server 回傳的資料會在 event 的 data 屬性中
  client.onmessage = (message) => {
    console.log(message);
    const { data } = message
    console.log(data);
    const [task, payload] = JSON.parse(data)

    switch (task) {
      case 'init': {
        setMessages(() => payload)
        break
      }
      case 'output': {
        setMessages(() => [...messages, ...payload])
        break
      }
      case 'status': {
        setStatus(payload)
        break
      }
      case 'cleared': {
        setMessages([])
        break
      }
      default:
        break
    }
  }

  // 開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
  client.onopen = () => {
    setOpened(true)
  }

  const sendData = (data) => {
    // TODO
    client.send(JSON.stringify(data));
  }

  const sendMessage = (msg) => {
    // TODO
    sendData(['input',msg]);
  }

  const clearMessages = () => {
    // TODO
    sendData(['clear']);
  }

  return {
    status,
    opened,
    messages,
    sendMessage,
    clearMessages
  }
}

export default useChat

