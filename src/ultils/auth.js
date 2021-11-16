const jwt = require('jsonwebtoken');
const {JSON_WEB_TOKEN} = require("../commons/constants.js");

const createJWTToken = (payload) => {
	return jwt.sign(payload, JSON_WEB_TOKEN.SECRET_KEY, JSON_WEB_TOKEN.ALGORITHM);
};

const verifyJWTToken = (token) => {
	return jwt.verify(token, JSON_WEB_TOKEN.SECRET_KEY);
};

module.exports = {
	createJWTToken: createJWTToken,
	verifyJWTToken: verifyJWTToken
};