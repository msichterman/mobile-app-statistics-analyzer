import { Router } from "express";

// Application Model
import Application from "../../models/Application";

const router = Router();

// @route GET api/applications/price-ratings
// @desc    Get All Applications price, rating count, rating, and genre
router.get("/price-ratings", async (req, res) => {
  try {
    // Finds the distinct genres
    const applications = await Application.find(
      {},
      "track_name price rating_count_tot user_rating prime_genre"
    );

    if (!applications) throw Error("No applications found");

    res.status(200).json(applications);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route   GET api/applications/cost
// @desc    Get all applications costing greater than $20
router.get("/cost", async (req, res) => {
  try {
    // Use an aggregate to find the apps of each genre where price > $20 and then group them to get the count of each genre
    const costly_apps = await Application.aggregate([
      {
        $project: {
          _id: 0,
          prime_genre: 1,
          CostlyApp: {
            // If price is greater than $20, add one to count otherwise add 0 (none)
            $cond: [{ $gt: ["$price", 20] }, 1, 0],
          },
        },
      },
      {
        $group: {
          _id: "$prime_genre",
          count: { $sum: "$CostlyApp" },
        },
      },
    ]);
    if (!costly_apps) throw Error("No applications found");

    res.status(200).json(costly_apps);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route   GET api/applications/genres
// @desc    Get All Unique Application Genres
router.get("/genres", async (req, res) => {
  try {
    // Finds the distinct genres
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
    // Find apps with various fields given a prime_genre
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

// @route   GET api/applications/
// @desc    Get All Apps
router.get("/", async (req, res) => {
  try {
    // Finds the distinct genres
    const applications = await Application.find();

    if (!applications) throw Error("No applications found");

    res.status(200).json(applications);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

export default router;
