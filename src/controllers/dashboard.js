const Response = require("../models/response");

function home(req, res, next) {
  return res.render('pages/dashboard/home', {
    isLoggesIn: true,
    user: req.user,
  });
}

function profile(req, res, next) {
  return res.render('pages/dashboard/profile', {
    isLoggesIn: true,
    user: req.user,
  });
}

async function history(req, res, next) {
  let user = req.user;
  let response = await Response.find({
    'userId': { $in: user['_id']}
  }).populate({
    path:'quizId'
  });
  return res.render('pages/dashboard/history', {
    isLoggesIn: true,
    user: req.user,
    response: response,
  });
}

module.exports = {
  home,
  profile,
  history,
}