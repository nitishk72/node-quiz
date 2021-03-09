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

module.exports = {
  home,
  profile,
}