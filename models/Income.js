const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const IncomeSchema = new Schema({
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
});

module.exports = Income = mongoose.model("Income", IncomeSchema);
