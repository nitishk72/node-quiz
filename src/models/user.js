const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const User = new Schema(
  {
    name: String,
    email: String,
    username: String,
    password: String,
    role: {
      type: String,
      enum: ["USER", "PROFESSOR", "MODERATOR", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

User.plugin(passportLocalMongoose);
const Users = mongoose.model("User", User, "User");

module.exports = Users;
