/**
 *
 * @param req
 * @param field
 * @returns {* | null}
 */
const getParam = (req, field) => {
	return req.params[field] || null;
};

/**
 *
 * @param req
 * @param field
 * @returns {* | null}
 */
const getQuery = (req, field) => {
	return req.query[field] || null;
};

/**
 *
 * @param req
 * @param field
 * @returns {* | null}
 */
const getBody = (req, field = null) => {
	return field ? req.body[field] : req.body;
};

/**
 *
 * @param req
 * @return {string}
 */
const getUserId = (req) => {
	return req?.userInfo?.userId;
};

module.exports = {
	getParam: getParam,
	getQuery: getQuery,
	getBody: getBody,
	getUserId: getUserId
};