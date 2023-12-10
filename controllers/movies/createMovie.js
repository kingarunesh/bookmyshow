import Movie from "./../../models/movieModel.js";

import catchAsync from "../../utils/catchAsync.js";

// export const checkBody = (req, res, next) => {
//     if (!req.body.title || !req.body.releaseDate || !req.body.description || !req.body.avgRating || !req.body.coverImage) {
//         return res.status(401).json({
//             status: "fail",
//             message: "Content Missing",
//         });
//     }

//     next();
// };

export const createMovie = catchAsync(async (req, res, next) => {
    const newMovie = await Movie.create({
        title: req.body.title,
        releaseDate: req.body.releaseDate,
        description: req.body.description,
        avgRating: req.body.avgRating,
        coverImage: req.body.coverImage,
        duration: req.body.duration,
        type: req.body.type,
        budget: req.body.budget,
        boxOffice: req.body.boxOffice,
        hikeDates: req.body.hikeDates,
        thereInTheater: req.body.thereInTheater,
        secretMovie: req.body.secretMovie,
    });

    res.status(201).json({
        status: "success",
        data: {
            movie: newMovie,
        },
    });
});
