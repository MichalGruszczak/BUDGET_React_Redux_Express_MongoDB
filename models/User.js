const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    default: uuidv4(),
  },

  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  monthly: {
    incomes: Array,
    expenses: Array,
  },
  savings: {
    incomes: Array,
    expenses: Array,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
