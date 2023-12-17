// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require ('../models/Movie.model')
const Celebrity = require ('../models/Celebrity.model')

router.get('/movies/create', (req,res)=>{
Celebrity.find()
.then ((celebritiesList) => res.render ('movies/new-movie.hbs',{celebritiesList}))
})

router.post('/movies/create', (req, res)=>{
    const {title, genre, plot, cast} = req.body
Movie.create ({title,genre,plot,cast})
.then (()=> res.redirect ('/movies'))
.catch(err => console.log(err))
    res.render ("movies/new-movie.hbs")
})


router.get('/movies', (req,res)=>{
Movie.find()
.then ((moviesList) => res.render ("movies/movies.hbs",{moviesList}))
})

router.get('/movies/:id', (req,res)=>{
    const movieId = req.params.movieId
    Movie.findById(movieId)
    .populate('cast')
    .then ((foundMovie)=>{
        console.log('foundMovie', foundMovie)
        res.render('movies/movie-details', {foundMovie})
    })
})

router.post('/movies/:id/delete', (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(()=> res.redirect('/movies'))
        .catch(err => console.log(err))
  });

  router.get('/movies/:id/edit', (req, res) => {
    Movie.findById(req.params.id)
      .then(foundMovie => {
        console.log('foundMovie', foundMovie)
        res.render('movies/edit-movie', {foundMovie}, {celebritiesList})
      })
  });
  
  router.post('/movies/:id', (req, res) => {
   const {title,plot,cast} = req.body;
   Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(()=> res.redirect(`/movies`))
    .catch(err => console.log(err))
  });


module.exports = router;