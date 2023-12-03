import Movie from "./../../models/movieModel.js";

export default async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        res.status(200).json({
            status: "succes",
            data: {
                movie,
            },
        });
    } catch (error) {
        res.status(200).json({
            status: "succes",
            data: {
                error: error,
            },
        });
    }
};
