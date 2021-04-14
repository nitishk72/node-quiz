const Quiz = require("../models/quiz");
const Question = require("../models/questions");
const Option = require("../models/options");

async function find(req, res, next) {
  const doc = await Quiz.findById(req.params.id);
  if (!doc) return res.send("Not found");
  return res.render("pages/quiz/view", {
    isLoggesIn: true,
    user: req.user,
    role: "Professor",
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
  return res.json(doc);
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
  const doc = await Quiz.findById(req.params.id);
  if (!doc) return res.send("Not found");
  return res.json(req.body);
  return res.render("pages/quiz/add_one_questoin", {
    isLoggesIn: true,
    user: req.user,
    title: "Add One Question",
    role: "Professor",
    data: doc,
  });
}
module.exports = {
  find,
  list,
  create,
  store,
  add_bulk_question,
  add_one_question,
  store_one_question,
};
