const {Router} = require('express')
const { createUser, updateUser } = require('../controllers/users.controller')
const authenticate = require('../middlewares/auth.middleware')
const { createUserValidator } = require('../validators/user.validators')
const router = Router()

router.post('/api/v1/user', createUserValidator, createUser)

router.put('/api/v1/user', authenticate, updateUser)

module.exports = router