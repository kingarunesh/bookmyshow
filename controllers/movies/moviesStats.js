import Movie from "../../models/movieModel.js";

export default async (req, res) => {
    try {
        /*NOTE :    get movies list by avgRating which is gte 4.0
        const movies = await Movie.aggregate([
            {
                // $match: { avgRating: { $gte: 4.0 } },
            },
        ]);
        */

        /*NOTE :    get movies list where avgRating gte 4.0 and duration gte 160
        const movies = await Movie.aggregate([
            {
                $match: { avgRating: { $gte: 4.0 }, duration: { $gte: 160 } },
            },
        ]);
        */

        //NOTE :    get
        const movies = await Movie.aggregate([
            {
                $match: { avgRating: { $gte: 1.0 } },
            },

            {
                $group: {
                    // _id: "$type",
                    _id: { $toUpper: "$type" },

                    totalMovies: { $sum: 1 },
                    countRating: { $sum: "$countRating" },
                    avgRating: { $avg: "$avgRating" },
                    totalDuration: { $sum: "$duration" },
                    minBoxOffice: { $min: "$boxOffice" },
                    maxBoxOffice: { $max: "$boxOffice" },
                    totalBoxOfficeCollections: { $sum: "$boxOffice" },
                    avgBoxOfficeCollections: { $avg: "$boxOffice" },

                    minBudget: { $min: "$budget" },
                    maxBudget: { $max: "$budget" },
                    totalBudget: { $sum: "$budget" },
                },
            },

            {
                $sort: { totalBoxOfficeCollections: -1 },
            },

            //NOTE :    remove from group
            // {
            //     $match: { _id: { $ne: "CHILD" } },
            // },
        ]);

        res.status(200).json({
            status: "success",
            length: movies.length,
            message: movies,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};
