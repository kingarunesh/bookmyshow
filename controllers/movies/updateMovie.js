import Movie from "../../models/movieModel.js";

export default async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).json({
        status: "success",
        data: {
            movie,
        },
    });
};
