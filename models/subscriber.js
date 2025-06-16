const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subbed: {
    type: String,
    required: true,
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscriber", SubscriberSchema);
