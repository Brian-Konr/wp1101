const User = {
  posts(parent, args, { db }, info) {
    return db.posts.filter((post) => {
      return post.author === parent.id;
    });
  },
  age(parent, args, { db }, info) {
    return parent.age > args.threshold ? 1: -1;
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) => {
      return comment.author === parent.id;
    });
  },
};

export { User as default };
