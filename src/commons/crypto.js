const {CRYPTO_SEED, CIPHER_IV, SALT_HASH_PASSWORD} = require('./constants.js');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const bcrypt = require('bcrypt');

const key = Buffer.from(CRYPTO_SEED, 'hex');

// Format cipher iv is hex string that used for encrypt and decrypt message, total bytes should be 16
const iv = Buffer.from(CIPHER_IV, 'hex');
const sha256 = 'sha256';
const utf8 = 'utf8';
const hex = 'hex';

/**
 *
 * @param normalText
 * @return {string}
 */
const encrypt = (normalText) => {
	const decodeKey = crypto.createHash(sha256).update(key).digest();
	const cipher = crypto.createCipheriv(algorithm, decodeKey, iv);
	return cipher.update(normalText, utf8, hex) + cipher.final(hex);
};

/**
 *
 * @param encryptedData
 * @return {string}
 */
const decrypt = (encryptedData) => {
	const encodeKey = crypto.createHash(sha256).update(key).digest();
	const cipher = crypto.createDecipheriv(algorithm, encodeKey, iv);
	return cipher.update(encryptedData, hex, utf8) + cipher.final(utf8);
};

/**
 *
 * @param password
 * @return {Promise<unknown>}
 */
const cryptPassword = (password) => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, SALT_HASH_PASSWORD, (error2, hash) => {
			if (error2) return reject(error2);
			return resolve(hash);
		});
	});
};

const comparePassword = function (plainPass, callback) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(plainPass, SALT_HASH_PASSWORD, function (err, isPasswordMatch) {
			if (err) return reject(err);
			return resolve(isPasswordMatch);
		});
	});
};

module.exports = {
	encrypt: encrypt,
	decrypt: decrypt,
	cryptPassword: cryptPassword,
	comparePassword: comparePassword
};

