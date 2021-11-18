const {POSTGRES: Index} = require('../../commons/constants.js');
const {Sequelize, Model, DataTypes, Deferrable} = require("sequelize");
const connectionString = `postgres://${Index.USERNAME}:${Index.PASSWORD}@${Index.HOST}:${Index.PORT}/${Index.DATABASE_NAME}`;
const sequelize = new Sequelize(connectionString);

const User = sequelize.define("tasks", {
	username: {
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
	username: {type: DataTypes.STRING, unique: true},
	// Other model options go here
	sequelize, // We need to pass the connection instance
	modelName: 'Users', // We need to choose the model name
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
	// Other model options go here
	sequelize, // We need to pass the connection instance
	modelName: 'Tasks', // We need to choose the model name
	user_id: {
		type: DataTypes.STRING,
		references: {
			// This is a reference to another model
			model: User,
			// This is the column name of the referenced model
			key: 'id',
			deferrable: Deferrable.INITIALLY_IMMEDIATE
		}
	},
	underscored: true
});

// (async () => {
// 	await sequelize.authenticate();
//
// 	await sequelize.sync({ force: true });
// })();
module.exports = {
	Task: Task,
	User: User,
};