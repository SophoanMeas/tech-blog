const router = require('express').Router();
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

const { User, Post, Comment } = require('../../models');

// get all post
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'post', 'created_at'],
      order: [['created_at', 'DESC']],
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
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single post
router.get('/id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'post', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    if (!postData) {
      res.status(400).jason({ response: 'No post found!' });
      return;
    }
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create a post
router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      post: req.body.post,
      userId: req.session.userId,
    });
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update a post
router.put('/:id', withAuth, (req, res) =>{
    try{
        const postData = await Post.update({
            title: req.body.title,
            post: req.body.post
        },
        {
            where: {
                id: req.params.id
            }
        })
        if (!postData){
        res.status(400).json({ response: 'No post found!'})
        return;
        }
        res.json(postData);
    }  catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
})

// delete a post
router.delete('/:id', withAuth, (req, res) =>{
    try{
        const postData = await Post.destroy({
            where:{
                id: req.params.id
            }
        })
        if (!postData){
        res.status(400).json({ response: 'No post found!'})
            return
    }
    res.json(postData);
    }catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
})

module.exports = router;
