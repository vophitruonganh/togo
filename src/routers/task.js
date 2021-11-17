const context = require('../commons/context.js');

const Router = require('express').Router();
const taskUtils = require('../ultils/task.js');
const {HTTP_STATUS_CODE} = require("../commons/constants.js");
const authentication = require('../middlewares/authentication.js');

Router.post('/task/add', authentication, async (req, res) => {
	const taskInfo = context.getBody(req);
	const userId = context.getUserId(req);

	try {
		await taskUtils.addTask(userId, taskInfo);
		return res.send({message: 'Add task success', taskInfo});
	} catch (error) {
		return res.status(400).send({message: error.message});
	}
});

module.exports = Router;