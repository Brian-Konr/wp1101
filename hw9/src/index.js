import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

// Apply packages of Apollo DOCs
import { 
  ApolloProvider, 
  ApolloClient,
  InMemoryCache
} from '@apollo/client';
import { split } from '@apollo/client';
import { HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities'; 

import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.css'

// Create an HTTP Link
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

// Create a WebSocket Link
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: { reconnect: true }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

// Declare/Register an Apollo Client 
const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore()
})

// Encapsule the component into an Apollo Provider
const WrappedApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
