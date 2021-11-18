const authUtils = require('../ultils/auth.js');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	try {
		req.userInfo = authUtils.verifyJWTToken(token);
		if (!req.userInfo) throw new Error(`Token is invalid`);
	} catch (error) {
		console.error(`Validate token: `, error.message);
		return res.status(401).send({message: 'PERMISSION DENIED'});
	}

	next();
};