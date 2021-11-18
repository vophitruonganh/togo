const {REDIS} = require('../commons/constants.js');

const redis = require('redis');
const {promisify} = require("util");
const client = new redis.createClient({port: REDIS.PORT, host: REDIS.HOST});


const hGet = (...opts) => {
	const cmdAsync = promisify(client['HGET']).bind(client);
	return cmdAsync.apply(null, opts);
};

const hSet = (...opts) => {
	const cmdAsync = promisify(client['HSET']).bind(client);
	return cmdAsync.apply(null, opts);
};

const hExists = (...opts) => {
	const cmdAsync = promisify(client['HEXISTS']).bind(client);
	return cmdAsync.apply(null, opts);
};

const hIncrBy = (...opts) => {
	const cmdAsync = promisify(client['HINCRBY']).bind(client);
	return cmdAsync.apply(null, opts);
};

const setExpire = (...opts) => {
	const cmdAsync = promisify(client['EXPIRE']).bind(client);
	return cmdAsync.apply(null, opts);
};

module.exports = {
	hIncrBy: hIncrBy,
	hExists: hExists,
	hGet: hGet,
	hSet: hSet,
	setExpire: setExpire
};