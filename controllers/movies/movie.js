import Movie from "./../../models/movieModel.js";

import catchAsync from "../../utils/catchAsync.js";
import AppError from "./../../utils/appError.js";

export default catchAsync(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    console.log(movie);

    if (!movie) {
        return next(new AppError(`No movie found with this ${req.params.id} ID`, 404));
    }

    res.status(200).json({
        status: "succes",
        data: {
            movie,
        },
    });
});
