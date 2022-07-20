const router = require('express').Router();
const withAuth = require('../../utils/auth');

const { User, Post, Comment } = require('../../models');

// create a new user // api/users/
router.post('/', async (req, res) =>{
    try{
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        req.session.save(() =>{
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true
            
            res.json(userData)
        })
    }  catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
})

// login
router.post('/login', async (req, res) =>{
    try{
        const userData = await User.findOne({
            where:{
                username: req.body.username
            }
        })

	if (!userData) {
        res.status(400).json({ response: 'Wrong username/password. Try again!' });
        return;
    }
    const password = await userData.checkPassword(req.body.password);
    if (!password) {
        res.status(400).json({ response: 'Incorrect username or password. Please try again!' });
        return;
    }
    req.session.save(() =>{
        req.session.userId = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.status(200).json({ response: 'You are now logged in!', username: userData });
    })
    }catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
})

// logout
router.post('/logout', withAuth, (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

// delete user
router.delete('/user/:id', async (req,res)=>{
    try{
        const userData = await User.destroy({
            where:{
                id: req.params.id
            }
        })
        if (!userData){
            res.status(400).json({response: 'No user found!'})
        }
    }catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
})

module.exports = router;