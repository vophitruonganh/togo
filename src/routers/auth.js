const context = require('../commons/context.js');

const Router = require('express').Router();
const authUtils = require('../ultils/auth.js');
const {JSON_WEB_TOKEN, HTTP_STATUS_CODE} = require("../commons/constants.js");


Router.post('/login', async (req, res) => {
	const loginInfo = {
		username: context.getBody(req, 'username'),
		password: context.getBody(req, 'password'),
	};

	const isLogin = await authUtils.login(loginInfo);

	if (isLogin)
		return res.send({token: authUtils.createJWTToken(loginInfo), ttl: JSON_WEB_TOKEN.TTL});

	return res.status(HTTP_STATUS_CODE.UNAUTHORIZATION).send(`LOGIN FAILED`);
});

module.exports = Router;