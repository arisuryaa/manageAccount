const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "email harus di isi"],
  },
  password: {
    type: String,
    require: [true, "password harus di isi"],
  },
});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
// schema,Model
// Bcrypt ( Login & Register )
