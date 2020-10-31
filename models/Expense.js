const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: "",
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
