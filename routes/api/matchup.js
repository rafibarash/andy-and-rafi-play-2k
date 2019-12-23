import express from 'express';

const router = express.Router();

/**
 * @route  GET /api/teams
 * @desc   TEST route
 * @access Public
 */
router.get('/', (req, res) => res.send('Get matchup route'));

/**
 * @route  GET /api/teams
 * @desc   TEST route
 * @access Public
 */
router.post('/', (req, res) => res.send('Send matchup route'));

export default router;
