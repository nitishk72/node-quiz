function index(req, res, next) {
  return res.render("pages/professor/index", {
    isLoggesIn: true,
    user: req.user,
    title: "Professor's Home",
    role: "Professor",
  });
}
module.exports = {
  index,
};
