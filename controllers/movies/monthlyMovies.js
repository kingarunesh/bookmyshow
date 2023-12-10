import Movie from "./../../models/movieModel.js";

import catchAsync from "../../utils/catchAsync.js";

export default catchAsync(async (req, res, next) => {
    const year = Number(req.params.year);

    const movies = await Movie.aggregate([
        //!     it will extract all movies by hikeDates for example 1 movie have 3 hikeDates then it will extract 3 movies
        {
            $unwind: "$hikeDates",
        },

        //!     show movies between _ and _ date ( condition )
        {
            $match: {
                hikeDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },

        //!     group
        {
            $group: {
                _id: { $month: "$hikeDates" },
                numHikeMovies: { $sum: 1 },
                movies: { $push: "$title" },
                hikeDates: { $push: "$hikeDates" },
            },
        },

        //!     add fields
        {
            $addFields: { month: "$_id" },
        },

        //!     remove field
        {
            $project: { _id: 0 },
        },

        //!     sort
        {
            $sort: { numHikeMovies: -1 },
        },

        //!     limit
        {
            $limit: 10,
        },
    ]);

    res.status(200).json({
        status: "success",
        length: movies.length,
        data: {
            movies,
        },
    });
});
