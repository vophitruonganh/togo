require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const {APPLICATION_PORT} = require('./commons/constants.js');

const healthCheckRouter = require('./routers/health-check.js');
const authRouter = require('./routers/auth.js');
const taskRouter = require('./routers/task.js');

// Include middlewares
app.use(bodyParser.urlencoded({extended: true}));

// Include routers
app.use(healthCheckRouter);
app.use(authRouter);
app.use(taskRouter);

app.listen(APPLICATION_PORT, '0.0.0.0', () => {
	console.log(`Service started with port ${APPLICATION_PORT}`);
});
