const context = require('../commons/context.js');

const Router = require('express').Router();
const taskUtils = require('../ultils/task.js');
const {HTTP_STATUS_CODE} = require("../commons/constants.js");
const authorization = require('../middlewares/auththorize.js');

Router.post('/task/add', authorization, async (req, res) => {
	const taskInfo = context.getBody(req);
	const userId = context.getUserId(req);

	const isLimitTask = await taskUtils.checkLimitQuota(userId);

	if (isLimitTask)
		return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({message: 'Limit quota add task today'});

	await taskUtils.addTask(userId, taskInfo);

	res.send({message: 'Add task success', taskInfo});
});

module.exports = Router;