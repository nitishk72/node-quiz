const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Quiz = new Schema(
  {
    name: String,
    description: String,
    attempted: {
      type: Number,
      default: 0,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    is_disabled: {
      type: Boolean,
      default: false,
    },
    available_for: [{ type: Schema.Types.ObjectId, ref: "User" }],
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Quizzes = mongoose.model("Quiz", Quiz, "quiz");
module.exports = Quizzes;
