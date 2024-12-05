const express = require("express")
const app = express()

const userRoutes = require("./user.routes")
const productsRoutes = require("./products.routes")
const ordersRoutes = require("./orders.routes")
const cartRoutes = require("./cart.routes")

app.use("/user", userRoutes)
app.use("/products", productsRoutes)
app.use("/order", ordersRoutes)
app.use("/cart", cartRoutes)

module.exports = app