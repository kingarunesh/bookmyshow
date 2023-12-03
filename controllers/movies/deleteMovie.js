import Movie from "./../../models/movieModel.js";

//SECTION :     id checking
// export const idCheck = (req, res, next, value) => {
//     const checkMovieExitsOrNot = movies.find((movie) => movie.id === Number(req.params.id));

//     if (!checkMovieExitsOrNot) {
//         return res.status(400).json({
//             status: "fail",
//             error: "Please enter valid movie id",
//         });
//     }

//     next();
// };

//SECTION :     delete movie handler
export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        //!     fix later if movie already deleted then it showing null
        console.log(movie);

        res.status(204).json({
            status: "success",
            message: null,
        });
    } catch (error) {
        res.status(400).json({
            status: "success",
            error: error,
        });
    }
};
