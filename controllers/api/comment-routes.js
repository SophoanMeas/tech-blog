const router = require('express').Router();
const withAuth = require('../../utils/auth');

const { Comment } = require('../../models');

// get all comments
router.get('/', async (req, res) =>{
    try {
        
        const commentData = await Comment.findAll({
            
        })

    } catch (error) {
        console.log(err);
		res.status(500).json(err);
    }
})