const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  track_name: {
    type: String,
    required: true,
  },
  size_bytes: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating_count: {
    type: Number,
    required: true,
  },
  rating_count: {
    type: Number,
    required: true,
  },
  user_rating: {
    type: Number,
    required: true,
  },
  user_rating_ver: {
    type: Number,
    required: true,
  },
  ver: {
    type: String,
    required: true,
  },
  cont_rating: {
    type: String,
    required: true,
  },
  prime_genre: {
    type: String,
    required: true,
  },
  sup_devices: {
    num: {
      type: Number,
      required: true,
    },
  },
  ipadSc_urls: {
    num: {
      type: Number,
      required: true,
    },
  },
  lang: {
    num: {
      type: Number,
      required: true,
    },
  },
  vpp_lic: {
    type: Number,
    required: true,
  },
});

module.exports = Item = mongoose.model("Application", ApplicationSchema);
