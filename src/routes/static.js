const router = require('express').Router();
const { static } = require('../controllers');

router.get('/', static.index);

module.exports = router;