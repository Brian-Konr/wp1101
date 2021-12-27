import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const ChatBoxSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  messages: [{ // like fk, refer 到 messages，存的是每個 message 的 id
    type: mongoose.Types.ObjectId,
    ref: "Message"
  }]
});

const MessageSchema = new Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  body: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model("User", UserSchema);
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);
const MessageModel = mongoose.model("Message", MessageSchema);

export {UserModel, ChatBoxModel, MessageModel}

