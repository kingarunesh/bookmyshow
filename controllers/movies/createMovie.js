import fs from "fs";

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

export default (req, res) => {
    const newMovies = { id: movies.length, ...req.body };
    movies.push(newMovies);

    fs.writeFileSync("./data/movies.json", JSON.stringify(movies));

    res.status(201).json({
        status: "success",
        data: {
            movie: req.body,
        },
    });
};
