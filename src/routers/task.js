const context = require('../commons/context.js');
const Router = require('express').Router();
const taskUtils = require('../ultils/task.js');
const authentication = require('../middlewares/authentication.js');

Router.get('/tasks', authentication, async (req, res) => {
	const createdDate = context.getQuery(req, 'created_date');
	const page = context.getQuery(req, 'page');
	const limit = context.getQuery(req, 'limit');

	try {
		const conditions = {createdDate: new Date(createdDate)};
		const tasks = await taskUtils.getTask(conditions, page, limit);
		return res.send({data: tasks});

	} catch (error) {
		return res.status(400).send({message: error.message});
	}
});

Router.post('/tasks', authentication, async (req, res) => {
	const taskInfo = context.getBody(req);
	const userId = context.getUserId(req);

	try {
		await taskUtils.addTask(userId, taskInfo);
		return res.send({data: taskInfo});
	} catch (error) {
		return res.status(400).send({message: error.message});
	}
});

module.exports = Router;