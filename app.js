const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
})

const Contact = mongoose.model('Contact', contactSchema);

const app = express();
const port = 80;

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded()) //brings data from website to express

// pug specific stuff
app.set("view engine", "pug"); //set template engine as pug
app.set("views", path.join(__dirname, "views")) //set the views directory

//ENDPOINTS
app.get("/", (req, res) => {
    const params = {}
    res.status(200).render("home.pug", params) //our pug demo endpoint
})

app.get("/contact", (req, res) => {
    const params = {}
    res.status(200).render("contact.pug", params) //our pug demo endpoint
})

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send("This item is saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved")
    })
    // res.status(200).render("contact.pug", params) //our pug demo endpoint
})

//START THE SERVER
app.listen(port, () => {
    console.log(`This app started successfuly on port ${port}`)
})
