import fs from "fs";

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

export const checkBody = (req, res, next) => {
    if (!req.body.title || !req.body.duration || !req.body.price) {
        return res.status(401).json({
            status: "fail",
            message: "Content Missing",
        });
    }

    next();
};

export const createMovie = (req, res) => {
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
