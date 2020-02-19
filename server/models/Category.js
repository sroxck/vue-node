const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref:'Category'}
})
const RS = mongoose.model('Category', schema)
module.exports = RS