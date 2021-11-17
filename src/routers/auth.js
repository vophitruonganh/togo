const context = require('../commons/context.js');

const Router = require('express').Router();
const authUtils = require('../ultils/auth.js');
const {HTTP_STATUS_CODE} = require("../commons/constants.js");


Router.post('/login', async (req, res) => {
	const loginInfo = {
		username: context.getBody(req, 'username'),
		password: context.getBody(req, 'password'),
	};

	const userInfo = await authUtils.login(loginInfo);

	if (userInfo)
		return res.send({data: authUtils.signJWTToken(userInfo)});

	return res.status(HTTP_STATUS_CODE.UNAUTHORIZATION).send(`LOGIN FAILED`);
});

module.exports = Router;