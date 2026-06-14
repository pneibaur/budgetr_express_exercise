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

// transactions list route. the home route
app.get("/transactions", (request, response)=>{
    response.render("index.ejs", {transactions: transactions})
})

// route to push new transaction to list
app.post("/transactions", (request, response)=>{
    let newArray = request.body.tags.split(", ")
    request.body.tags = newArray
    transactions.push(request.body)
    response.redirect("/transactions")
})

// route to display the form for a new transaction
app.get("/transactions/new", (request, response)=>{
    response.render("new.ejs")
})

// show a specific transaction
app.get("/transactions/:index", (request, response)=>{
    response.render("show.ejs", {
        transaction: transactions[request.params.index],
        index: request.params.index
    })
})

// route to delete the specified transaction
app.delete("/transactions/:index", (request, response)=>{
    transactions.splice(request.params.index, 1)
    response.redirect("/transactions")
})

// route to push the edited transaction to the list. 
app.put("/transactions/:index", (request, response)=>{
    let newArray = request.body.tags.split(", ")
    request.body.tags = newArray
    transactions[request.params.index] = request.body
    response.redirect("/transactions/"+ request.params.index)
})

// route to the edit form. 
app.get("/transactions/:index/edit", (request, response)=>{
    response.render("edit.ejs", {
        transaction: transactions[request.params.index], 
        index: request.params.index
    })
})

// set up the server and listen
app.listen(port, ()=>{console.log("listening on port " + port)})