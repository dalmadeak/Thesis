const jsonwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jsonwt.verify(token, "ikhokSecretPass_forTokenIdentification");
    req.authData = {
      identifier: decoded.identifier,
      fullName: decoded.fullName,
      email: decoded.email,
      position: decoded.position,
      permissions: decoded.permissions,
      userId: decoded.userId
    }
    next();
  } catch(error) {
    res.status(401).json( {
      message: 'Authentication failed!'
    })
  }

}
