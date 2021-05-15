const Question = require("../../models/questions");
const Response = require("../../models/response");
const Quiz = require("../../models/quiz");

async function submitResponse(req, res, next) {
  let { quizId, response, userId } = req.body;
  let allQuestions = Object.keys(response);
  let answers = [];
  let right = 0;
  let wrong = 0;
  let allMarks = 0;

  const questions = await Question.find({
    '_id': { $in: allQuestions }
  }).populate({
    path: 'options'
  });

  await Quiz.findByIdAndUpdate(
    { '_id': quizId },
    { $inc: { 'attempted': 1 } }
  );

  questions.forEach(function (question) {
    let qId = question['_id'];
    let selectedOption = response[qId];
    let allOptions = question['options'];
    allOptions.forEach(function (option) {
      if (option['_id'] == selectedOption) {
        if (option['isCorrect']) {
          right++;
        } else {
          wrong++;
        }
        let marks = option['isCorrect'] ? question['positive_point'] : question['negative_point'];
        allMarks += marks;
        answers.push({
          questionId: qId,
          optionId: option['_id'],
          isCorrect: option['isCorrect'],
          marks: marks,
        });
      }
    });
  });

  let result = await Response.create({
    userId,
    quizId,
    answers,
    right,
    wrong,
    marks: allMarks,
  })

  return res.json({ result });
}

module.exports = submitResponse;