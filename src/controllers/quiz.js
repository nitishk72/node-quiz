const Quiz = require("../models/quiz");
const Question = require("../models/questions");
const Option = require("../models/options");
const submitResponse = require('./quiz/submit');

async function find(req, res, next) {
  const doc = await Quiz.findById(req.params.id).populate({
    path:'questions',
    populate: {
      path: 'options',
      model: 'Option'
    } 
  });
  if (!doc) return res.send("Not found");
  return res.render("pages/quiz/view", {
    isLoggesIn: true,
    user: req.user,
    role: "Professor",
    data: doc,
  });
}
async function findForPreview(req, res, next) {
  const doc = await Quiz.findById(req.params.id).populate({
    path:'questions',
    populate: {
      path: 'options',
      model: 'Option'
    } 
  });
  if (!doc) return res.send("Not found");
  return res.render("pages/user/preview", {
    isLoggesIn: true,
    user: req.user,
    role: "User",
    data: doc,
  });
}
async function findForUser(req, res, next) {
  const doc = await Quiz.findById(req.params.id).populate({
    path:'questions',
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
async function list(req, res, next) {
  const doc = await Quiz.find({});
  return res.render("pages/quiz/list", {
    isLoggesIn: true,
    user: req.user,
    role: "Professor",
    data: doc,
  });
}
async function listForUser(req, res, next) {
  const doc = await Quiz.find({});
  return res.render("pages/user/list", {
    isLoggesIn: true,
    user: req.user,
    role: "User",
    data: doc,
  });
}
async function destoryQuiz(req, res, next) {
  const doc = await Quiz.findByIdAndDelete(req.params.id)
  return res.redirect(`/professor/quiz`);
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
async function add_one_question(req, res, next) {
  const doc = await Quiz.findById(req.params.id);
  if (!doc) return res.send("Not found");
  return res.render("pages/quiz/add_one_questoin", {
    isLoggesIn: true,
    user: req.user,
    title: "Add One Question",
    role: "Professor",
    data: doc,
  });
}
async function store_one_question(req, res, next) {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.send("Not found");
  let { correct, question, option_a, option_b, option_c, option_d } = req.body;
  let buildOptions = [];
  if(option_a != ""){
    buildOptions.push({
      text:option_a,
      isCorrect: "A" == correct,
    });
  }
  if(option_b != ""){
    buildOptions.push({
      text:option_b,
      isCorrect: "B" == correct,
    });
  }
  if(option_c != ""){
    buildOptions.push({
      text:option_c,
      isCorrect: "C" == correct,
    });
  }

  if(option_d != ""){
    buildOptions.push({
      text:option_d,
      isCorrect: "D" == correct,
    });
  }

  
  const options = await Option.insertMany(buildOptions);
  const docs = await Question.create({
    text: question,
    positive_point: 1,
    negative_point: -1,
    options: options.map(e=>e.id),
  });
  await quiz.update({
    $push:{
      'questions' : docs.id
    }
  });
  return res.redirect(`/professor/quiz/${req.params.id}`);
}


module.exports = {
  find,
  list,
  create,
  store,
  add_bulk_question,
  add_one_question,
  store_one_question,
  destoryQuiz,
  findForPreview,
  findForUser,
  listForUser,
  submitResponse,
};
