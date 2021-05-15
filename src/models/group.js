const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Group = new Schema(
  {
    name: String,
    available_for: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Groups = mongoose.model("Group", Group, "group");
module.exports = Groups;
