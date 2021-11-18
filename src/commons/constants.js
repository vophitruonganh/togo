const APPLICATION_PORT = parseInt(process.env.APPLICATION_PORT);
const CRYPTO_SEED = process.env.CRYPTO_SEED;
const CIPHER_IV = process.env.CIPHER_IV;

const JSON_WEB_TOKEN = {
	CRYPTO_SEED: CRYPTO_SEED,
	CIPHER_IV: CIPHER_IV,
	SECRET_KEY: process.env.JWT_SECRET_KEY,
	PATH_PRIVATE_KEY: process.env.JWT_PATH_PRIVATE_KEY,
	ALGORITHM: process.env.JWT_ALGORITHM,
	TTL: parseInt(process.env.JWT_TTL)
};

const HTTP_STATUS_CODE = {
	UNAUTHORIZATION: 401,
	BAD_REQUEST: 400
};

const REDIS = {
	HOST: process.env.HOST,
	PORT: process.env.PORT,
};

const POSTGRES = {
	HOST: process.env.POSTGRES_HOST,
	PORT: process.env.POSTGRES_PORT,
	USERNAME: process.env.POSTGRES_USERNAME,
	PASSWORD: process.env.POSTGRES_PASSWORD,
	DATABASE_NAME: process.env.DATABASE_NAME,
};

const TASK_RATE_LIMIT = {
	QUOTA: process.env.TASK_RATE_LIMIT_QUOTA,
	INCREMENT: process.env.TASK_RATE_LIMIT_INCREMENT,
	EXPIRED_TIME: process.env.TASK_RATE_EXPIRED_TIME || 86400,
};

module.exports = {
	APPLICATION_PORT: APPLICATION_PORT,
	CRYPTO_SEED: CRYPTO_SEED,
	CIPHER_IV: CIPHER_IV,
	JSON_WEB_TOKEN: JSON_WEB_TOKEN,
	HTTP_STATUS_CODE: HTTP_STATUS_CODE,
	REDIS: REDIS,
	TASK_RATE_LIMIT: TASK_RATE_LIMIT,
	POSTGRES: POSTGRES
};