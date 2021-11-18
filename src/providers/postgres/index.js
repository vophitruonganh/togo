const {POSTGRES} = require('../../commons/constants.js');
const {Sequelize, DataTypes, Deferrable} = require("sequelize");
const connectionString = `postgres://${POSTGRES.USERNAME}:${POSTGRES.PASSWORD}@${POSTGRES.HOST}:${POSTGRES.PORT}/${POSTGRES.DATABASE_NAME}`;
const sequelize = new Sequelize(connectionString);

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
	userId: {type: DataTypes.STRING, unique: true},
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
	user_id: {
		type: DataTypes.STRING,
		references: {
			model: User,
			key: 'id',
			deferrable: Deferrable.INITIALLY_IMMEDIATE
		}
	},
	underscored: true
});

/*(async () => {
	await sequelize.authenticate();

	await sequelize.sync({ force: true });
})();*/
module.exports = {
	Task: Task,
	User: User,
};