const mongoose = require("mongoose");
const { Schema } = mongoose;
const Recipient = require("./Recipient");

const surveySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  recipients: {
    type: [Recipient],
    required: true,
  },
  yes: {
    type: Number,
    default: 0,
  },
  no: { type: Number, default: 0 },
  _user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
  lastResponded: {
    type: Date,
  },
});

mongoose.model("surveys", surveySchema);
