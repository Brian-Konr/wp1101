const Subscription = {
  message: {
    subscribe: async (parent, args, { pubsub }, info) => {
      const message = await pubsub.asyncIterator('message');
      return message;
    }
  },
  clean: {
    subscribe: async (parent, args, { pubsub }, info) => {
      const clean = await pubsub.asyncIterator('clean');
      return clean;
    }
  }
}

export { Subscription as default }