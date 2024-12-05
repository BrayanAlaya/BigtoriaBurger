const express = require("express")
const app = express()

const controller = require("../controllers/cart.controller")
const isAuth = require("../middleware/isAuth.middleware")

app.post("/", isAuth ,controller.create)
app.get("/", isAuth ,controller.get)
app.delete("/", isAuth ,controller.delete)

module.exports = app