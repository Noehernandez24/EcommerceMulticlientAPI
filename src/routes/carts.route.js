const {Router} = require('express')
const { addProductToCart, getUserCart, deleteProductCart } = require('../controllers/carts.controller')
const authenticate = require('../middlewares/auth.middleware')
const { addProductValidator } = require('../validators/carts.validators')
const router = Router()

router.get('/api/v1/product/cart/user', authenticate, getUserCart)
router.post('/api/v1/product/addcart', authenticate, addProductValidator, addProductToCart)
router.delete('/api/v1/cart/product/:id', authenticate, deleteProductCart)

module.exports = router