import Movie from "./../../models/movieModel.js";

import catchAsync from "../../utils/catchAsync.js";

export default catchAsync(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json({
        status: "succes",
        data: {
            movie,
        },
    });
});
