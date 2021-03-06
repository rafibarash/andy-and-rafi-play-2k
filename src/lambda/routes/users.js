import express from 'express';
import { check, validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';

import ResponseHelper from '../../utils/responseHelper';
import User from '../../models/User';

const router = express.Router();

/**
 * @route  POST /api/user
 * @desc   Register user
 * @access Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with six or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const resHelper = new ResponseHelper(res);
    // Error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resHelper.validationError();
    }
    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        // user already exists
        return resHelper.invalidCredentials();
      }

      // Get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // no naked people
        d: 'mm', // default image if gravatar not found
      });

      // Create user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10); // generate a salt for hashing

      // Encrypt user's password
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return json web token
      return resHelper.returnJWT(user.id);
    } catch (err) {
      console.error(err.message);
      return resHelper.internalError();
    }
  }
);

export default router;
