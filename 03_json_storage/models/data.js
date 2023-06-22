const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  jsonPath: {
    type: String,
    required: [true, 'JSON path must be provided'],
  },
  data: {
    type: Object,
    required: [true, 'Data must be provided'],
  },
});

module.exports = mongoose.model('Data', dataSchema);
