import jwt from 'jsonwebtoken';
import config from 'config';

import ResponseHelper from '../utils/responseHelper';

// Protects auth route with JWT
const authMiddleware = (req, res, next) => {
  const resHelper = new ResponseHelper(res);
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return resHelper.invalidToken();
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')); // Decode token
    req.user = decoded.user;
    next();
  } catch (err) {
    return resHelper.invalidToken();
  }
};

export default authMiddleware;
