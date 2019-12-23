import jwt from 'jsonwebtoken';
import config from 'config';

class ResponseHelper {
  constructor(res) {
    this.res = res;
  }

  /** ****************************************************
   * Common Errors
   *******************************************************
   */

  // 400 Error while using request body attributes
  invalidCredentials = () => {
    return this.res
      .status(400)
      .json({ errors: [{ msg: 'Invalid credentials.' }] });
  };

  // 401 Invalid token
  invalidToken = () => {
    return this.res
      .status(401)
      .json({ msg: 'Token is not valid. Authorization denied.' });
  };

  // 500 Internal server error
  internalError = () => {
    return this.res.status(500).send('Internal server error.');
  };

  // 400 Validation errors in body of request
  validationError = errors => {
    return this.res.status(400).json({ errors: errors.array() }); // Bad request
  };

  /** ****************************************************
   * Common Responses
   *******************************************************
   */

  // Return JWT after validation
  returnJWT = id => {
    const payload = {
      user: {
        id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        return this.res.json({ token });
      }
    );
  };
}

export default ResponseHelper;
