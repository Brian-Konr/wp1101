import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {console.log("Connect to DB successfully!")});
}

export default connect;
