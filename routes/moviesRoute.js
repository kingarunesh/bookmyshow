import express from "express";

import movies from "./../controllers/movies/movies.js";
import movie from "./../controllers/movies/movie.js";
import updateMovie from "./../controllers/movies/updateMovie.js";
import deleteMovie from "./../controllers/movies/deleteMovie.js";

import { createMovie, checkBody } from "./../controllers/movies/createMovie.js";

const moviesRouter = express.Router();
moviesRouter.route("/").get(movies).post(checkBody, createMovie);
moviesRouter.route("/:id").get(movie).patch(updateMovie).delete(deleteMovie);

export default moviesRouter;
