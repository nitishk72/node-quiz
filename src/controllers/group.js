const Group = require("../models/group");
const Quiz = require("../models/quiz");
const Users = require("../models/user");
const mongoose = require('mongoose');

async function list(req, res, next) {

  const doc = await Group.find({ created_by: req.user['_id'] });
  let message = "";
  let type = "";
  return res.render("pages/group/list", {
    isLoggesIn: true,
    user: req.user,
    role: "Professor",
    data: doc,
    message: message,
    type: type,
  });
}

async function view(req, res, next) {
  const doc = await Group.findOne({ created_by: req.user['_id'], _id: req.params.id }).populate('available_for');
  let message = "";
  let type = "";
  return res.render("pages/group/view", {
    isLoggesIn: true,
    user: req.user,
    role: "Professor",
    data: doc,
    quizId: req.params.id,
    message: message,
    type: type,
  });
}

async function create(req, res, next) {
  let message, type;
  return res.render("pages/group/create", {
    isLoggesIn: true,
    user: req.user,
    role: "Professor",
    message: message,
    type: type,
  });
}

async function store(req, res, next) {
  let { name } = req.body;
  const doc = await Group.create({
    name,
    created_by: req.user['_id']
  });
  return res.redirect(`/professor/group/${doc['_id']}`);
}

async function createMember(req, res, next) {
  let message, type;
  return res.render("pages/group/add_member", {
    isLoggesIn: true,
    user: req.user,
    role: "Professor",
    message: message,
    type: type,
  });
}


async function storeMember(req, res, next) {
  let { emails } = req.body;
  let user = await Users.find({
    'email': { $in: emails.split(',') }
  }, {
    "_id": 1,
  });
  let af = user.map(e => e.id);
  console.log(af)
  const doc = await Group.findOneAndUpdate({ '_id': req.params.id }, {
    $addToSet: { 'available_for': af }
  });
  return res.redirect(`/professor/group/${doc['_id']}`);

}
async function linkgroup(req, res, next) {
  let { id } = req.params;
  let { group_id } = req.body;
  let group = await Group.findOne({ '_id': group_id });
  let quiz = await Quiz.findOneAndUpdate({ '_id': id }, {
    available_for: group['available_for']
  })
  return res.redirect(`/professor/quiz/${id}`);
}

async function downloadCSV(req, res, next) {
  let { id } = req.params;
  const data = await Group.findOne({
    created_by: req.user['_id'],
    _id: id
  }).populate('available_for');

  var csv = data['available_for'].map(function (d) {
    return `${d.id}, ${d.name}, ${d.email}, ${d.username}, ${d.createdAt}`;
  });
  csv = [`ID, Name, Email, Username, Created_at`, ...csv]
  res.setHeader('Content-disposition', `attachment; filename=group-${data['name']}-${data['_id']}.csv`);
  res.set('Content-Type', 'text/csv');
  res.status(200).send(csv.join('\n'));

}

async function removeUser(req, res, next) {
  let { id, userId } = req.params;
  const data = await Group.findOneAndUpdate({
    created_by: req.user['_id'],
    _id: id
  }, {
    $pull: { available_for: mongoose.Types.ObjectId(userId) }
  });
  return res.redirect(`/professor/group/${id}`);
}
module.exports = {
  list,
  view,
  create,
  store,
  createMember,
  storeMember,
  linkgroup,
  downloadCSV,
  removeUser,
};
