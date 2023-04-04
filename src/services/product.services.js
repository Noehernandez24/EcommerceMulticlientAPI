const { Op } = require("sequelize");
const Products = require("../models/products.model");
const Users = require("../models/users.model");

class ProductServices{
    static async getAll(){
        try {
            const result = await Products.findAll({
                where: {
                    availableQty:{
                        [Op.gt]: 0
                    }
                },
                include: {
                    model: Users,
                    attributes:['id','username'],
                    as: 'seller'
                }
            })
            return result
        } catch (error) {
            throw error
        }

    }

    static async create(newProduct){
        try {
            const result = await Products.create(newProduct)
            return result
        } catch (error) {
            throw error
        }
    }

    static async update(id, productData){
        try {
            const result = await Products.update(productData, {
                where: {id}
            })
            return result
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductServices