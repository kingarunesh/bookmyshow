import Movie from "../../models/movieModel.js";

import catchAsync from "../../utils/catchAsync.js";

const hello = "arunesh";

console.log("hello arunesh");

export default catchAsync(async (req, res, next) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).json({
        status: "success",
        data: {
            movie,
        },
    });
});
