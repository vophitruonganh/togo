const {REDIS} = require('../commons/constants.js');

const redis = require('redis');
const {promisify} = require("util");
const client = new redis.createClient({port: REDIS.PORT, host: REDIS.HOST});

/**
 *
 * @param key
 * @param data
 * @param opts
 * @return {Promise<unknown>}
 */
const set = (key, data, opts) => {
	const ttl = opts?.ttl || -1;

	return new Promise((resolve, reject) => {
		client.set(key, JSON.stringify(data), "EX", ttl, (error, response) => {
			if (error) return reject(error);
			return resolve(response);
		});
	});
};

/**
 *
 * @param key
 * @return {Promise<unknown>}
 */
const get = (key) => {
	return new Promise((resolve, reject) => {
		client.get(key, (error, reply) => {
			if (error) return reject(`Cannot get cache key`);
			try {
				return resolve(JSON.parse(reply));
			} catch (error) {
				return null;
			}
		});
	});
};

const hGet = (...opts) => {
	const cmdAsync = promisify(client['HGET']).bind(client);
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

const hSet = (...opts) => {
	const cmdAsync = promisify(client['HSET']).bind(client);
	return cmdAsync.apply(null, opts);
};

const setExpire = (...opts) => {
	const cmdAsync = promisify(client['EXPIRE']).bind(client);
	return cmdAsync.apply(null, opts);
};

module.exports = {
	set: set,
	get: get,
	hIncrBy: hIncrBy,
	hExists: hExists,
	hGet: hGet,
	hSet: hSet,
	setExpire: setExpire
};