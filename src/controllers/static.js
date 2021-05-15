function index(req, res, next) {
  return res.render("pages/index", {
    isLoggesIn: req.user != undefined,
    title: "Home",
    user: req.user,
  });
}
module.exports = {
  index,
};
