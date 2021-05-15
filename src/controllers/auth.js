const passport = require('passport');
const UserDetails = require('../models/user');

function login(req, res, next) {
  let message = req.flash('message');
  let type = req.flash('type');

  return res.render('pages/auth/login', {
    isLoggesIn: false,
    user: req.user,
    message: message,
    type: type,
  });
}

function loginAction(req, res, next) {
  passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('message', info);
        req.flash('type', 'error');
        return res.redirect('/login');
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        return res.redirect('/');
      });

    })(req, res, next);
}
function register(req, res, next) {
  return res.render('pages/auth/register', { isLoggesIn: false, user: req.user });
}
async function registerAction(req, res, next) {
  let { name, email, password, role } = req.body;
  let user = await UserDetails.register({
    username: email,
    name, email,
    role,
  }, password)

  req.logIn(user, function (err) {
    if (err) {
      return next(err);
    }

    return res.redirect('/');
  });
}
function forget(req, res, next) {
  return res.render('pages/auth/forget', { isLoggesIn: false, user: req.user });

}
function forgetAction(req, res, next) {
  res.send('forgetAction');
}


function logoutAction(req, res, next) {
  req.logout();
  res.redirect('/');
}
module.exports = {
  login, loginAction,
  register, registerAction,
  forget, forgetAction,
  logoutAction
}