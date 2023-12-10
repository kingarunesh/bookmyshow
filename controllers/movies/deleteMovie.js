import Movie from "./../../models/movieModel.js";

import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";

//SECTION :     delete movie handler
export const deleteMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    //!     fix later if movie already deleted then it showing null
    console.log(movie);

    if (!movie) {
        return next(new AppError(`Movie not found with this ${req.params.id} ID.`, 404));
    }

    res.status(204).json({
        status: "success",
        message: null,
    });
});
