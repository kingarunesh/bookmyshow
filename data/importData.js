import "dotenv/config";

import mongoose from "mongoose";

import Movie from "./../models/movieModel.js";

//SECTION :     read json file data

import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`, "utf-8"));
// console.log(movies);

//SECTION :     database
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("Database Contectd..."))
    .catch((error) => console.log(error));

//SECTION :     methods

//NOTE :    import movie json file
const importMovies = async () => {
    try {
        await Movie.create(movies);
        console.log("inserted...");
    } catch (error) {
        console.log(error);
    }

    process.exit();
};

const deleteMovies = async () => {
    try {
        await Movie.deleteMany();
        console.log("deleted...");
    } catch (error) {
        console.log(error);
    }

    process.exit();
};

//NOTE :    read commands

if (process.argv[2] === "--import") {
    importMovies();
} else if (process.argv[2] === "--delete") {
    deleteMovies();
}
