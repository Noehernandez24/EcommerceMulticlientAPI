const jwt = require('jsonwebtoken')
require("dotenv").config()

const authenticate = (req, res, next) => {
  try {
    const token = req.headers["access-token"]

    if (!token) {
      return next({
        status: 401,
        name: "Unauthorized",
        message: "Not token provider",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: "HS512"
    })

    req.user = decoded
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
