import mongoose from "mongoose";
import slugify from "slugify";

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Movie must have title"],
            minLength: [3, "Movie title must be between 3 and 50"],
            maxLength: [50, "Movie title must be between 3 and 50"],
            trim: true,
            unique: true,
        },

        slug: String,

        secretMovie: {
            type: Boolean,
            default: false,
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
            enum: {
                values: ["child", "adult", "family"],
                message: "Movie type must be anyone child, adult or family",
            },
        },

        budget: {
            type: Number,
        },

        boxOffice: {
            type: Number,

            validate: {
                //!     only work when creating new document
                validator: function (currentValue) {
                    return currentValue > this.budget;
                },

                message: "Box Office collection ({VALUE}) must be greater than budget",
            },
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
            min: [1, "Movie average rating must be between 1.0 and 5.0"],
            max: [5, "Movie average rating must be between 1.0 and 5.0"],
        },

        countRating: {
            type: Number,
            min: [1, "Movie countRating minimum 0 or more than 0"],
        },

        coverImage: {
            type: String,
            required: [true, "Movie must have cover image"],
            trim: true,
        },

        images: [String],

        thereInTheater: Number,

        createdAt: {
            type: Date,
            default: Date.now(),
            // select: false,
        },
        hikeDates: [Date],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

//SECTION :     virtual properties
//NOTE :    test
movieSchema.virtual("countRatingTwo").get(function () {
    return this.countRating / 2;
});

//NOTE :    calculate movie duration in hours and minutes
movieSchema.virtual("durationInHourAndMinutes").get(function () {
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    const time = `${hours < 10 ? "0" : ""}${hours}:${minutes < 9 ? "0" : ""}${minutes}`;

    return time;
});

//NOTE :    convert crores to millions
movieSchema.virtual("budgetInBillionsAndMillons").get(function () {
    const budget = (this.budget * 10000000) / 1000000;

    if (budget >= 1000) {
        const billions = Math.floor(budget / 1000);
        const millions = budget % 1000;

        return `${billions}.${millions} Billions`;
    } else {
        return `${budget} Millions`;
    }

    // return `${budget} Millions`;
});

movieSchema.virtual("boxOfficeInBillionsAndMillons").get(function () {
    const boxOffice = (this.boxOffice * 10000000) / 1000000;

    if (boxOffice >= 1000) {
        const billion = Math.floor(boxOffice / 1000);
        const million = boxOffice % 1000;
        return `${billion}.${million} Billions`;
    } else {
        return `${boxOffice} Millions`;
    }
});

//NOTE :    how many months/weeks/days movie was there in theater
movieSchema.virtual("movieWasInTheater").get(function () {
    const months = Math.floor(this.thereInTheater / 30);

    //!     not sending currect result
    const weeks = Math.floor(this.thereInTheater / 7);

    const days = this.thereInTheater % 7;

    return `${months > 0 ? `${months} Months, ` : ""}${weeks} Weeks${days > 0 ? ` and ${days} Days` : ""}`;
});

//NOTE :    display how many years/months/weeks/days back movie was released
movieSchema.virtual("releasedDateCount").get(function () {
    const todayDate = new Date();
    const releasedDate = new Date(this.releaseDate);

    // convert to milliseconds
    const milliseconds = todayDate - releasedDate;

    // convert to hours ( 60 = min | 60 = seconds | 1000 = milliseconds )
    const hours = milliseconds / (60 * 60 * 1000);

    //  convert to days ( 24 = hours = 1 day )
    const days = Math.floor(hours / 24);

    const years = Math.floor(days / 365);

    const months = Math.floor((days % 365) / 30);

    const weeks = Math.floor(((days % 365) % 30) / 7);

    //!     not send currect result
    const daysOld = Math.floor((((days % 365) % 30) / 7) % 30);

    return `${
        years > 0 ? `${years} years, ` : ""
    }${months > 0 ? `${months} months, ` : ""}${weeks > 0 ? `${weeks} weeks` : ""}${daysOld > 0 ? `, ${daysOld} days` : ""} ago`;
});

//SECTION :     document middleware

//NOTE :    pre will run before save OR create document in database AND pre have "this" keywords means "this" can access movieSchema
movieSchema.pre("save", function (next) {
    // console.log("PRE : ", this);

    //!     slug
    this.slug = slugify(this.title, { replacement: "-", lower: true });

    //!     check duration
    if (this.duration < 100) {
        throw new Error("Please enter valid movie duration");
    }

    next();
});

//NOTE :    post will run after document save on database, post doesnot have "this" keyword but post have document access means whatever content will save or create that content will return as a document
movieSchema.post("save", function (document, next) {
    // console.log("POST : ", document);

    next();
});

//SECTION :     query middleware
//!     it will work for "find", "findById", "findByIdAndUpdate", "findByIdAndDelete" related all types for "find..."

//NOTE :    pre query middleware

//!     "find" will work for only "find"
// movieSchema.pre("find", function (next) {

//!     "find" will work for "find", "findById", "findByIdAndDelete", "findByIdAndUpdate"
movieSchema.pre(/^find/, function (next) {
    this.find({ secretMovie: { $ne: true } });

    next();
});

//NOTE :    post middleware
movieSchema.post("find", function (document, next) {
    console.log("Post Query Middleware");

    // console.log(document);

    next();
});

//SECTION :     aggregate middleware
movieSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { secretMovie: { $ne: true } } });

    next();
});

//SECTION :     create collection and export
const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
