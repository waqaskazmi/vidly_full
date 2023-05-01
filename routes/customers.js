const { validate, Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    isGold: req.body.isGold,
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer;
  try {
    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        isGold: req.body.isGold,
      },
      {
        new: true,
      }
    );
  } catch (ex) {
    return res.status(404).send(ex, "customer with given id does not exist");
  }
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  let customer;
  try {
    customer = await Customer.findByIdAndRemove(req.params.id);
  } catch (ex) {
    return res.status(404).send("Customer with given id does not exist");
  }

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
  } catch (ex) {
    return res.status(404).send("Customer with the given id does not exist");
  }

  res.send(customer);
});

module.exports = router;
