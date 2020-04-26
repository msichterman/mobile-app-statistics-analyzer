const express = require("express");
const router = express.Router();

// Product Model
const Application = require("../../models/Application");

// // @route   GET api/products
// // @desc    Get All Products
// // @access  Basic auth
// // Get all products
// router.get("/", auth, (req, res) => {
//   Product.find()
//     .sort({ date: 1 })
//     .then((products) => res.json(products));
// });

// // @route   POST api/products
// // @desc    Create A Product
// // @access  Private
// router.post("/", auth, (req, res) => {
//   if (req.user.role === "Admin") {
//     const newProduct = new Product({
//       name: req.body.name,
//       price: req.body.price,
//       quantity: req.body.quantity,
//     });
//     newProduct
//       .save()
//       .then((product) => {
//         return res.json(product);
//       })
//       .catch((error) => {
//         return res.status(400).json({ msg: "Couldn't create product" });
//       });
//   } else {
//     return res.status(400).json({ msg: "Not Authorized to create product!" });
//   }
// });

// // @route   PUT api/products
// // @desc    Update A Product (as an Admin?)
// // @access  Private
// router.put("/", auth, (req, res) => {
//   let updatedParams = {};
//   if (req.body.price) {
//     if (req.user.role === "Admin" || req.user.role === "Sales Manager") {
//       updatedParams.price = req.body.price;
//     } else {
//       return res.status(400).json({ msg: "Not authorized to change price." });
//     }
//   }
//   if (req.body.quantity) {
//     if (req.user.role === "Admin" || req.user.role === "Production Manager") {
//       updatedParams.quantity = req.body.quantity;
//     } else {
//       return res
//         .status(400)
//         .json({ msg: "Not authorized to change quantity." });
//     }
//   }
//   Product.findOneAndUpdate(
//     { name: req.body.name },
//     {
//       $set: updatedParams,
//     },
//     // new option returns updated object
//     { new: true, useFindAndModify: false }
//   )
//     .then((product) => {
//       if (product) {
//         return res.json(product);
//       } else {
//         return res.status(400).json({ msg: "Couldn't find product." });
//       }
//     })
//     .catch((error) => {
//       return res.status(400).json({ msg: "Couldn't update product." });
//     });
// });

module.exports = router;
