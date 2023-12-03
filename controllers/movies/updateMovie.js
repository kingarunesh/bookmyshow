import Movie from "../../models/movieModel.js";

export default async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        res.status(200).json({
            status: "success",
            data: {
                movie,
            },
        });
    } catch (error) {
        res.status(200).json({
            status: "success",
            error: error,
        });
    }
};
