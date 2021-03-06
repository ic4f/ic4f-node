const mongoose = require('mongoose');
const ids = require('./_ids');
const project_ids   = ids.projects;
const group_ids     = ids.groups;
const language_ids  = ids.languages;
const framework_ids = ids.frameworks; 
const database_ids  = ids.databases;

const Project = new mongoose.Schema({
  _id: {
    type: String,
    lowercase: true,
    enum: project_ids
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  group: [{
    type: String,
    ref: 'Group',
    enum: group_ids
  }],
  project_name: String,
  project_count: {
    type: Number,
    default: 1
  },
  order : {
    type: Number,
    default: 0
  },
  year_start: {
    type: Number,
    required: true,
  },
  year_end: Number,
  github_repo: String,
  github_oldcode: String,
  has_content: {
    type: Boolean,
    default: false
  },
  languages: [{
    type: String,
    ref: 'Language',
    enum: language_ids
  }],
  frameworks: [{
    type: String,
    ref: 'Framework',
    enum: framework_ids
  }],
  databases: [{
    type: String,
    ref: 'Database',
    enum: database_ids
  }],
  content: {
    type: String,
    required: false
  }
});

Project.statics.getList = function(callback) {
  return this
    //.find({},{content:0})
    .find({})
    .sort({'order': -1})
    .populate({
      path: 'group',
      select: 'id name',
      options: {sort: { order: 1 }}
    })
    .populate({
      path: 'languages',
      select: 'id name',
      options: {sort: { order: 1 }}
    })
    .populate({
      path: 'frameworks',
      select: 'id name',
      options: {sort: { order: 1 }}
    })
    .populate({
      path: 'databases',
      select: 'id name',
      options: {sort: { order: 1 }}
    })
    .exec(callback);
};

Project.statics.countByGroup = function(group, callback) {
  return this.count({'group': group} , callback);
};

Project.statics.countByLanguage = function(language, callback) {
  return this.count({'languages':  language} , callback);
};

Project.statics.countByFramework = function(framework, callback) {
  return this.count({'frameworks': framework} , callback);
};

Project.statics.countByDatabase = function(database, callback) {
  return this.count({'databases': database} , callback);
};

mongoose.model('Project', Project, 'projects');
