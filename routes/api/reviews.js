import express from 'express';

const router = express.Router();

/**
 * @route  GET /api/reviews
 * @desc   TEST route
 * @access Public
 */
router.get('/', (req, res) => res.send('Reviews route'));

export default router;
