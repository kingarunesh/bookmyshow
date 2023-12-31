import express from "express";

import movie from "./../controllers/movies/movie.js";
import updateMovie from "./../controllers/movies/updateMovie.js";

import {
    movies,
    topFivelongDurationMovies,
    topFiveByAverageRatingMovies,
    topFiveOldestMovies,
} from "./../controllers/movies/movies.js";
import { deleteMovie } from "./../controllers/movies/deleteMovie.js";
import { createMovie } from "./../controllers/movies/createMovie.js";

import moviesStats from "../controllers/movies/moviesStats.js";
import monthlyMovies from "../controllers/movies/monthlyMovies.js";

const router = express.Router();

router.route("/top-5-long-duration-movies").get(topFivelongDurationMovies, movies);

router.route("/top-5-average-rating-movies").get(topFiveByAverageRatingMovies, movies);

router.route("/top-5-oldest-movies").get(topFiveOldestMovies, movies);

router.route("/movies-stats").get(moviesStats);
router.route("/monthly-movies/:year").get(monthlyMovies);

// router.param("id", idCheck);

router.route("/").get(movies).post(createMovie);
router.route("/:id").get(movie).patch(updateMovie).delete(deleteMovie);

export default router;
