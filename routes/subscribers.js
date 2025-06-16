const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.subscriber.name);
});

router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subbed: req.body.subbed,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getSubscriber, (req, res) => {});

router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.deleteOne({ _id: req.params.id });
    res.json({ message: "Delete Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const name = req.body.name;
    const deleteAmount = await Subscriber.deleteMany({
      name,
    });
    let count = deleteAmount.deletedCount;
    res.json({ message: `Delete count: ${count}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber === null) {
      return res.status(404).json({ message: "Cannot find Subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
