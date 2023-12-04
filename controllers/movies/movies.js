import Movie from "./../../models/movieModel.js";

import APIFeatures from "../../utils/APIFeatures.js";

//SECTION :     url
/*

{{URL}}/movies?language=English&fields=language,title

{{URL}}/movies?genres=Comedy

{{URL}}/movies?cast=Vijay

//!     not working ( cast is there in array that's why )
{{URL}}/movies?cast=Vijay,Arjun

{{URL}}/movies?language=English

{{URL}}/movies?duration[gte]=160&avgRating[gte]=4.0&countRating[gte]=5000

{{URL}}/movies?countRating[gte]=10000

*/

//SECTION :     alias - middleware

//NOTE :    top 5 long duration movies
const topFivelongDurationMovies = (req, res, next) => {
    req.query.fields = "title,duration,avgRating,countRating";
    req.query.limit = 5;
    req.query.sort = "-duration";

    next();
};

//NOTE :    top 5 movies by avgerage rating
const topFiveByAverageRatingMovies = (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = "-avgRating";
    req.query.fields = "title, duration, avgRating, countRating";

    next();
};

//NOTE :    top 5 oldest movies
const topFiveOldestMovies = (req, res, next) => {
    req.query.limit = 5;
    req.query.fields = "title,releaseDate,";
    req.query.sort = "releaseDate";

    next();
};

//SECTION :     route handler method
const movies = async (req, res) => {
    try {
        const features = new APIFeatures(Movie.find(), req.query).filter().sort().fields().pagination();

        const movies = await features.query;

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

//SECTION :     export methods

export { movies, topFivelongDurationMovies, topFiveByAverageRatingMovies, topFiveOldestMovies };
