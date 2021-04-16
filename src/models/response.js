const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Response = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref:"loginInfo"
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz" 
    },
    answers: [{ 
      questionId :{
        type: Schema.Types.ObjectId, 
        ref: "Question" 
      },
      optionId :{
        type: Schema.Types.ObjectId, 
        ref: "Option" 
      }
    }],
  },
  { timestamps: true }
);

const Quizzes = mongoose.model("response", Response, "response");
module.exports = Quizzes;
