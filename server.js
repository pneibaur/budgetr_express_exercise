const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
let transactions = require("./models/data.js")

// middleware to handle POST routes
app.use(express.urlencoded({extended: false}))
// middleware to handle the public folder and stylesheets
app.use(express.static('public'))

app.get("/transactions", (request, response)=>{
    response.render("index.ejs", {transactions: transactions})
})

app.post("/transactions", (request, response)=>{
    transactions.push(request.body)
    response.redirect("/transactions")
})

app.get("/transactions/new", (request, response)=>{
    response.render("new.ejs")
})

app.get("/transactions/:index", (request, response)=>{
    response.render("show.ejs", {transaction: transactions[request.params.index]})
})

app.listen(port, ()=>{console.log("listening on port " + port)})