const router = require("express").Router();
const { professor, quiz } = require("../controllers");
const connectEnsureLogin = require("connect-ensure-login");

router.get("/", connectEnsureLogin.ensureLoggedIn("/home"), professor.index);

router.get("/quiz", connectEnsureLogin.ensureLoggedIn("/home"), quiz.list);

router.get(
  "/quiz/create",
  connectEnsureLogin.ensureLoggedIn("/home"),
  quiz.create
);

router.post(
  "/quiz/create",
  connectEnsureLogin.ensureLoggedIn("/home"),
  quiz.store
);

router.get("/quiz/:id", connectEnsureLogin.ensureLoggedIn("/home"), quiz.find);
router.get("/quiz/:id/result", connectEnsureLogin.ensureLoggedIn("/home"), quiz.listAttemptedStudents);

router.get(
  "/quiz/:id/add-one",
  connectEnsureLogin.ensureLoggedIn("/home"),
  quiz.add_one_question
);

router.post(
  "/quiz/:id/add-one",
  connectEnsureLogin.ensureLoggedIn("/home"),
  quiz.store_one_question
);

router.get("/quiz/:id/delete", connectEnsureLogin.ensureLoggedIn("/home"), quiz.destoryQuiz);


module.exports = router;
