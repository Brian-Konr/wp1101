const Query = {
  users: async (parent, args, context, info) => {
    const { Data } = context;
    const result = await Data.find();
    if (!args.query) {
      return result;
    }
  }, 
  messages: async (parent, args, context, info) => {
    const { Data } = context;
    if (!args.user) {
      throw new Error('Required Specific User')
    }
    const user = await Data.findOne({ name: args.user }, function(err, result) {
      if (err) return err;
    });
    if (!user) return [];

    return user.message;
  }
}

export { Query as default }