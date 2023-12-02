import fs from "fs";

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

export default (req, res) => {
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
};
