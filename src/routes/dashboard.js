const router = require('express').Router();
const { dashboard } = require('../controllers');
const connectEnsureLogin = require('connect-ensure-login');

router.get('/home', connectEnsureLogin.ensureLoggedIn('/login'), dashboard.home);
router.get('/profile', connectEnsureLogin.ensureLoggedIn('/login'), dashboard.profile);
router.get('/history', connectEnsureLogin.ensureLoggedIn('/login'), dashboard.history);


module.exports = router;