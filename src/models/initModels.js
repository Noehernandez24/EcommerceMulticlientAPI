const Carts = require("./carts.model")
const Orders = require("./orders.model")
const Products = require("./products.model")
const ProductsInCart = require("./productsInCart.model")
const ProductsInOrder = require("./productsInOrder")
const Users = require("./users.model")

const initModels = () => {

    Users.hasMany(Products, {foreignKey: 'userId'})
    Products.belongsTo(Users, {foreignKey: 'userId', as:'seller'})

    Users.hasMany(Orders, {foreignKey: 'userId'})
    Orders.belongsTo(Users, {foreignKey: 'userId'})

    Users.hasOne(Carts, {foreignKey: 'userId'})
    Carts.belongsTo(Users, {foreignKey: 'userId'})

    Products.belongsToMany(Carts, {through: ProductsInCart})
    Carts.belongsToMany(Products, {through: ProductsInCart})

    Products.belongsToMany(Orders, {through: ProductsInOrder})
    Orders.belongsToMany(Products, {through: ProductsInOrder})

}

module.exports = initModels