const Question = require("../../models/questions");
const Response = require("../../models/response");
const Quiz = require("../../models/quiz");

async function submitResponse(req, res, next) {
  let {quizId, response, userId} = req.body;
  let allQuestions = Object.keys(response);
  let answers = [];

  const questions = await Question.find({
    '_id': { $in: allQuestions}
  }).populate({
    path:'options'
  });
  let quiz = await Quiz.findByIdAndUpdate({'_id' :quizId },
  {$inc : {'attempted' : 1}});

  questions.forEach(function(question) {
    let qId = question['_id'];
    let selectedOption = response[qId];
    let allOptions = question['options'];
    allOptions.forEach(function (option) {
      if(option['_id'] == selectedOption){
        answers.push({
          questionId: qId,
          optionId: option['_id'],
        });
      }
    });
  });

  let result = await Response.create({
    userId,
    quizId,
    answers
  })

  return res.json({ result });
}

module.exports = submitResponse;