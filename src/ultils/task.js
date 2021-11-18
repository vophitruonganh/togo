const {hIncrBy, hGet, hExists, hSet, setExpire} = require('../providers/redis.js');
const {TASK_RATE_LIMIT} = require('../commons/constants.js');
const {Task} = require('../providers/postgres');
const {Op} = require("sequelize");
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
		await setExpire(key, TASK_RATE_LIMIT.EXPIRED_TIME);
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
	if (!userId) throw new Error(`Invalid user info`);

	const isLimitTask = await checkLimitQuota(userId);
	if (isLimitTask) throw new Error('Limit quota add task today');

	await Task.create({content: taskInfo, userId: userId, createdDate: new Date()});

	await incrQuotaAddTaskToday(userId);
	return taskInfo;
};

/**
 *
 * @return {Promise<*[]>}
 */
const getTask = async (conditions, page = 1, limit = 50) => {
	const start = (page - 1) * limit;
	const end = start + limit;
	return Task.findAll({where: {createdAt: {[Op.gt]: conditions.createdDate}}, limit: limit, offset: page - 1});
};

module.exports = {
	checkLimitQuota: checkLimitQuota,
	addTask: addTask,
	getTask: getTask,
};