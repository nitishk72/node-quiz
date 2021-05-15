const Quiz = require("../models/quiz");
const Group = require("../models/group");
const Response = require("../models/response");
const Option = require("../models/options");
const submitResponse = require('./quiz/submit');
const json2csv = require('json2csv');

async function find(req, res, next) {
  const doc = await Quiz.findById(req.params.id).populate({
    path: 'questions',
    populate: {
      path: 'options',
      model: 'Option'
    }
  });
  const group = await Group.find({ 'created_by': req.user['_id'] });
  if (!doc) return res.send("Not found");

  let message = req.flash('message');
  let type = req.flash('type');
  return res.render("pages/quiz/view", {
    isLoggesIn: true,
    user: req.user,
    role: "Professor",
    data: doc,
    quizId: req.params.id,
    group: group,
    message: message,
    type: type,
  });
}
async function findForPreview(req, res, next) {
  let user = req.user;
  let id = user['_id'];

  const doc = await Quiz.findById(req.params.id);
  if (!doc) return res.send("Not found");

  let res2 = await Response.findOne({ quizId: req.params.id, userId: id, isValid: { value: true } })
  if (res2) return res.render("pages/user/already", {
    isLoggesIn: true,
    user: req.user,
    role: "User",
  });


  return res.render("pages/user/preview", {
    isLoggesIn: true,
    user: req.user,
    role: "User",
    data: doc,
  });
}
async function findForUser(req, res, next) {
  const doc = await Quiz.findById(req.params.id).populate({
    path: 'questions',
    populate: {
      path: 'options',
      model: 'Option'
    }
  });
  if (!doc) return res.send("Not found");
  return res.render("pages/user/view", {
    isLoggesIn: true,
    user: req.user,
    role: "User",
    data: doc,
  });
}
async function listForUser(req, res, next) {
  const doc = await Quiz.where('available_for').in([req.user['_id']]);
  return res.render("pages/user/list", {
    isLoggesIn: true,
    user: req.user,
    role: "User",
    data: doc,
  });
}
function create(req, res, next) {
  return res.render("pages/quiz/create", {
    isLoggesIn: true,
    user: req.user,
    role: "Professor",
  });
}
async function store(req, res, next) {
  let { name, description } = req.body;
  const doc = await Quiz.create({ name, description });
  return res.redirect(`/professor/quiz/${doc._id}`);
}
async function add_bulk_question(req, res, next) {
  const doc = await Quiz.findById(req.params.id);
  if (!doc) return res.send("Not found");
  return res.render("pages/quiz/add_bulk_question", {
    isLoggesIn: true,
    user: req.user,
    role: "Professor",
    title: "Add Bulk Question",
    data: doc,
  });
}
async function listAttemptedStudents(req, res, next) {
  const doc = await Response.find({ 'quizId': req.params.id }).populate({
    path: 'userId',
  });
  return res.render("pages/quiz/result", {
    isLoggesIn: true,
    user: req.user,
    data: doc,
    quizId: req.params.id,
  });
}

async function viewSelectedOption(req, res, next) {
  const doc = await Response.findById(req.params.id).populate({
    path: 'quizId',
  }).populate({
    path: 'userId',
  }).populate({
    path: 'answers.questionId',
    populate: {
      path: 'options',
      model: 'Option'
    }
  }).populate({
    path: 'answers.optionId',
  });
  return res.render("pages/quiz/result_view", {
    isLoggesIn: true,
    user: req.user,
    data: doc,
  });
}
async function downloadCSV(req, res, next) {
  let quizId = req.params.id;
  let data = await Response.find({ quizId });
  // .populate({
  //   path: 'userId',
  // });
  var csv = data.map(function (d) {
    return `${d.userId}, ${d.right}, ${d.wrong}, ${d.marks}, ${d.createdAt}`;
  });
  csv = [`User ID, Right, Wrong, Marks, Created_at`, ...csv]
  // let csv = json2csv.parse(new json2csv.Parser({ data }));
  res.setHeader('Content-disposition', `attachment; filename=${quizId}.csv`);
  res.set('Content-Type', 'text/csv');
  res.status(200).send(csv.join('\n'));
}

module.exports = {
  find,
  create,
  store,
  add_bulk_question,
  findForPreview,
  findForUser,
  listForUser,
  submitResponse,
  listAttemptedStudents,
  downloadCSV,
  viewSelectedOption,
};
