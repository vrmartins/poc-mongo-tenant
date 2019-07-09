const mongoose = require('mongoose');
const mongoTenant = require('mongo-tenant');
const tenantConfig = require('./tenant-config')
 
const BookSchema = new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
});

BookSchema.plugin(mongoTenant, tenantConfig);

const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel
