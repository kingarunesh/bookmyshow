import Movie from "./../../models/movieModel.js";

//SECTION :     route handler method
export default async (req, res) => {
    const movies = await Movie.find();

    res.status(200).json({
        status: "success",
        length: movies.length,
        requestAt: req.requestAt,
        data: {
            movies,
        },
    });
};
