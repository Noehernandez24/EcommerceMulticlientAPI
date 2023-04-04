const { Op } = require("sequelize");
const Orders = require("../models/orders.model");
const Products = require("../models/products.model");

class OrdersServices{
    static async get(id){
        try {
            const result = await Orders.findAll({
                where: {
                    [Op.and] : [{userId: id}, {status: true}]
                },
                attributes: ['id', 'totalPrice', 'createdAt', 'status'],
                include: {
                    model: Products,
                    attributes: {exclude: ['availableQty', 'status', 'userId', 'updatedAt', 'createdAt']},
                    through: {
                        as: 'quantity',
                        attributes: ['quantity']
                    }
                }
            })
            return result
        } catch (error) {
            throw error
        }
    }
}

module.exports = OrdersServices