import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv-defaults';

// connect to DB
export default () => {
    dotenv.config();
    if(!process.env.MONGO_URL) {
        console.error("Missing MONGO_URL");
        process.exit(1);
    }
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log('connect to DB successfully!'));

    const db = mongoose.connection;

    db.once('open', () => {
        console.log("Mongo database connected!")
    })
}

