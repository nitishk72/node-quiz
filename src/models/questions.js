const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Question = new Schema(
  {
    text: String,
    positive_point: Number,
    negative_point: Number,
    options: [{ type: Schema.Types.ObjectId, ref: "Option" }],
  },
  { timestamps: true }
);

const Questions = mongoose.model("Question", Question, "question");
module.exports = Questions;
