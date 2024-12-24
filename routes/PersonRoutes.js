const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
router.post("/signup", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const data = await newPerson.save();
    const payload = {
      id: data.id,
      username: data.username,
    };
    const token = generateToken(payload);
    // console.log("token generated", token);

    res.status(200).json({ data: data, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json("Invalid Username or password");
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ err: "Internal server error" });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const data = await Person.findById(userId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
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

router.delete("/:id", async (req, res) => {
  try {
    const data = await Person.deleteOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
