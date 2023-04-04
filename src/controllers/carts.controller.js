const { Op } = require("sequelize")
const Carts = require("../models/carts.model")
const Products = require("../models/products.model")
const ProductsInCart = require("../models/productsInCart.model")
const ProductInCartServices = require("../services/carts.services")

const addProductToCart = async(req, res, next) => {
    try {
        const { productId, quantity} = req.body
        const {cartId} = req.user
        const PRODUCT_MODEL = await Products.findByPk(productId)
        const price = PRODUCT_MODEL.price
        const totalPrice = price * quantity

        // verificar si el producto ya existe en el carrito
        const PRODUCT_CAR = await ProductsInCart.findOne({
            where:{
                [Op.and]: [{cartId}, {productId}]
            }
        })

        if(PRODUCT_CAR){
            await ProductsInCart.increment({quantity}, {
                where: {
                    [Op.and]: [{cartId}, {productId}]
                }
            })
            await Carts.increment({totalPrice: totalPrice}, {where: {id: cartId}})
        } else{
            await ProductsInCart.create({cartId, productId, quantity, price})
            await Carts.increment({totalPrice: totalPrice}, {where: {id: cartId}})
        }

        
        res.json({
            message: 'Producto agregado satisfactoriamente al carrito'
        })
    } catch (error) {
       next(error)
    }
}

const getUserCart = async(req,res,next) => {
   
    try {
        const {id} = req.user
        const productsInCart = await ProductInCartServices.getCart(id)
        res.json(productsInCart)
    } catch (error) {
       next(error)
    }
}

const deleteProductCart = async(req, res, next) => {
    try {
        const {cartId} = req.user
        const {id} = req.params
        const productInCart = await ProductsInCart.findOne({
            where: {
                [Op.and]: [{cartId}, {productId: id}]
            }
        })

        if (!productInCart) {
            return next({
                status: 404,
                message: `The product with the id '${id}' is not found in the cart`,
                name: 'Product not found'
            })
        }

        const totalPrice = productInCart ? productInCart.dataValues.price * productInCart.dataValues.quantity : null

        await ProductInCartServices.delete(id, cartId)
        await Carts.decrement({totalPrice}, {where: {id: cartId}})

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addProductToCart,
    getUserCart,
    deleteProductCart
}