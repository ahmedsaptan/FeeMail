const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  responsed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = recipientSchema;
