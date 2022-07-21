const router = require('express').Router();
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

const { Post, User, Comment } = require('../models');

// get all post from user
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
      attributes: ['id', 'title', 'post_text', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comments', 'postId', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all-posts-by-user', {
      layout: 'dashboard',
      posts,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// show edit a post page
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'post_text', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comments', 'postId', 'userId', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render('edit-post', {
      post,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// show new post
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {});
});

module.exports = router;
