const {POSTGRES} = require('../../commons/constants.js');
const {Sequelize, DataTypes, Deferrable} = require("sequelize");
const connectionString = `postgres://${POSTGRES.USERNAME}:${POSTGRES.PASSWORD}@${POSTGRES.HOST}:${POSTGRES.PORT}/${POSTGRES.DATABASE_NAME}`;
const sequelize = new Sequelize(connectionString, {
	logging: false
});


const syncSchema = async () => {
	await sequelize.authenticate();
	await sequelize.sync({alter: true, force: false});
};

const User = sequelize.define("users", {
	userId: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	createdDate: {
		type: DataTypes.DATE,
		allowNull: false
	}
}, {
	id: {type: DataTypes.STRING, primaryKey: true},
	indexes: [
		{unique: true, fields: ['user_id']},
	],
	sequelize,
	modelName: 'Users',
	underscored: true
});

const Task = sequelize.define("tasks", {
	content: {
		type: DataTypes.JSON,
		allowNull: false
	},
	userId: {
		type: DataTypes.STRING,
		allowNull: false
	},
	createdDate: {
		type: DataTypes.DATE,
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'Tasks',
	underscored: true
});

(async () => {
	await syncSchema();
});
module.exports = {
	Task: Task,
	User: User
};
