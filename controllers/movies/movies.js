import fs from "fs";

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

export default (req, res) => {
    res.status(200).json({
        status: "success",
        length: movies.length,
        requestAt: req.requestAt,
        data: {
            movies,
        },
    });
};
