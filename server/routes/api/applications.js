const express = require("express");
const router = express.Router();

// Application Model
const Application = require("../../models/Application");

// @route   GET api/applications
// @desc    Get All Applications
router.get("/", (req, res) => {
  Application.find({}).then((applications) => res.send(applications));
});

module.exports = router;
