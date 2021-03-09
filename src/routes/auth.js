const router = require('express').Router();
const { auth } = require('../controllers');
const connectEnsureLogin = require('connect-ensure-login');

router.get('/register', connectEnsureLogin.ensureLoggedOut('/home'), auth.register);
router.post('/register', connectEnsureLogin.ensureLoggedOut('/home'), auth.registerAction);

router.get('/login', connectEnsureLogin.ensureLoggedOut('/home'), auth.login);
router.post('/login', connectEnsureLogin.ensureLoggedOut('/home'), auth.loginAction);

router.get('/logout', connectEnsureLogin.ensureLoggedIn('/login'), auth.logoutAction);

module.exports = router;