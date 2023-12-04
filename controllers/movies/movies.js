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
        const excludeFields = ["page", "limit", "sort", "fields", "skip"];
        excludeFields.forEach((el) => delete queryObj[el]);

        //  filter movies by queryObj
        // const query = Movie.find(queryObj);

        //NOTE :    adv filtering - gt, gte, lt, lte
        // final url
        // {{URL}}/movies?duration[gte]=160&avgRating[gte]=4.0&countRating[gte]=5000

        // console.log(queryObj);

        //  convert json-parse to json-strinfy
        let queryObjStr = JSON.stringify(queryObj);

        queryObjStr = JSON.parse(queryObjStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`));

        // const query = Movie.find(queryObjStr);

        //NOTE :    sort
        // {{URL}}/movies?sort=title
        // {{URL}}/movies?sort=duration
        // {{URL}}/movies?sort=-duration

        let query = Movie.find(queryObjStr);

        if (req.query.sort) {
            // query = query.sort("title");
            // query = query.sort("title -duration");

            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        //NOTE :    fields - select

        if (req.query.fields) {
            const selectFields = req.query.fields.split(",").join(" ");
            query = query.select(selectFields);
        } else {
            query = query.select("-__v");
        }

        //NOTE :    limit documents
        // if (req.query.limit) {
        //     query = query.limit(Number(req.query.limit));
        // }

        //NOTE :    skip
        // if (req.query.skip) {
        //     const skipBy = Number(req.query.skip);

        //     query = query.skip(skipBy);
        // }

        //NOTE :    pagination
        const limit = Number(req.query.limit) || 20;
        const page = Number(req.query.page) || 1;

        //  if page = 1 then, skip = 0 & limit = 10
        //  if page = 2 then, skip = 10 & limit = 10
        //  if page = 3 then, skip = 20 & limit = 10
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const totalDocument = await Movie.countDocuments();
            console.log(totalDocument);

            if (skip >= totalDocument) {
                // throw new Error("Limit or Page number is invalid, Please enter valid limit and page number");

                return res.status(400).json({
                    status: "fail",
                    message: "Limit or Page number is invalid, Please enter valid limit and page number",
                });
            }
        }

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

        //NOTE :    send error
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
