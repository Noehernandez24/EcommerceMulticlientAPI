const {check} = require('express-validator')
const validateResult = require('../utils/validate')

const addProductValidator = [
    check('productId', 'Error with productId field')
        .exists()
        .withMessage('The productId must exist')
        .notEmpty()
        .withMessage('The productId must not be empty')
        .isInt()
        .withMessage('The productId has the wrong format'),
    check('quantity', 'Error with quantity field')
        .exists()
        .withMessage('The quantity must exist')
        .notEmpty()
        .withMessage('The quantity must not be empty')
        .isInt()
        .withMessage('The quantity has the wrong format'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    addProductValidator
}