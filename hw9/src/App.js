import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'

import { useQuery, useMutation } from '@apollo/client';
import { 
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  FIND_OR_CREATE_USER_MUTATION,
  CLEAN_USER_MESSAGE_MUTATION,
  CLEAN_SUBSCRIPTION,
  MESSAGE_SUBSCRIPTION
} from './graphql';

function FetchMessage({ loggedIn, userName, receiverName, messages }) {
  const Messages = messages.filter((msg) => 
  receiverName === msg.sendTo || receiverName === msg.sendBy
  )

  return (
    <div className="App-messages">
    {Messages.length === 0 ? (
      <p style={{ color: '#ccc' }}>
        {loggedIn ? 'No message...' : 'Loading...'}
      </p>
    ) : (
      Messages.map(({ sendBy, sendTo, body }, i) => {
        if (userName === sendBy && receiverName === sendTo) {
          return (
          <p className="App-message" key={i}>
            <Tag color="blue">{sendBy}</Tag> {body}
          </p>
          )
        } else if (userName === sendTo && receiverName === sendBy) {
          return (
          <p className="App-receives" key={i}>
            <span>{body}</span>
            <Tag color="green">{sendBy}</Tag>
          </p>
          )
        } else return null
      })
    )}
    </div>
  )
}

function App() {
  const { status } = useChat()

  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')

  // Define log in state
  const [loggedIn, setLoggedIn] = useState(false);
  const [receivername, setReceivername] = useState('');

  
  const { data, subscribeToMore } = useQuery(
    MESSAGES_QUERY, { variables: { userName: username }}
  );

  const [findOrCreateUser] = useMutation(FIND_OR_CREATE_USER_MUTATION);
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  const [clearMessage] = useMutation(CLEAN_USER_MESSAGE_MUTATION);

  const handleUserLogIn = async () => {
    if (!username) {
      displayStatus({
        type: 'error',
        msg: 'Please type a valid user name.'
      })
      return 
    }

    if (!receivername) {
      displayStatus({
        type: 'error',
        msg: 'Please type a valid receiver name.'
      })
      return 
    }

    await findOrCreateUser({
      variables: {
        userName: username
      }
    });

    await findOrCreateUser({
      variables: {
        userName: receivername
      }
    })

    setLoggedIn(true);
  }

  const handleCreateMessage = async () => {
    if (!body) {
      displayStatus({
        type: 'error',
        msg: 'Please enter a valid message body.'
      })
      return 
    }

    await createMessage({
      variables: {
        sendBy: username,
        sendTo: receivername,
        body: body
      }
    })

    setBody('');
  }

  const handleClearMessage = async () => {
    if (!username) {
      displayStatus({
        type: 'error',
        msg: 'Please type a valid user name.'
      })
      return 
    }

    await clearMessage({ variables: { userName: username } });
  }

  const bodyRef = useRef(null)
  const receiverRef = useRef(null)

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    displayStatus(status)
  }, [status])

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newMessage = subscriptionData.data.message.data;

        return {
          ...prev, 
          messages: [...prev.messages, newMessage]
        }
      }
    })
  }, [subscribeToMore])

  useEffect(() => {
    subscribeToMore({
      document: CLEAN_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newMessages = subscriptionData.data.clean.data;

        return {
          ...prev,
          messages: [...newMessages]
        }
      }
    })
  })

  if (loggedIn) { 
    return (
      <div className="App">
        <div className="App-title">
          <h1>Simple Chat</h1>
          <Button type="primary" danger onClick={handleClearMessage}>
            Clear
          </Button>
          <Button  danger onClick={() => {
            setUsername('')
            setReceivername('')
            setLoggedIn(false)
          }}>
            Log Out
          </Button>
        </div>
        <FetchMessage 
          loggedIn={loggedIn} 
          userName={username} 
          receiverName={receivername}
          messages={data.messages} 
        />
        <p className="App-showcase">
          <span>User: </span>
          <Tag color="blue">{username}</Tag>
        </p>
        <p className="App-showcase">
          <span>Receiver: </span>
          <Tag color="green">{receivername}</Tag>
        </p>
        <Input.Search
          rows={4}
          value={body}
          ref={bodyRef}
          enterButton="Send"
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type a message here..."
          onSearch={() => {
            handleCreateMessage();
            bodyRef.current.focus();
          }}
        ></Input.Search>
      </div>
    )
  } else {
    return (
      <div className='App'>
        <div className='App-title'>
          <h1>Simple Chat Box App</h1>
        </div>
        <div className='App-title'>
          <h2>Who are you...</h2>
        </div>
        <Input
          placeholder="Tyep user name here..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              receiverRef.current.focus()
            }
          }}
        ></Input>
        <div className='App-title'>
          <h2>Want to chat with...</h2>
        </div>
        <Input.Search
          rows={4}
          placeholder='Type a receiver name here...'
          ref={receiverRef}
          value={receivername}
          enterButton='Start'
          onChange={(event) => setReceivername(event.target.value)}
          onSearch={handleUserLogIn}
        ></Input.Search>
      </div>
    )
  }
}

export default App
