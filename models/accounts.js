const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Nama harus diisi"], // Required dengan custom error message
  },
  email: {
    type: String,
    required: [true, "Email harus diisi"], // Required dengan custom error message
    unique: true, // Email harus unik
  },
  password: {
    type: String,
    require: true,
  },
});

const accounts = mongoose.model("accounts", userSchema);
module.exports = accounts;
