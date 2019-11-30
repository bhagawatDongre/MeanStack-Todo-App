var mongoose = require('mongoose')

var TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: { type: String, default: '0' },
  due_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', TodoSchema);

