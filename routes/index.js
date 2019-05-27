const express = require('express');
const router = express.Router();

// const collectionRouter = require('./collectionRouter');
// var taskRouter = require('./taskRouter');

router.get('/', function(req, res) {
    res.render('index');
})
// router.use('/collections', collectionRouter);
// router.use('/tasks', taskRouter);

module.exports = router;