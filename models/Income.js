const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IncomeSchema = new Schema({
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
  amount: {
    type: Number,
    require: true,
  },
  permanent: {
    type: Boolean,
    default: false,
  },
});

module.exports = Income = mongoose.model("Income", IncomeSchema);
