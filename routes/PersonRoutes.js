const express = require("express");
const router = express.Router();
const Person = require("./../models/Product");

router.post("/", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const data = await newPerson.save();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ err: "Internal server error" });
  }
});

router.get("/:worktype", async (req, res) => {
  const worktype = req.params.worktype;
  try {
    if (worktype == "manager" || worktype == "waiter" || worktype == "chef") {
      const data = await Person.find({ work: worktype });
      res.status(200).send(data);
    } else {
      res.status(404).send({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error" });
  }
});

// This is updates routes

router.put("/:id", async (req, res) => {
  try {
    const data = await Person.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (!data) {
      res.status(404).send({ error: "person not found" });
    }
    console.log("data updated");
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
