const jsonwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jsonwt.verify(token, 'ikhokSecretPass_forTokenIdentification');
    next();
  } catch(error) {
    res.status(401).json( {
      message: 'Authentication failed!'
    })
  }

}
