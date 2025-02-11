const context = require('../commons/context.js');
const {validateParamAuth} = require('../ultils/auth.js');

const Router = require('express').Router();
const authUtils = require('../ultils/auth.js');
const {HTTP_STATUS_CODE} = require("../commons/constants.js");

Router.get('/login', async (req, res) => {
	try {
		const loginInfo = {
			userId: context.getQuery(req, 'user_id'),
			password: context.getQuery(req, 'password'),
		};

		validateParamAuth(loginInfo);

		const [isLogin, userInfo] = await authUtils.login(loginInfo);

		if (isLogin) return res.send({data: authUtils.signJWTToken(userInfo)});

		return res.status(HTTP_STATUS_CODE.UNAUTHORIZATION).send({message: `LOGIN FAILED`});
	} catch (error) {
		return res.status(400).send({error: {message: error.message}});
	}
});

Router.post('/register', async (req, res) => {
	try {
		const registerInfo = {
			userId: context.getBody(req, 'user_id'),
			password: context.getBody(req, 'password'),
		};

		validateParamAuth(registerInfo);

		const isExistedAccount = await authUtils.checkExistsAccount(registerInfo);
		if (isExistedAccount) return res.status(401).send({message: 'Account invalid'});

		const [isLogin, userInfo] = await authUtils.register(registerInfo);
		if (isLogin) return res.send({data: authUtils.signJWTToken(userInfo)});

		return res.status(HTTP_STATUS_CODE.UNAUTHORIZATION).send({message: `LOGIN FAILED`});
	} catch (error) {
		return res.status(400).send({error: {message: error.message}});
	}
});

module.exports = Router;