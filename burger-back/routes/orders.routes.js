const express = require("express")
const app = express()

const controller = require("../controllers/orders.controller")
const isAuth = require("../middleware/isAuth.middleware")

app.post("/", isAuth, controller.create)
app.get("/", isAuth, controller.get)
app.get("/sales", isAuth, controller.getSales)
app.get("/dash", controller.getDash)

module.exports = app