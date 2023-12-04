import Movie from "./../../models/movieModel.js";

//SECTION :     route handler method
export default async (req, res) => {
    try {
        //NOTE :    get all movies
        // const movies = await Movie.find();
        // const movies = await Movie.find({});

        //NOTE :    filter movie direct in find method
        // const movies = await Movie.find({ title: "Jawan" });
        // const movies = await Movie.find({ duration: { $gt: 165 } });
        // const movies = await Movie.find({ duration: { $gt: 165 }, avgRating: { $gte: 4.0 } });

        //NOTE :    filter movie from request query
        // const movies = await Movie.find(req.query);

        //NOTE :    excludes page, limit, sort, fields from filter request query
        //  create new query object
        const queryObj = { ...req.query };

        //  delete - page, limit, sort, fields from queryObj
        const excludeFields = ["page", "limit", "sort", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

        //  filter movies by queryObj
        // const query = Movie.find(queryObj);

        //NOTE :    adv filtering - gt, gte, lt, lte
        // final url
        // {{URL}}/movies?duration[gte]=160&avgRating[gte]=4.0&countRating[gte]=5000

        console.log(queryObj);

        //  convert json-parse to json-strinfy
        let queryObjStr = JSON.stringify(queryObj);

        queryObjStr = JSON.parse(queryObjStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`));

        const query = Movie.find(queryObjStr);

        //NOTE :    send response
        const movies = await query;

        res.status(200).json({
            status: "success",
            length: movies.length,
            requestAt: req.requestAt,
            data: {
                movies,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",

            requestAt: req.requestAt,
            error: {
                error,
            },
        });
    }
};
