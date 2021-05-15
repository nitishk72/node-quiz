const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Response = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz"
    },
    meta: String,
    right: {
      type: Number,
    },
    wrong: {
      type: Number,
    },
    isValid: {
      value: {
        type: Boolean,
        default: true,
      },
      action: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    },
    answers: [{
      questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question"
      },
      optionId: {
        type: Schema.Types.ObjectId,
        ref: "Option"
      },
      isCorrect: Boolean,
      marks: Number,
    }],
    marks: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const Quizzes = mongoose.model("response", Response, "response");
module.exports = Quizzes;
