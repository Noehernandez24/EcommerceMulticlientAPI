const Carts = require("../models/carts.model")
const Orders = require("../models/orders.model")
const Products = require("../models/products.model")
const ProductsInOrder = require("../models/productsInOrder")
const ProductInCartServices = require("../services/carts.services")
const OrdersServices = require("../services/orders.services")
const { htmlPurchased } = require("../utils/htmlTemplate")
const transporter = require("../utils/mailer");

const getPurcharses = async (req, res, next) => {
  try {
    const {id} = req.user
    const purcharses = await OrdersServices.get(id)
    res.json(purcharses)
  } catch (error) {
    next(error)
  }
}

const makePurcharse = async (req, res, next) => {
  try {
    const {id: userId, email} = req.user
    const cart = await ProductInCartServices.getCart(userId)
    const products = JSON.stringify(cart.dataValues.products)

    if (JSON.parse(products).length === 0) {
      return next({
        status: 400,
          message: `There are no products in the cart`,
          name: 'The quantity of products must be greater than 0'
      })
    }

    // crear orden
    const { totalPrice, id } = cart.dataValues
    const order = await Orders.create({ totalPrice, userId})

    // crear productInOrder
    // ** orderId, productId, quantity, price
    for (const product of JSON.parse(products)) {
      const { id, price, name } = product
      const quantity = product.quantity.quantity
      const PRODUCT_MODEL = await Products.findByPk(id)

      // si no hay stock enviar error
      if (PRODUCT_MODEL.availableQty <= 0) {
        return next({
          status: 400,
          message: `'${name}' are out of stock`,
          name: 'Invalid quantity'
        })
      }

      await ProductsInOrder.create({
        orderId: order.id,
        productId: id,
        quantity,
        price,
        status: true,
      })
      // decrementar el stock del producto comprado
      await Products.increment({ availableQty: -quantity }, { where: { id } })
      await Orders.update({status: true},{where: {id: order.id}})
    }

    // vaciar carrito
    await ProductInCartServices.emptyCart(id)
    await Carts.decrement({ totalPrice }, { where: { id } })

    res.status(201).json({
      message: "Orden creada satisfactoriamente",
    })

    // enviar email

    await transporter.sendMail({
      from: process.env.G_USERNAME,
      to: email,
      subject: 'Compra realizada exitosamente!',
      html: htmlPurchased()
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  makePurcharse,
  getPurcharses,
}
