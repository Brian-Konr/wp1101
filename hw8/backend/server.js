import WebSocket from "ws";
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import Message from './models/Message';
import { sendData, sendStatus, initData } from './wssConnect';

// connect to DB
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('connect to DB successfully!'));

const db = mongoose.connection;

// create Websocket server
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server}); // wss: server side; ws: client side

// broadcast function
const broadcastMessage = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    })
}

db.once('open', () => {
    wss.on('connection', (ws) => {
        // initialize past data and return to client
        initData(ws);
        // define WebSocket connection logic
        ws.onmessage = async (byteString) => {
            console.log("onmessage");
            const {data} = byteString;
            const [task, payload] = JSON.parse(data);
            console.log(task, payload);
            switch(task) {
                case 'input': {
                    const {name, body} = payload;
                    const message = new Message({name, body});
                    try {
                        await message.save();
                        // sendData(['output', [payload]], ws);
                        broadcastMessage(['output', [payload]], {
                            type: 'success',
                            msg: 'Message sent.'
                        })
                        // sendStatus({
                        //     type: 'success',
                        //     msg: 'Message sent.',
                        // }, ws)
                    } catch (error) {
                        throw new Error(`Message DB save error: ${error}`)
                    }
                    break;
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        broadcastMessage(['cleared'], {
                            type: 'info',
                            msg: 'Message cache cleared.'
                        })
                        // sendData(['cleared'], ws);
                        // sendStatus({
                        //     type: 'info',
                        //     msg: 'Message cache cleared.'
                        // }, ws);
                    })
                    break;
                }
                default: break;
            }
        }
    });
})

// define server
const PORT = process.env.PORT || 4000;
server.listen(PORT, function(err) {
    if(err) console.log("Error in server setup")
    else console.log(`Server listening on Port ${PORT}`);
});

