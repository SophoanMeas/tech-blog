const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// user can have many post
User.hasMany(Post, {
  foreignKey: 'userId',
});

// user can have many comments
User.hasMany(Comment, {
  foreignKey: 'postId',
});

// post belong to a user
Post.belongsTo(User, {
  foreignKey: 'userId',
});

// a post can have many comments
Post.hasMany(Comment, {
  foreignKey: 'postId',
});

// a comment belong to a user
Comment.belongsTo(User, {
  foreignKey: 'userId',
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

module.exports = { User, Post, Comment };
