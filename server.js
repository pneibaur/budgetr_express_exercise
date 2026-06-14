const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
let transactions = require("./models/data.js")
// npm package for the delete route
const methodOverride = require("method-override")

// middleware to handle POST routes
app.use(express.urlencoded({extended: false}))
// middleware to handle the public folder and stylesheets
app.use(express.static('public'))
// middleware to handle the delte request
app.use(methodOverride("_method"))

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
    response.render("show.ejs", {
        transaction: transactions[request.params.index],
        index: request.params.index
    })
})

app.delete("/transactions/:index", (request, response)=>{
    transactions.splice(request.params.index, 1)
    response.redirect("/transactions")
})

app.put("/transactions/:index", (request, response)=>{
    let newArray = request.body.tags.split(", ")
    request.body.tags = newArray
    transactions[request.params.index] = request.body
    response.redirect("/transactions/"+ request.params.index)
})

app.get("/transactions/:index/edit", (request, response)=>{
    response.render("edit.ejs", {
        transaction: transactions[request.params.index], 
        index: request.params.index
    })
})

app.listen(port, ()=>{console.log("listening on port " + port)})