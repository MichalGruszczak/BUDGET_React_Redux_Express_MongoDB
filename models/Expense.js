const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  id: {
    type: String,
    default: uuidv4(),
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    require: true,
  },
  deadline: {
    type: Date,
    default: "",
  },
  done: {
    type: Boolean,
    default: false,
  },
});

module.exports = Expense = mongoose.model("Expense", ExpenseSchema);
