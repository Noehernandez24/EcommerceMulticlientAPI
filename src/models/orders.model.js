const {DataTypes} = require('sequelize')
const db = require('../utils/database')

const Orders = db.define('orders', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    totalPrice:{
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'total_price'
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

module.exports = Orders