const authUtils = require('../ultils/auth.js');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	const isValid = authUtils.verifyJWTToken(token);

	if (!isValid) return res.status(401).send({message: 'Invalid token'})

	next();
}