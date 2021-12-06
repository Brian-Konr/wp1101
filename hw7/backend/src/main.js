import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ScoreCard from './models/ScoreCard';
import dotenv from 'dotenv-defaults';
import mainRoute from './routes/index';
import bodyParser from 'body-parser';
const app = express();


// init middleware
app.use(bodyParser.json());
app.use(cors()); 
app.use('/api', mainRoute);


app.get('/', function(_, res) {
    res.send("Hello hw7");
})

// connect to DB
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('connect to DB successfully!'));


// define server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function(err) {
    if(err) console.log("Error in server setup")
    else console.log(`Server listening on Port ${PORT}`);
});