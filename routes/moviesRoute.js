import express from "express";

import movies from "./../controllers/movies/movies.js";
import movie from "./../controllers/movies/movie.js";
import createMovie from "./../controllers/movies/createMovie.js";
import updateMovie from "./../controllers/movies/updateMovie.js";
import deleteMovie from "./../controllers/movies/deleteMovie.js";

const moviesRouter = express.Router();
moviesRouter.route("/").get(movies).post(createMovie);
moviesRouter.route("/:id").get(movie).patch(updateMovie).delete(deleteMovie);

export default moviesRouter;
