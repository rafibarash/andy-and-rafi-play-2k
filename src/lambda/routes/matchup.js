const express = require('express');
const Matchup = require('../models/matchup');

const router = express.Router();

/**
 * @route  GET /.netlify/functions/server/matchup/:matchup_id
 * @desc   Get matchup by id
 * @access Public
 */
router.get('/:matchup_id', async (req, res) => {
  try {
    // Get matchup from database
    const matchupArr = await Matchup.find({
      matchup_id: req.params.matchup_id,
    });

    // Handle no matchup found
    if (!matchupArr || matchupArr.length !== 2) {
      return res.status(400).json({ msg: 'Matchup not found.' });
    }

    // Success
    const [teamOneStats, teamTwoStats] = matchupArr;
    const matchup = { teamOneStats, teamTwoStats };
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

    // Create matchup objects
    const m1 = new Matchup(teamOneStats);
    const m2 = new Matchup(teamTwoStats);

    // Set matchup ID
    const lastMatchup = await Matchup.findOne({}, 'matchup_id').sort(
      '-matchup_id'
    ); // get highest existing matchup_id
    let curID = 0;
    if (lastMatchup) {
      curID = lastMatchup.matchup_id + 1; // curID = highest existing matchup_id + 1
    }
    m1.matchup_id = curID;
    m2.matchup_id = curID;

    // Save matchup objects in DB
    await m1.save();
    await m2.save();

    // Success
    return res
      .status(200)
      .json({ msg: 'Successfully entered matchup in database.' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Internal Server Error.' });
  }
});

module.exports = router;
