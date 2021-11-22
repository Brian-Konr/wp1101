import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/user';
import dotenv from 'dotenv-defaults';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
    await saveUser(57, "Ric");
})
const saveUser = async (id, name) => {
    const existing = await User.findOne({name});
    if(existing) throw new Error(`data ${name} exists`);
    try {
        const newUser = new User({id, name});
        console.log("Created user", newUser);
        return newUser.save();
    } catch(e) {
        throw new Error("User creation error: " + e);
    }
}

const deleteDB = async () => {
    try {
        await User.deleteMany({});
        console.log("Database deleted");
    }
    catch (e) {
        throw new Error("Database deletion failed");
    }
}

const app = express();

// init middleware
app.use(cors()); 

app.get('/', function(_, res) {
    res.send("Hello World!");
})

// define server
const PORT = process.env.PORT || 4000;
app.listen(PORT, function(err) {
    if(err) console.log("Error in server setup")
    else console.log(`Server listening on Port ${PORT}`);
});