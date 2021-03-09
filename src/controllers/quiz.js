function listAll(req, res, next) {
  return res.render('pages/quiz/list', {
    isLoggesIn: true,
    user: req.user,
  });
}
function newQuiz(req, res, next) {
  return res.render('pages/quiz/create', {
    isLoggesIn: true,
    user: req.user,
  });
}
function add_bulk_question(req, res, next) {
  return res.render('pages/quiz/add_bulk_question', {
    isLoggesIn: true,
    user: req.user,
  });
}
function add_one_question(req, res, next) {
  return res.render('pages/quiz/add_one_questoin', {
    isLoggesIn: true,
    user: req.user,
  });
}
module.exports = {
  listAll,
  newQuiz,
  add_bulk_question,
  add_one_question,
}