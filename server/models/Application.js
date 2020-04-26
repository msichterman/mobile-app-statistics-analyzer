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
    type: String,
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
    type: Double,
    required: true,
  },
  user_rating: {
    type: Double,
    required: true,
  },
  user_rating_ver: {
    type: Double,
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
});

module.exports = Item = mongoose.model("application", ApplicaionSchema);
