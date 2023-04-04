const Users = require("../models/users.model")
const bcrypt = require('bcrypt')
const ProductInCartServices = require("../services/carts.services")
const AuthServices = require("../services/auth.services")

const userLogin = async(req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await Users.findOne({where: {email}})

        if (!user) {
            return next({
                status: 400,
                message: 'Invalid email',
                name: 'User not found'
            })
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return next({
                status: 400,
                message: "The password doesn't match with email user",
                name: 'Invalid password'
            })
        }

        const {id, username, role} = user
        const cart = await ProductInCartServices.getCart(id)
        const cartId = cart.dataValues.id

        const token = await AuthServices.genToken({id, username, role, email, cartId})
        
        res.json({
            id,
            username,
            role,
            email,
            cartId,
            token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    userLogin
}