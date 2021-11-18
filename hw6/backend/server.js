import express from 'express';
import cors from 'cors';
import guessRoute from './routes/guess'

const app = express();

// init middleware
app.use(cors()); 

app.get('/', function(req, res) {
    res.send("Hello World!");
})
// define routers
app.use('/api', guessRoute);

// define server
const PORT = process.env.PORT || 4000;
app.listen(PORT, function(err) {
    if(err) console.log("Error in server setup")
    else console.log(`Server listening on Port ${PORT}`);
});