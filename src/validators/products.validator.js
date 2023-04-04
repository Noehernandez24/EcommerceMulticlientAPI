const {check} = require('express-validator')
const validateResult = require('../utils/validate')

const createProductValidator = [
    check('name', 'Error with name field')
        .exists()
        .withMessage('The name must exist')
        .notEmpty()
        .withMessage('The name must not be empty')
        .isString()
        .withMessage('The name has the wrong format')
        .isLength({min: 3, max: 100})
        .withMessage('The name must have between 6 and 100 characters'),
    check('description', 'Error with description field')
        .exists()
        .withMessage('The description must exist')
        .notEmpty()
        .withMessage('The description must not be empty')
        .isString()
        .withMessage('The description has the wrong format'),
    check('price', 'Error with price field')
        .exists()
        .withMessage('The price must exist')
        .notEmpty()
        .withMessage('The price must not be empty')
        .isFloat()
        .withMessage('The price has the wrong format'),
    check('availableQty', 'Error with availableQty field')
        .exists()
        .withMessage('The availableQty must exist')
        .notEmpty()
        .withMessage('The availableQty must not be empty')
        .isInt()
        .withMessage('The availableQty has the wrong format'),
    (req, res, next) => {
        validateResult(req, res, next)
    }

]

module.exports = createProductValidator