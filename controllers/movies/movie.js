import fs from "fs";

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

export default (req, res) => {
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
};
