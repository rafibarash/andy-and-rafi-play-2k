const express = require('express');
const Matchup = require('../models/matchup');

const router = express.Router();

/**
 * @route  GET /.netlify/functions/server/matchup
 * @desc   Get all matchups
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    // Get all matchups
    const rawMatchups = await Matchup.find();
    // Handle no matchup found
    if (!rawMatchups || rawMatchups.length === 0) {
      return res.status(500).json({ msg: 'No matchups currently exist.' });
    }
    const matchups = [];
    // Loop through matchups selecting only key stats
    for (const matchup of rawMatchups) {
      // Just get name and points from team stats
      const { name: name1, points: points1 } = matchup.teamOneStats;
      const { name: name2, points: points2 } = matchup.teamTwoStats;
      // Create winner field for use in frontend
      let winner = name1;
      if (points2 > points1) winner = name2;
      else if (points2 === points1) winner = '';
      // Create object with these selected fields
      const curMatchup = {
        id: matchup.matchupID,
        date: matchup.date,
        teamOneStats: {
          name: name1,
          points: points1,
        },
        teamTwoStats: {
          name: name2,
          points: points2,
        },
        winner,
      };
      // Store object in array to retrn
      matchups.push(curMatchup);
    }
    // Success
    return res.json({ matchups });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Internal Server Error.' });
  }
});

/**
 * @route  GET /.netlify/functions/server/matchup/:matchupID
 * @desc   Get matchup by id
 * @access Public
 */
router.get('/:matchupID', async (req, res) => {
  try {
    // Get matchup from database
    const matchup = await Matchup.findOne(
      {
        matchupID: req.params.matchupID,
      },
      '-_id -__v'
    );

    // Handle no matchup found
    if (!matchup) {
      return res.status(400).json({ msg: 'Matchup not found.' });
    }

    // Success
    return res.json(matchup);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Internal Server Error.' });
  }
});

/**
 * @route  POST /.netlify/functions/server/matchup
 * @desc   Create a matchup
 * @access Public
 */
router.post('/', async (req, res) => {
  try {
    // Get matchup stats from body
    const { teamOneStats, teamTwoStats } = req.body;

    // Create matchup object
    const matchup = new Matchup({
      teamOneStats,
      teamTwoStats,
    });

    // Set matchup ID
    const lastMatchup = await Matchup.findOne({}, 'matchupID').sort(
      '-matchupID'
    ); // get highest existing matchupID
    let curID = 1;
    if (lastMatchup && lastMatchup.matchupID) {
      curID = lastMatchup.matchupID + 1; // curID = highest existing matchupID + 1
    }
    matchup.matchupID = curID;

    // Save matchup objects in DB
    await matchup.save();

    // Success
    return res.json({ msg: 'Successfully entered matchup in database.' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Internal Server Error.' });
  }
});

module.exports = router;
