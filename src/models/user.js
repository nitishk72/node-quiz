const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const UserDetail = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["USER", "PROFESSOR", "MODERATOR", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model("loginInfo", UserDetail, "loginInfo");

module.exports = UserDetails;
