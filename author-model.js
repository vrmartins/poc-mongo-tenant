const mongoose = require('mongoose');
const mongoTenant = require('mongo-tenant');
const tenantConfig = require('./tenant-config')
 
const AuthorSchema = new mongoose.Schema({
  name: String,
  age: Number
});

AuthorSchema.plugin(mongoTenant, tenantConfig);
 
const AuthorModel = mongoose.model('Author', AuthorSchema);

module.exports = AuthorModel
