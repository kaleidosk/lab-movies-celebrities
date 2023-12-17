// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require ("../models/Celebrity.model.js")

// all your routes here

//It.3 adding new celebrities
router.get("/celebrities/create", (req,res)=>{
    res.render("celebrities/new-celebrity.hbs")
})

router.post('/celebrities/create', (req, res) => {
   console.log('req.body', req.body)
   const {name,occupation,catchPhrase} = req.body;
   Celebrity.create({name,occupation,catchPhrase})
   .then (() =>res.redirect('/celebrities'))
   .catch (error => {
    console.log(error)
   res.render('celebrities/new-celebrity.hbs')})
  })

 //It.4 listing our celebrities
 router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then(celebritiesList =>{
    console.log('celebritiesList', celebritiesList)
    res.render('celebrities/celebrities.hbs', {celebrities: celebritiesList});
  })
    .catch(error => {
      console.log('Error while showing celebrities ', error);
      next(error)
    })
  })

  module.exports = router;