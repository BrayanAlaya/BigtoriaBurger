const express = require("express")
const app = express()

const isAuth = require("../middleware/isAuth.middleware")
const controller = require("../controllers/products.controller")

const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/", isAuth, upload.single('image'), controller.create)
app.get("/", controller.get)
app.put("/", isAuth, upload.single('image'), controller.update)
app.delete("/", isAuth, controller.delete)

module.exports = app