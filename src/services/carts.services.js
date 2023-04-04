const { Op } = require("sequelize");
const Carts = require("../models/carts.model");
const Products = require("../models/products.model");
const ProductsInCart = require("../models/productsInCart.model");

class ProductInCartServices {
  static async getCart(id) {
    try {
      const result = await Carts.findOne({
        where: {userId: id},
        attributes: ['id', 'totalPrice'],
        include: {
          model: Products,
          attributes: {exclude: ['userId', 'createdAt', 'updatedAt', 'productsInCart']},
          through: {
            as: 'quantity',
            attributes: ['quantity']
          }
        },
      });
      return result
    } catch (error) {
      throw error;
    }
  }

  static async emptyCart(id){
    try {
      const result = await ProductsInCart.destroy({
        where: {cartId: id}
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static async delete(productId, cartId){
    try {
      const result = await ProductsInCart.destroy({
        where: {
          [Op.and]: [{productId}, {cartId}]
        }
      })
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = ProductInCartServices