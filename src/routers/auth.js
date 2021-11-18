const context = require('../commons/context.js');

const Router = require('express').Router();
const authUtils = require('../ultils/auth.js');
const {HTTP_STATUS_CODE} = require("../commons/constants.js");

Router.get('/login', async (req, res) => {
	const loginInfo = {
		userId: context.getQuery(req, 'user_id'),
		password: context.getQuery(req, 'password'),
	};

	const [isLogin, userInfo] = await authUtils.login(loginInfo);

	if (isLogin) return res.send({data: authUtils.signJWTToken(userInfo)});

	return res.status(HTTP_STATUS_CODE.UNAUTHORIZATION).send({message: `LOGIN FAILED`});
});

module.exports = Router;