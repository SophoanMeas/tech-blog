const router = require('express').Router();
const sequelize = require('../config/connection');

const { User, Post, Comment } = require('../models');

// redirect to homepage
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
  // redirect to signup page
  router.get('/signup', (req, res) => {
    res.render('signup');
  });

// get all post
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'post', 'created_at'],
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

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get a single post
router.get('/post:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'post', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comments', 'postId', 'userId', 'created_at'],
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

    res.render('single-post', {
      posts,
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;