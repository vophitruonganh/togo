const {hIncrBy, hGet, hExists, hSet, setExpire} = require('../providers/redis.js');
const {TASK_RATE_LIMIT} = require('../commons/constants.js');

const generateKeyRateLimitTask = () => {
	const date = new Date().getDate();
	const month = new Date().getMonth();
	const year = new Date().getFullYear();

	const timestamp = new Date(`${year}/${month}/${date}:00:00:00.000Z`).getTime();

	return `rate_limit_task:${timestamp}`;
};

/**
 *
 * @param userId
 * @param taskInfo
 * @return Promise<boolean>
 */
const checkLimitQuota = async (userId) => {
	return 4 < await hGet(generateKeyRateLimitTask(), userId);
};

const incrQuotaAddTaskToday = async (userId) => {
	const key = generateKeyRateLimitTask();
	const isExisted = await hExists(key, userId);

	if (!isExisted) {
		await hSet(key, userId, TASK_RATE_LIMIT.INCREMENT);
		await setExpire(key, 86400);
	} else {
		return hIncrBy(key, userId, TASK_RATE_LIMIT.INCREMENT);
	}
};

/**
 *
 * @param userId
 * @param taskInfo
 */
const addTask = async (userId, taskInfo) => {
	// Validate params input
	if (!userId) throw new Error(`Invalid user info`);

	// Check limit quota add task today
	const isLimitTask = await checkLimitQuota(userId);
	if (isLimitTask) throw new Error('Limit quota add task today');

	// Add data to database
	// incrQuotaAddTaskToday
	await incrQuotaAddTaskToday(userId);
	return taskInfo;
};

module.exports = {
	checkLimitQuota: checkLimitQuota,
	addTask: addTask
};