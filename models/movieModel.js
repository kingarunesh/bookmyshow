import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie must have title"],
        minLength: [3, "Movie title must be between 3 and 50"],
        maxLength: [50, "Movie title must be between 3 and 50"],
        trim: true,
        unique: true,
    },

    releaseDate: {
        type: Date,
        required: [true, "Moive must have release date"],
    },

    duration: {
        type: Number,
        required: [true, "Movie must have duration in minitue"],
    },

    type: {
        type: String,
        required: [true, "Movie must have type"],
    },

    budget: {
        type: Number,
        required: [true, "Movie must have budget"],
    },

    boxOffice: {
        type: Number,
        required: [true, "Movie must have box office collection"],
    },

    description: {
        type: String,
        trim: true,
        required: [true, "Movie must have description about movie"],
        minLength: [15, "Movie must have description length minimum 15 and maximum 1500"],
        maxLength: [1500, "Movie must have description length minimum 15 and maximum 1500"],
    },

    cast: [String],

    genres: [String],

    language: [String],

    avgRating: {
        type: Number,
        required: [true, "Movie must have average rating"],
    },

    countRating: {
        type: Number,
    },

    coverImage: {
        type: String,
        required: [true, "Movie must have cover image"],
        trim: true,
    },

    images: [String],

    createdAt: {
        type: Date,
        default: Date.now(),
    },
    hikeDates: [Date],
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
