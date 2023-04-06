const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const db = require('./utils/database')
const swaggerui = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')
const initModels = require('./models/initModels')
const ApiRoutes = require('./routes')
const errorHandlerRouter = require("./routes/errorHandler.route");
const cors = require('cors')
const morgan = require('morgan')
initModels()

app.use('/docs', swaggerui.serve, swaggerui.setup(swaggerDoc))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
ApiRoutes(app)
errorHandlerRouter(app)



db.authenticate()
.then(() => console.log('Base de datos conectada correctamente'))
.catch(error => console.log(error))

db.sync({force: false})
.then(() => console.log('Base de datos sincronizada'))
.catch(error => console.log(error))

app.get('/', async(req, res) => {
    res.send('Todo OK')
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})