const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Question = new Schema(
  {
    text: String,
    positive_point: {
      type: Number,
      default: 1,
    },
    negative_point: {
      type: Number,
      default: 0.5,
    },
    options: [{ type: Schema.Types.ObjectId, ref: "Option" }],
  },
  { timestamps: true }
);

const Questions = mongoose.model("Question", Question, "question");
module.exports = Questions;
