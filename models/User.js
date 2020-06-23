const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: {
    type: String,
  },
});

mongoose.model("users", userSchema);
