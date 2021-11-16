const {HEALTH_CHECK} = require("../commons/reponse.js");
const Router = require('express').Router();

Router.get('/', (req, res) => {
	res.send(HEALTH_CHECK)
})

module.exports = Router;