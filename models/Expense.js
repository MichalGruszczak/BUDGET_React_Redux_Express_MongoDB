const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  id: {
    type: String,
    default: Math.floor(Math.random() * 999999999999),
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
  permanent: {
    type: Boolean,
    default: false,
  },
});

module.exports = Expense = mongoose.model("Expense", ExpenseSchema);
