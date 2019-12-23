import express from 'express';

const router = express.Router();

/**
 * @route  GET /api/teams
 * @desc   TEST route
 * @access Public
 */
router.get('/', (req, res) => res.send('Teams route'));

export default router;
