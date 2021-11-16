/**
 *
 * @param userId
 * @param taskInfo
 * @return Promise<boolean>
 */
const checkLimitQuota = async (userId) => {
	// TODO: check limit quota task of user per day, return boolean
	return false;
};

/**
 *
 * @param userId
 * @param taskInfo
 */
const addTask = (userId, taskInfo) => {
	// Validate params input
	// Add data to database
	return
};

module.exports = {
	checkLimitQuota: checkLimitQuota,
	addTask: addTask
};