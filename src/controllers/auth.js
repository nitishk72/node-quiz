const passport = require('passport');
const UserDetails = require('../models/user');

function login(req, res, next) {
  return res.render('pages/auth/login', { isLoggesIn: false });
}

function loginAction(req, res, next) {
  passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login?info=' + info);
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
  return res.render('pages/auth/register', { isLoggesIn: false });
}
async function registerAction(req, res, next) {
  let { name, email, password } = req.body;
  let user = await UserDetails.register({
    username: email,
    name, email,
  }, password)

  req.logIn(user, function (err) {
    if (err) {
      return next(err);
    }

    return res.redirect('/');
  });
}
function forget(req, res, next) {
  return res.render('pages/auth/forget');

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