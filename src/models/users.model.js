const {DataTypes} = require('sequelize')
const db = require('../utils/database')
const bcrypt = require('bcrypt')

const Users = db.define('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar:{
        type: DataTypes.STRING,
    },
    role:{
        type: DataTypes.ENUM,
        values: ['admin', 'client', 'seller'],
        defaultValue: 'client',
        allowNull: false    
    }
}, {
    hooks:{
        beforeCreate: async (user) => {
            try {
                const salt = await bcrypt.genSalt(10)
                const passwordHash = await bcrypt.hash(user.password, salt)
                user.password = passwordHash
            } catch (error) {
                throw error
            }
        }
    }
})

module.exports = Users