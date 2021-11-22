import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    id: Number,
    name: String
});

const User = mongoose.model('User', UserSchema);

export default User;
