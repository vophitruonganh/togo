const jwt = require('jsonwebtoken');
const {JSON_WEB_TOKEN} = require("../commons/constants.js");
const {encrypt, decrypt} = require("../commons/crypto.js");
const {User} = require('../providers/postgres');

/**
 *
 * @param payload
 * @returns {string}
 */
const signJWTToken = (payload) => {
	const data = encrypt(JSON.stringify(payload));
	return {
		token: jwt.sign({data: data}, JSON_WEB_TOKEN.SECRET_KEY, {expiresIn: JSON_WEB_TOKEN.TTL}),
		ttl: JSON_WEB_TOKEN.TTL
	};
};

/**
 *
 * @param token
 * @returns {*}
 */
const verifyJWTToken = (token) => {
	const data = jwt.verify(token, JSON_WEB_TOKEN.SECRET_KEY)?.data;

	const decodeData = decrypt(data);
	return decodeData ? JSON.parse(decodeData) : decodeData;
};


/**
 *
 * @param conditions
 * @return Promise<[]>
 */
const login = async (conditions) => {
	const data = await User.findOne({where: conditions});
	return [!!data, data];
};

module.exports = {
	signJWTToken: signJWTToken,
	verifyJWTToken: verifyJWTToken,
	login: login
};