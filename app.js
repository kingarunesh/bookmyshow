import express from "express";
import dotenv from "dotenv";
import fs from "fs";

//SECTION :     env
dotenv.config({ path: "./.env" });

const app = express();

//SECTION :     middlewares

//NOTE :    json body parser
app.use(express.json());

//SECTION :     json file read
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
// console.log(movies);

//SECTION :     route

//NOTE :    get all movies
app.get("/api/v1/movies", (req, res) => {
    res.status(200).json({
        status: "success",
        length: movies.length,
        data: {
            movies,
        },
    });
});

//NOTE :    create new movie
app.post("/api/v1/create-movie", (req, res) => {
    const newMovies = { id: movies.length, ...req.body };
    movies.push(newMovies);

    fs.writeFileSync("./data/movies.json", JSON.stringify(movies));

    res.status(201).json({
        status: "success",
        data: {
            movie: req.body,
        },
    });
});

//NOTE :    get movie
app.get("/api/v1/get-movie/:id", (req, res) => {
    const id = req.params.id;

    if (id > movies.length - 1) {
        return res.status(400).json({
            status: "fail",
            error: "Please enter valid movie id",
        });
    }

    const movie = movies[id];

    res.status(200).json({
        status: "succes",
        data: {
            movie: movie,
        },
    });
});

//NOTE :    update movie
app.patch("/api/v1/update-movie/:id", (req, res) => {
    // get id
    const id = Number(req.params.id);

    // get movie by id
    const movie = movies.find((movie) => movie.id === id);

    //  if not get movie send error
    if (movie) {
        // update movie
        const updatedMovie = { id, ...req.body };

        //  remove movie
        const newMoviesList = movies.filter((movie) => movie.id !== id);

        //  add updated movie to movies
        newMoviesList.push(updatedMovie);

        //  re-write movies.json
        fs.writeFileSync("./data/movies.json", JSON.stringify(newMoviesList));

        //  send response

        res.status(200).json({
            status: "success",
            data: updatedMovie,
        });
    } else {
        return res.status(400).json({
            status: "error",
            message: "Please enter valid movie id",
        });
    }
});

//NOTE :    delete movie
app.delete("/api/v1/delete-movie/:id", (req, res) => {
    const id = Number(req.params.id);

    const checkMovieExitsOrNot = movies.find((movie) => movie.id === id);

    if (!checkMovieExitsOrNot) {
        return res.status(400).json({
            status: "fail",
            error: "Please enter valid movie id",
        });
    }

    const newMovies = movies.filter((movie) => movie.id !== id);

    fs.writeFileSync("./data/movies.json", JSON.stringify(newMovies));

    res.status(204).json({
        status: "success",
        message: "hello",
    });
});

//SECTION :     server start
const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    console.log("");
    console.log(`Server running on ${PORT}...`);
});
