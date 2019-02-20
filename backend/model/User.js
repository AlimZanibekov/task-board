const db = require('../db');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const User = db.define('user', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.DataTypes.STRING(100),
        unique: true
    },
    password: Sequelize.DataTypes.STRING(100),
    oauthId: {
        type: Sequelize.DataTypes.STRING(100),
        unique: true
    },
}, {
    freezeTableName: true,
    hooks: {
        beforeCreate: (user) => {
            return bcrypt.hash(user.password, 10)
                .then(hash => {
                    user.password = hash;
                })
                .catch(err => {
                    throw new Error();
                });
        }
    },
    instanceMethods: {
        validPassword: function(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});

User.prototype.validPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = { User };