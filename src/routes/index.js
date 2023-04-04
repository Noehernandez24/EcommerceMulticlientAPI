const userRoutes = require('./users.route')
const productRoutes = require('./products.route')
const cartRoutes = require('./carts.route')
const ordersRoutes = require('./orders.route')
const authRoutes = require('./auth.route')

const ApiRoutes = (app) => {
    app.use(userRoutes)
    app.use(productRoutes)
    app.use(cartRoutes)
    app.use(ordersRoutes)
    app.use(authRoutes)
}

module.exports = ApiRoutes