
import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import Subscription from './resolvers/Subscription.js';
import "dotenv-defaults/config.js";
import mongoose from 'mongoose';
const pubsub = new PubSub();
// const http = require('http')
// const express = require('express')
// const WebSocket = require('ws')
import Data from './models/message.js';
const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers: {
    Query,
    Mutation, 
    Subscription
  },
  context: {
    Data,
    pubsub
  }
});

// const app = express()
// const server = http.createServer(app)
// const wss = new WebSocket.Server({ server })

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')

  // // 當 WebSocket 從外部連結執行
  // wss.on('connection', ws => {

  //   // 固定送最新時間給 Client 
  //   // const sendNowTime = setInterval(() => {
  //   //   ws.send(String(new Date()));
  //   // }, 1000);
  //   // ws.on('message', (data) => {
  //   //   ws.send(data);
  //   // })
  //   // ws.on('close', () => {
  //   //   // 連線中斷時停止 setInterval
  //   //   clearInterval(sendNowTime);
  //   //   console.log('Close Connected');
  //   // })

  //   const sendData = (data) => {
  //     // send(): 為 Client 端發送信息
  //     ws.send(JSON.stringify(data))
  //   }

  //   const sendStatus = (s) => {
  //     sendData(['status', s])
  //   }

  //   Message.find()
  //     .limit(100)
  //     .sort({ _id: 1 })
  //     .exec((err, res) => {
  //       if (err) throw err

  //       // initialize app with existing messages
  //       sendData(['init', res])
  //     })

  //   // ws.on('message', (data) => {
  //   //   // 取得所有連接中的 client
  //   //   let clients = wss.clients;

  //   //   // 做迴圈，發送信息至每個 client
  //   //   clients.forEach((client) => {
  //   //     client.send(data);
  //   //   })
  //   // })

  //   ws.onmessage = (message) => {
  //     const { data } = message
  //     console.log(data)
  //     const [task, payload] = JSON.parse(data)

  //     switch (task) {
  //       case 'input': {
  //         // TODO
  //         const message = new Message({
  //           name: payload.name,
  //           body: payload.body
  //         });
  //         message.save(() => {
  //           sendData(['output', [payload]]);
  //           sendStatus({
  //               type: 'info',
  //               msg: 'Message is sent back to client.'
  //             });
  //         });
  //         break
  //       }
  //       case 'clear': {
  //         Message.deleteMany({}, () => {
  //           sendData(['cleared'])

  //           sendStatus({
  //             type: 'info',
  //             msg: 'Message cache cleared.'
  //           })
  //         })

  //         break
  //       }
  //       default:
  //         break
  //     }
  //   }
  // })

  const PORT = process.env.port || 4000

  server.start({ port: PORT }, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
})
