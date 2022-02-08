const router = require("express").Router();

const Movies = require("../models/Movies");
const Celebrities = require("../models/Celebrity");

router.get("/", (req, res) => {
  Movies.find()
    .then((allMovies) => {
      res.render("movies/movies", { allMovies });
    })
    .catch((err) => console.log(err));
});

router.get("/create", (req, res) => {
  Celebrities.find()
    .then((celebritiesfromDB) => {
      res.render("movies/new-movie", { celebritiesfromDB });
    })
    .catch((err) => console.log(err));
});

router.post("/create", (req, res) => {
  Movies.create(req.body)
    .then((newMovie) => {
      console.log(newMovie);
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

//GET movie details
router.get("/movie-details/:id", (req, res) => {
  const { id } = req.params;
  Movies.findById(id)
    .populate("cast")
    .then((movie) => {
      //console.log(movie)
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => console.log(err));
});

//DELETE movie
router.post("/:id/delete", (req, res) => {
  const { id } = req.params;
  Movies.findByIdAndDelete(id)
    .then(() => {
      console.log("deleted successfully");
      res.redirect("/movies");
    })
    .catch((error) => console.log(error));
});

//UPDATE movie
router.get("/:id/edit", (req, res) => {
  Celebrities.find()
    .then((celebritiesfromDB) => {
      Movies.findById(req.params.id)
        .then((foundMovie) => {
          res.render("movies/edit-movie", {
            foundMovie , celebritiesfromDB
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
router.post("/:id/edit", (req, res) => {
  Movies.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedMovie) => {
      console.log(updatedMovie);
      res.redirect(`/movies/movie-details/${req.params.id}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
