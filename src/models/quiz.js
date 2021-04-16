const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Questoin = new Schema(
  {
    name: String,
    description: String,
    attempted: {
      type:Number,
      default:0,
    },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

const Quizzes = mongoose.model("Quiz", Questoin, "quiz");
module.exports = Quizzes;
