const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

router.use('/', homeRoutes); // homepage
router.use('/api', apiRoutes); // routes to api folder
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    // if we make a request to any endpoint that doesn't exist.
  res.status(404).end();
});

module.exports = router;