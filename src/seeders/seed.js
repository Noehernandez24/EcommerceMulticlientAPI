const db = require("../utils/database")
const initModels = require("../models/initModels")
const Users = require("../models/users.model")
const Products = require("../models/products.model")
const Carts = require("../models/carts.model")

initModels()

const users = [
  {
    username: "noe94",
    email: "evilld94@gmail.com",
    password: "noe1234",
    role: "admin",
  },
  {
    username: "samuel94",
    email: "samuel@gmail.com",
    password: "samuel1234",
    role: "seller",
  },
]

const products = [
  {
    name: "Zapatillas de running",
    description:
      "Estas zapatillas de running están diseñadas para los corredores más exigentes que buscan comodidad y rendimiento en cada carrera.",
    price: 120,
    availableQty: 8,
    userId: 1,
    productImg: "https://images.example.com/running-shoes.jpg",
  },

  {
    name: "Monitor de actividad física",
    description:
      "Este monitor de actividad física te permite hacer un seguimiento de tus entrenamientos, analizar tus estadísticas y mejorar tu rendimiento.",
    price: 150,
    availableQty: 3,
    userId: 2,
    productImg: "https://images.example.com/activity-monitor.jpg",
  },

  {
    name: "Raqueta de tenis",
    description:
      "Esta raqueta de tenis de alta gama está diseñada para los jugadores más exigentes que buscan potencia y precisión en cada golpe.",
    price: 300,
    availableQty: 2,
    userId: 1,
    productImg: "https://images.example.com/tennis-racket.jpg",
  },

  {
    name: "Equipo de snorkel",
    description:
      "Este equipo de snorkel te permite explorar los fondos marinos de forma cómoda y segura, con una máscara y aletas de alta calidad.",
    price: 80,
    availableQty: 10,
    userId: 2,
    productImg: "https://images.example.com/snorkeling-gear.jpg",
  },
]

db.sync({ force: true }).then(async () => {
  for (const user of users) {
    const newUsers = await Users.create(user)
    await Carts.create({ userId: newUsers.id })
  }

  await Products.bulkCreate(products)
})
