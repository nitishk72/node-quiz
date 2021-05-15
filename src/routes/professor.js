const router = require("express").Router();
const { professor, quiz, group } = require("../controllers");
const connectEnsureLogin = require("connect-ensure-login");

router.get("/", connectEnsureLogin.ensureLoggedIn("/home"), professor.index);

router.get("/quiz", connectEnsureLogin.ensureLoggedIn("/home"), professor.list);
router.get("/group", connectEnsureLogin.ensureLoggedIn("/home"), group.list);
router.get("/group/add", connectEnsureLogin.ensureLoggedIn("/home"), group.create);
router.post("/group/add", connectEnsureLogin.ensureLoggedIn("/home"), group.store);
router.get("/group/:id", connectEnsureLogin.ensureLoggedIn("/home"), group.view);
router.get("/group/:id/download", connectEnsureLogin.ensureLoggedIn("/home"), group.downloadCSV);
router.get("/group/:id/:userId/remove", connectEnsureLogin.ensureLoggedIn("/home"), group.removeUser);
router.get("/group/:id/add", connectEnsureLogin.ensureLoggedIn("/home"), group.createMember);
router.post("/group/:id/add", connectEnsureLogin.ensureLoggedIn("/home"), group.storeMember);

router.get("/result/:id", connectEnsureLogin.ensureLoggedIn("/home"), quiz.viewSelectedOption);

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
router.post("/quiz/:id/link-group", connectEnsureLogin.ensureLoggedIn("/home"), group.linkgroup);
router.get("/quiz/:id/result", connectEnsureLogin.ensureLoggedIn("/home"), quiz.listAttemptedStudents);
router.get("/quiz/:id/result.csv", connectEnsureLogin.ensureLoggedIn("/home"), quiz.downloadCSV);

router.get(
  "/quiz/:id/add-one",
  connectEnsureLogin.ensureLoggedIn("/home"),
  professor.add_one_question
);

router.post(
  "/quiz/:id/add-one",
  connectEnsureLogin.ensureLoggedIn("/home"),
  professor.store_one_question
);

router.get(
  "/quiz/:id/upload",
  connectEnsureLogin.ensureLoggedIn("/home"),
  professor.upload_page
);

router.post(
  "/quiz/:id/upload",
  connectEnsureLogin.ensureLoggedIn("/home"),
  professor.upload_from_csv
);

router.get("/quiz/:id/delete", connectEnsureLogin.ensureLoggedIn("/home"), professor.destoryQuiz);
router.get("/quiz/:id/disable", connectEnsureLogin.ensureLoggedIn("/home"), professor.disable);
router.get("/quiz/:id/enable", connectEnsureLogin.ensureLoggedIn("/home"), professor.enable);
router.get("/quiz/:id/reset", connectEnsureLogin.ensureLoggedIn("/home"), professor.reset);

module.exports = router;
