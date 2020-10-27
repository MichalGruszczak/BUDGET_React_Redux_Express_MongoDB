const express = require("express");
const router = express.Router();
const auth = require("../jwtMiddleware");

const Income = require("../models/Income");
const Expense = require("../models/Expense");
const User = require("../models/User");

// Get user items
router.get("/:userEmail", auth, (req, res) => {
  User.findOne({ email: req.params.userEmail })
    .then((user) => res.json(user))
    .catch((err) => console.log(`Data download error: ${err}`));
});

/////////////////////// MONTHLY /////////////////////////

// Add monthly income
router.patch("/:userEmail/monthly/incomes/add", auth, (req, res) => {
  const newMonthlyIncome = new Income({
    title: req.body.title,
    description: req.body.description,
    amount: req.body.amount,
    permanent: req.body.permanent,
  });

  User.updateOne(
    { email: req.params.userEmail },
    {
      $push: { "monthly.incomes": newMonthlyIncome },
    }
  )
    .then(res.json(newMonthlyIncome))
    .catch((err) => console.log(`Adding monthly income failed ${err}`));
});

// Edit monthly income
router.patch("/:userEmail/monthly/incomes/:incomeID/edit", auth, (req, res) => {
  User.updateOne(
    {
      email: req.params.userEmail,
      "monthly.incomes.id": req.params.incomeID,
    },
    {
      $set: {
        "monthly.incomes.$.title": req.body.title,
        "monthly.incomes.$.description": req.body.description,
        "monthly.incomes.$.amount": req.body.amount,
      },
    }
  )
    .then(res.json("Item updated"))
    .catch((err) => console.log(`Updating failed ${err}`));
});

// Delete monthly income
router.patch("/:userEmail/monthly/incomes/:incomeID/delete", auth, (req, res) => {
  User.updateOne(
    { email: req.params.userEmail },
    { $pull: { "monthly.incomes": { id: req.params.incomeID } } }
  )
    .then(res.json("Income deleted"))
    .catch((err) => console.log(`Deleting task failed: ${err}`));
});

// Add monthly expense
router.patch("/:userEmail/monthly/expenses/add", auth, (req, res) => {
  const newMonthlyExpense = new Expense({
    title: req.body.title,
    description: req.body.description,
    amount: req.body.amount,
    deadline: req.body.deadline,
    permanent: req.body.permanent,
  });

  User.updateOne(
    { email: req.params.userEmail },
    { $push: { "monthly.expenses": newMonthlyExpense } }
  )
    .then(() => res.json(newMonthlyExpense))
    .catch((err) => console.log(err));
});

//Edit monthly expense

router.patch("/:userEmail/monthly/expenses/:expenseID/edit", auth, (req, res) => {
  User.updateOne(
    {
      email: req.params.userEmail,
      "monthly.expenses.id": req.params.expenseID,
    },
    {
      $set: {
        "monthly.expenses.$.title": req.body.title,
        "monthly.expenses.$.description": req.body.description,
        "monthly.expenses.$.amount": req.body.amount,
        "monthly.expenses.$.deadline": req.body.deadline,
      },
    }
  )
    .then(res.json("Expense updated"))
    .catch((err) => console.log(`Updating failed ${err}`));
});

// Delete monthly expense
router.patch("/:userEmail/monthly/expenses/:expenseID/delete", auth, (req, res) => {
  User.updateOne(
    {
      email: req.params.userEmail,
    },
    { $pull: { "monthly.expenses": { id: req.params.expenseID } } }
  )
    .then(res.json(`Expense deleted`))
    .catch((err) => console.log(`Deleting failed ${err}`));
});

// Mark monthly expense as done
router.patch("/:userEmail/monthly/expenses/:expenseID/done", auth, (req, res) => {
  User.updateOne(
    { email: req.params.userEmail, "monthly.expenses.id": req.params.expenseID },
    {
      $set: {
        "monthly.expenses.$.done": true,
      },
    }
  )
    .then(res.json(`Expense done`))
    .catch((err) => console.log(`Marking as done failed: ${err}`));
});

//////////////////////// SAVINGS ///////////////////////////

// Add savings income
router.patch("/:userEmail/savings/incomes/add", auth, (req, res) => {
  const newSavingsIncome = new Income({
    title: req.body.title,
    description: req.body.description,
    amount: req.body.amount,
  });

  User.updateOne(
    { email: req.params.userEmail },
    {
      $push: { "savings.incomes": newSavingsIncome },
    }
  )
    .then(res.json(newSavingsIncome))
    .catch((err) => console.log(`Adding savings income failed ${err}`));
});

// Edit savings income
router.patch("/:userEmail/savings/incomes/:incomeID/edit", auth, (req, res) => {
  User.updateOne(
    {
      email: req.params.userEmail,
      "savings.incomes.id": req.params.incomeID,
    },
    {
      $set: {
        "savings.incomes.$.title": req.body.title,
        "savings.incomes.$.description": req.body.description,
        "savings.incomes.$.amount": req.body.amount,
      },
    }
  )
    .then(res.json("Item updated"))
    .catch((err) => console.log(`Updating failed ${err}`));
});

// Delete savings income
router.patch("/:userEmail/savings/incomes/:incomeID/delete", auth, (req, res) => {
  User.updateOne(
    { email: req.params.userEmail },
    { $pull: { "savings.incomes": { id: req.params.incomeID } } }
  )
    .then(res.json("Income deleted"))
    .catch((err) => console.log(`Deleting income failed: ${err}`));
});

// Add savings expense
router.patch("/:userEmail/savings/expenses/add", auth, (req, res) => {
  const newSavingsExpense = new Expense({
    title: req.body.title,
    description: req.body.description,
    amount: req.body.amount,
    deadline: req.body.deadline,
  });

  User.updateOne(
    { email: req.params.userEmail },
    { $push: { "savings.expenses": newSavingsExpense } }
  )
    .then(() => res.json(newSavingsExpense))
    .catch((err) => console.log(err));
});

// Edit savings expense
router.patch("/:userEmail/savings/expenses/:expenseID/edit", auth, (req, res) => {
  User.updateOne(
    {
      email: req.params.userEmail,
      "savings.expenses.id": req.params.expenseID,
    },
    {
      $set: {
        "savings.expenses.$.title": req.body.title,
        "savings.expenses.$.description": req.body.description,
        "savings.expenses.$.amount": req.body.amount,
        "savings.expenses.$.deadline": req.body.deadline,
      },
    }
  )
    .then(res.json("Expense updated"))
    .catch((err) => console.log(`Updating failed ${err}`));
});

// Delete savings expense
router.patch("/:userEmail/savings/expenses/:expenseID/delete", auth, (req, res) => {
  User.updateOne(
    {
      email: req.params.userEmail,
    },
    { $pull: { "savings.expenses": { id: req.params.expenseID } } }
  )
    .then(res.json(`Expense deleted`))
    .catch((err) => console.log(`Deleting failed ${err}`));
});

// Mark savings expense as done
router.patch("/:userEmail/savings/expenses/:expenseID/done", auth, (req, res) => {
  User.updateOne(
    { email: req.params.userEmail, "savings.expenses.id": req.params.expenseID },
    {
      $set: {
        "savings.expenses.$.done": true,
      },
    }
  )
    .then(res.json(`Expense done`))
    .catch((err) => console.log(`Marking as done failed: ${err}`));
});

module.exports = router;
