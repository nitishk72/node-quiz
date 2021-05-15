const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const passport = require("passport");
const dotenv = require("dotenv");
const UserDetails = require("./src/models/user");
const app = express();
const upload = require("express-fileupload");
dotenv.config();
app.use(upload());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret_passcode'))
app.use(
  session({
    secret: "derpy",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 4000000
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const PORT = process.env.PORT || 5050;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const TIME = Date.now();
const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(CONNECTION_STRING, mongodbOptions, dbCallback);
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use("/static", express.static("public"));
app.use("/", require("./src/routes/static"));
app.use("/", require("./src/routes/auth"));
app.use("/", require("./src/routes/dashboard"));
app.use("/quiz", require("./src/routes/quiz"));
app.use("/professor", require("./src/routes/professor"));

function startCallback() {
  let message = `Website is available at http://localhost:${PORT}`;
  console.log(message);
}

function dbCallback(err, client) {
  if (err) throw err.message;
  console.log(`Connected to Database in ${Date.now() - TIME} ms`);
  app.listen(PORT, startCallback);
}
