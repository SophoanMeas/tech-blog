const router = require('express').Router();
const withAuth = require('../../utils/auth');

const { Comment } = require('../../models');

// get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new comment
router.post('/', withAuth, async (req, res) => {
  if (req.session) {
    try {
      const commentData = await Comment.create({
        comment: req.body.comment,
        postId: req.body.postId,
        userId: req.session.userId,
      });
      res.status(200).json(commentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// delete comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.ud,
      },
    });
    if (!commentData) {
      res.status(400).json({ response: 'No comment found!' });
      return;
    }
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;