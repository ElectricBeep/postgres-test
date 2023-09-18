const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const constants = require("../../utils/constants");

module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define("User", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: true,
			validate: {
				notEmpty: true,
			}
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
				isEmail: true,
			}
		},
		password: {
			type: Sequelize.STRING,
			allowNull: true,
			validate: {
				notEmpty: true,
			}
		},
		role: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: constants.ROLE_USER,
			validate: {
				isIn: [constants.ROLES]
			}
		},
	}, {
		tableName: "users",
		paranoid: true,
		defaultScope: {
			attributes: { exclude: ["password"] },
		},
		scopes: {
			withPassword: {
				attributes: {},
			}
		},
		hooks: {
			beforeCreate: async (user) => {
				if (user.password) {
					const salt = await bcrypt.genSalt(10, "a");
					user.password = await bcrypt.hash(user.password, salt);
				}
			},
			beforeUpdate: async (user) => {
				if (user.password) {
					const salt = await bcrypt.genSalt(10, "a");
					user.password = await bcrypt.hash(user.password, salt);
				}
			}
		},
	});
	User.prototype.validPassword = async (password, hash) => {
		return await bcrypt.compare(password, hash);
	}
	return User;
};