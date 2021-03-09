const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Option = new Schema({
  text: String,
  isCorrect: Boolean,
});

const Options = mongoose.model('Option', Option, 'option');
module.exports = Options;
