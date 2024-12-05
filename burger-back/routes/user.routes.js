const express = require("express")
const app = express()

const controller = require("../controllers/user.controller")
const isAuth = require("../middleware/isAuth.middleware")

app.post("/", controller.register)
app.post("/login", controller.login)
app.put("/", isAuth ,controller.update)
app.delete("/", isAuth ,controller.delete)


module.exports = app