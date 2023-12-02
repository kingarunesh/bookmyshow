import express from "express";

import movies from "./../controllers/movies/movies.js";
import movie from "./../controllers/movies/movie.js";
import updateMovie from "./../controllers/movies/updateMovie.js";

import { deleteMovie, idCheck } from "./../controllers/movies/deleteMovie.js";
import { createMovie, checkBody } from "./../controllers/movies/createMovie.js";

const router = express.Router();

router.param("id", idCheck);

router.route("/").get(movies).post(checkBody, createMovie);
router.route("/:id").get(movie).patch(updateMovie).delete(deleteMovie);

export default router;
