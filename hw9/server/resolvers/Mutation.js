const Mutation = {
  findOrCreateUser: async (parent, args, { Data }, info) => {
    const userName = args.user;
    const findUser = await Data.findOne({ name: userName });
    
    if (!findUser) {
      const newUser = new Data({
        name: args.user,
        message: []
      })
      const new_user_update = await newUser.save(function(err, res) {
        if (err) return err;
      })
      return newUser;
    } else {
      return findUser;
    }
  },
  createMessage: async (parent, args, { Data, pubsub }, info) => {
    // First, find the user who send this message
    const userName = args.data.sendBy;
    const user = await Data.findOne({ name: userName });

    // Next, also find or create the receiver who will get this message
    const receiverName = args.data.sendTo   
    const receiver = await Data.findOne({ name: receiverName }); 

    const newMessage = {
      sendBy: userName,
      sendTo: receiverName,
      body: args.data.body
    }
    
    if (!user) {
      throw new Error('User not found');
    } else {
      // Push this message to that user's messages list
      user.message.push(newMessage);

      const user_update = await user.save(function(err, res) {
        if (err) return err;

        pubsub.publish('message', {
          message: {
            mutation: 'CREATED', 
            data: {
              sendBy: userName,
              sendTo: receiverName,
              body: args.data.body
            }
          }
        })
        
      });
    }

    if (!receiver) {
      const newReceiver = new Data({
        name: receiverName,
        message: []
      });
      newReceiver.message.push({
        sendBy: userName,
        sendTo: receiverName,
        body: args.data.body
      })
      const newReceiver_update = await newReceiver.save(function(err, res) {
        if (err) return err;
      })
    } else {
      receiver.message.push({
        sendBy: userName,
        sendTo: receiverName,
        body: args.data.body
      })
      const receiver_update = await receiver.save(function(err, res){
        if (err) return err;
      })
    }
    
    return newMessage; 
  },
  clearMessage: async (parent, args, { Data, pubsub }, info) => {
    if (!args.user) {
      const clear_all_update = await Data.deleteMany(function(err, res) {
        if (err) return err;

        pubsub.publish('clean', {
          clean: {
            mutation: 'CLEARED',
            data: []
          }
        })
      })
      return [];
    } else {
      const userName = args.user;
      const user = await Data.findOne({ name: userName });
      if (!user) {
        throw new Error('User not found')
      } else {
        const clearMessages = user.message.filter((msg) => msg.sendBy === userName);
        const validMessages = user.message.filter((msg) => msg.sendBy !== userName);
        // clean local user's messages
        user.message = validMessages;

        // clean corresponding receivers' messages
        clearMessages.map(async (msg) => {
          const receiver = await Data.findOne({ name: msg.sendTo });
          const newMessages = receiver.message.filter((msg) => msg.sendBy !== userName);
          receiver.message = newMessages;

          const receiver_update = await receiver.save(function(err, res) {
            if (err) return err;
          })
        })

        const clear_update = await user.save(function(err, result) {
          if (err) return err;

          pubsub.publish('clean', {
            clean: {
              mutation: 'CLEARED',
              data: validMessages
            }
          })
        })
        return clearMessages;
      }
    }
  }
}

export { Mutation as default }