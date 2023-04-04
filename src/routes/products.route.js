const {Router} = require('express')
const { createProduct, getAllProducts, editProductDescription} = require('../controllers/products.controller')
const authenticate = require('../middlewares/auth.middleware')
const createProductValidator = require('../validators/products.validator')
const router = Router()

router.get('/api/v1/product', getAllProducts)
router.post('/api/v1/product', authenticate, createProductValidator, createProduct)
router.put('/api/v1/product/:id', authenticate, editProductDescription)


module.exports = router