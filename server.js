const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
let transactions = require("./models/data.js")

console.log(transactions)


app.listen(port, ()=>{console.log("listening on port " + port)})