import { Router } from "express";

// Application Model
import Application from "../../models/Application";

const router = Router();

// @route   GET api/applications
// @desc    Get All Applications
const query = {};
const projection = [];
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find();
    if (!applications) throw Error("No applications found");

    res.status(200).json(applications);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route   GET api/applications/genres
// @desc    Get All Unique Application Genres
router.get("/genres", async (req, res) => {
  try {
    const applications = await Application.collection.distinct("prime_genre");
    if (!applications) throw Error("No applications found");

    res.status(200).json(applications);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route   GET api/applications/:genre
// @desc    Get All Applications for a Given Genre (prime_genre)
router.get("/:genre", async (req, res) => {
  try {
    const applications = await Application.find(
      { prime_genre: req.params.genre },
      "track_name price rating_count_tot user_rating"
    );
    if (!applications) throw Error("No applications found");

    res.status(200).json(applications);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

export default router;
