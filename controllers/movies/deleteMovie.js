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
    await Movie.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: "success",
        message: null,
    });
};
