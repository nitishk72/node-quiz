const Quiz = require("../models/quiz");
const Question = require("../models/questions");
const Response = require("../models/response");
const Option = require("../models/options");
const submitResponse = require('./quiz/submit');
const json2csv = require('json2csv');
const csvtojson = require("csvtojson");


function index(req, res, next) {
  return res.render("pages/professor/index", {
    isLoggesIn: true,
    user: req.user,
    title: "Professor's Home",
    role: "Professor",
  });
}

async function list(req, res, next) {
  let message = req.flash('message');
  let type = req.flash('type');

  const doc = await Quiz.find({ is_deleted: false });
  return res.render("pages/quiz/list", {
    isLoggesIn: true,
    user: req.user,
    role: "Professor",
    data: doc,
    message: message,
    type: type,
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
  if (option_a != "") {
    buildOptions.push({
      text: option_a,
      isCorrect: "A" == correct,
    });
  }
  if (option_b != "") {
    buildOptions.push({
      text: option_b,
      isCorrect: "B" == correct,
    });
  }
  if (option_c != "") {
    buildOptions.push({
      text: option_c,
      isCorrect: "C" == correct,
    });
  }

  if (option_d != "") {
    buildOptions.push({
      text: option_d,
      isCorrect: "D" == correct,
    });
  }


  const options = await Option.insertMany(buildOptions);
  const docs = await Question.create({
    text: question,
    positive_point: 1,
    negative_point: -0.5,
    options: options.map(e => e.id),
  });
  await quiz.update({
    $push: {
      'questions': docs.id
    }
  });
  return res.redirect(`/professor/quiz/${req.params.id}`);
}

async function upload_page(req, res, next) {
  const doc = await Quiz.findById(req.params.id);
  if (!doc) return res.send("Not found");
  return res.render("pages/professor/upload", {
    isLoggesIn: true,
    user: req.user,
    title: "Upload CSV",
    role: "Professor",
    data: doc,
  });
}

async function upload_from_csv(req, res, next) {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.send("Not found");
  const csvData = req.files.file.data.toString('utf8');
  const json = await csvtojson().fromString(csvData);
  json.forEach(async question => {
    let buildOptions = [];
    if (question['field2'] != "") {
      buildOptions.push({
        text: question['field2'],
        isCorrect: "A" == question['field6'],
      });
    }
    if (question['field3'] != "") {
      buildOptions.push({
        text: question['field3'],
        isCorrect: "B" == question['field6'],
      });
    }
    if (question['field4'] != "") {
      buildOptions.push({
        text: question['field4'],
        isCorrect: "C" == question['field6'],
      });
    }

    if (question['field5'] != "") {
      buildOptions.push({
        text: question['field5'],
        isCorrect: "D" == question['field6'],
      });
    }
    const options = await Option.insertMany(buildOptions);
    const docs = await Question.create({
      text: question['field1'],
      positive_point: 1,
      negative_point: -0.5,
      options: options.map(e => e.id),
    });

    await quiz.update({
      $push: {
        'questions': docs.id
      }
    });
  });

  req.flash('message', `Question uploading may take 5-10 seconds`);
  req.flash('type', 'primary');
  return res.redirect(`/professor/quiz/${req.params.id}`);
}

async function destoryQuiz(req, res, next) {
  const doc = await Quiz.findByIdAndUpdate(req.params.id, {
    is_deleted: true
  });
  req.flash('message', `${quiz['name']} is now deleted`);
  req.flash('type', 'danger');
  return res.redirect(`/professor/quiz`);
}
async function disable(req, res, next) {
  let quiz = await Quiz.findByIdAndUpdate(req.params.id, {
    is_disabled: true,
  })
  req.flash('message', `${quiz['name']} is now disabled`);
  req.flash('type', 'warning');
  return res.redirect(`/professor/quiz`);
}
async function enable(req, res, next) {
  let quiz = await Quiz.findByIdAndUpdate(req.params.id, {
    is_disabled: false,
  })
  req.flash('message', `${quiz['name']} is now enabled`);
  req.flash('type', 'primary');
  return res.redirect(`/professor/quiz`);
}
async function reset(req, res, next) {
  let quizId = req.params.id;
  let quiz = await Response.findByIdAndUpdate(quizId, {
    isValid: {
      value: false,
      action: req.user._id,
    }
  })
  req.flash('message', `Test reset successfully`);
  req.flash('type', 'primary');
  return res.redirect(`/professor/${quizId}/result`);
}
module.exports = {
  index,
  list,
  add_one_question,
  store_one_question,
  destoryQuiz,
  upload_page,

  upload_from_csv,
  disable,
  enable,
  reset,
};
