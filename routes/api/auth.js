import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import ResponseHelper from '../../utils/responseHelper';
import authMiddleware from '../../middleware/auth';
import User from '../../models/User';

const router = express.Router();

/**
 * @route  GET /api/auth
 * @desc   Get user
 * @access Public
 */
router.get('/', authMiddleware, async (req, res) => {
  const resHelper = new ResponseHelper(res);
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return resHelper.internalError();
  }
});

/**
 * @route  Post /api/auth
 * @desc   Login user
 * @access Public
 */
router.post(
  '/',
  [
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Please is required.').exists(),
  ],
  async (req, res) => {
    const resHelper = new ResponseHelper(res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resHelper.validationError(errors);
    }
    const { email, password } = req.body;
    try {
      // check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return resHelper.invalidCredentials();
      }

      // check if hashed password matches user's password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return resHelper.invalidCredentials();
      }

      // return JWT
      return resHelper.returnJWT(user.id);
    } catch (err) {
      console.error(err.message);
      return resHelper.internalError();
    }
  }
);

export default router;
