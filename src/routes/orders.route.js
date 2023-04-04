const {Router} = require('express')
const {makePurcharse, getPurcharses} = require('../controllers/orders.controller')
const authenticate = require('../middlewares/auth.middleware')
const router = Router()

router.get('/api/v1/purcharse', authenticate, getPurcharses)
router.post('/api/v1/purcharse', authenticate, makePurcharse)

module.exports = router