const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Questoin = new Schema(
  {
    text: String,
    positive_point: Number,
    negative_point: Number,
    options: [{ type: Schema.Types.ObjectId, ref: "Option" }],
  },
  { timestamps: true }
);

const Questoins = mongoose.model("Question", Questoin, "question");
module.exports = Questoins;
