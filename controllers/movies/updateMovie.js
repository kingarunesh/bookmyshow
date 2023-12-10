import Movie from "../../models/movieModel.js";

import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";

const hello = "arunesh";

console.log("hello arunesh");

export default catchAsync(async (req, res, next) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!movie) {
        return next(new AppError(`Movie not found with this ${req.params.id} ID.`, 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            movie,
        },
    });
});
