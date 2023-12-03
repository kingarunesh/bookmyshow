import Movie from "./../../models/movieModel.js";

export default async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json({
        status: "succes",
        data: {
            movie,
        },
    });
};
