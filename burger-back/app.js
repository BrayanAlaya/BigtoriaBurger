const express = require("express")
const body_parser = require("body-parser")
const cors = require("cors")


const app = express()

app.use(express.urlencoded({extended: "50mb",extended: true}))
app.use(express.json({limit: "50mb"}))

app.use(cors())


const routes = require("./routes/index")
app.use("/api", routes)

module.exports = app