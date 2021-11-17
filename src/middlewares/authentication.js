const authUtils = require('../ultils/auth.js');
const {decrypt} = require('../commons/crypto.js');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	try {
		req.userInfo = authUtils.verifyJWTToken(token);
	} catch (error) {
		console.log(error);
		return res.status(401).send({message: 'Invalid token'});
	}

	next();
};