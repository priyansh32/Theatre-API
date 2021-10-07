const router = require('express').Router();

router.use('/', require('./users'));
router.use('/movies', require('./movies'));
router.use('/shows', require('./shows'));

module.exports = router;
