const {DataTypes} = require('sequelize')
const db = require('../utils/database')

const Carts = db.define('carts', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    totalPrice:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
        field: 'total_price'
    }
})

module.exports = Carts