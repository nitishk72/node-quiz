const router = require("express").Router();
const quiz = require("../controllers/quiz");

const connectEnsureLogin = require("connect-ensure-login");

router.get("/", connectEnsureLogin.ensureLoggedIn("/login"), quiz.listForUser);

router.get("/:id", connectEnsureLogin.ensureLoggedIn("/login"), quiz.findForPreview);

router.get("/:id/start", connectEnsureLogin.ensureLoggedIn("/login"), quiz.findForUser);

router.get("/new", connectEnsureLogin.ensureLoggedIn("/login"), quiz.create);
router.get(
  "/:quizID/add",
  connectEnsureLogin.ensureLoggedIn("/login"),
  quiz.add_bulk_question
);
// router.get(
//   "/:quizID/add_one",
//   connectEnsureLogin.ensureLoggedIn("/login"),
//   professor.add_one_question
// );

router.post('/ajax/submit-response', connectEnsureLogin.ensureLoggedIn('/login'), quiz.submitResponse);


module.exports = router;
