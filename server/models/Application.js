const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// // Create Schema
// const ProductSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
// });

module.exports = Item = mongoose.model("application", ApplicaionSchema);
