import fs from "fs";

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

export default (req, res) => {
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
};
