import fs from "fs";

//SECTION :     read movie json file
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

//SECTION :     id checking
export const idCheck = (req, res, next, value) => {
    const checkMovieExitsOrNot = movies.find((movie) => movie.id === Number(req.params.id));

    if (!checkMovieExitsOrNot) {
        return res.status(400).json({
            status: "fail",
            error: "Please enter valid movie id",
        });
    }

    next();
};

//SECTION :     delete movie handler
export const deleteMovie = (req, res) => {
    const id = Number(req.params.id);

    const newMovies = movies.filter((movie) => movie.id !== id);

    fs.writeFileSync("./data/movies.json", JSON.stringify(newMovies));

    res.status(204).json({
        status: "success",
        message: "hello",
    });
};
