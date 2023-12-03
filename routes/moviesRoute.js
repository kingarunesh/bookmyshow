import express from "express";

import movies from "./../controllers/movies/movies.js";
import movie from "./../controllers/movies/movie.js";
import updateMovie from "./../controllers/movies/updateMovie.js";

import { deleteMovie } from "./../controllers/movies/deleteMovie.js";
import { createMovie } from "./../controllers/movies/createMovie.js";

const router = express.Router();

// router.param("id", idCheck);

router.route("/").get(movies).post(createMovie);
router.route("/:id").get(movie).patch(updateMovie).delete(deleteMovie);

export default router;
