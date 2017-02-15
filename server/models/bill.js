var cozydb = require('cozydb');

module.exports = cozydb.getModel('Bill', {
  type: String,
  date: Date,
  vendor: String,
  amount: Number,
  pdfurl: String,
  binaryId: String,
  fileId: String
});