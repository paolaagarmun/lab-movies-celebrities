const express = require("express");
const router = express.Router();

const Celebrity = require('../models/Celebrity')

router.get("/", (req,res) => {
    Celebrity.find()
    .then(celebritiesInDB => {
        console.log(celebritiesInDB)
        res.render('celebrities/celebrities', {celebritiesInDB})
    })
    .catch(err => console.log(err))
})

router.get("/create", (req,res) => {
    res.render('celebrities/new-celebrity')
})

router.post("/create", (req,res) => {
    console.log(req.body)
    Celebrity.create(req.body)
    .then((newCelebrity) => {
        console.log("Celebrity added: ", newCelebrity)
        res.redirect('/celebrities')
    })
    .catch((err) => {
        console.log("ERROR: ", err);
        res.render("celebrities/new-celebrity")
    })
    
})

module.exports = router