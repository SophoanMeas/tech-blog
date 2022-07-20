const router = require('express').Router();
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

const { Post, User, Comment } = require('../models');

// show all posts
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.params.userId,
      },
      attributes: ['id', 'title', 'post', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
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
    res.render('dashboard', {
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
        id: params.id,
        attribute: ['id', 'title', 'post', 'created_at'],
        include: [
          {
            model: User,
            attribute: ['username'],
          },
          {
            model: Comment,
            attribute: ['id', 'comment', 'postId', 'userId', 'created_at'],
            include: {
              model: User,
              attribute: ['username'],
            },
          },
        ],
      },
    });

    const posts = postData.get({ plain: true });
    res.render('edit-post', {
      posts,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// show new post
router.get('/new', (req, res) => {
    res.render('new-posts');
  });

module.exports = router;