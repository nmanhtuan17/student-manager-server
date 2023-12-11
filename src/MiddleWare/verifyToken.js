
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Token is missing' });
  }

  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.log(decoded)
    req.user = decoded; // Attach the decoded user information to the request object
    next();
  });
};

module.exports = verifyToken;