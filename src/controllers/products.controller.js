const ProductServices = require("../services/product.services")

const getAllProducts = async(req, res, next) => {
    try {
        const products = await ProductServices.getAll()
        res.json(products) 
    } catch (error) {
        next(error)
    }
}

const createProduct = async(req, res, next) => {
    try {
        const {id} = req.user
        const newProduct = req.body
        newProduct.userId = id
        const product = await ProductServices.create(newProduct)
        res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}

const editProductDescription = async(req, res, next) => {
    try {
        const {id} = req.params
        const productData = req.body
        await ProductServices.update(id, productData)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}



module.exports = {
    createProduct,
    getAllProducts,
    editProductDescription
}