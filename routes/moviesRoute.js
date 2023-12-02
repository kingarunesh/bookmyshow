import express from "express";

import { getAllMovies, updateMovie, deleteMovie, createNewMovie, getMovie } from "../controllers/movies/moviesController.js";

const moviesRouter = express.Router();
moviesRouter.route("/").get(getAllMovies).post(createNewMovie);
moviesRouter.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

export default moviesRouter;
