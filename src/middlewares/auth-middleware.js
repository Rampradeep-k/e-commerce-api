import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    const parts = (req.headers.authorization || '').split(' ').filter(Boolean);

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Unauthorized: Invalid token format' });
    }

    const token = parts[1];

    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
  }
};

export default verifyToken;