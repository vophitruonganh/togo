const jwt = require('jsonwebtoken');
const {JSON_WEB_TOKEN} = require("../commons/constants.js");
/**
 *
 * @param payload
 * @returns {string}
 */
const createJWTToken = (payload) => {
	const nowToSecond = new Date().getTime() / 1000;
	return jwt.sign({ext: nowToSecond + JSON_WEB_TOKEN.TTL, data: payload}, JSON_WEB_TOKEN.SECRET_KEY);
};

/**
 *
 * @param token
 * @returns boolean
 */
const verifyJWTToken = (token) => {
	return !token ? false : jwt.verify(token, JSON_WEB_TOKEN.SECRET_KEY);
};

/**
 *
 * @param loginInfo
 * @return Promise<boolean>
 */
const login = async (loginInfo) => {
	// TODO: check login info with database, return true/false
	return true;
};

module.exports = {
	createJWTToken: createJWTToken,
	verifyJWTToken: verifyJWTToken,
	login: login
};