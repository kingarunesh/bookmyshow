class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    //NOTE :    filter
    filter() {
        const queryObj = { ...this.queryString };
        const excludeFields = ["page", "limit", "sort", "fields", "skip"];
        excludeFields.forEach((el) => delete queryObj[el]);

        let queryObjStr = JSON.stringify(queryObj);
        queryObjStr = queryObjStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        this.query = this.query.find(JSON.parse(queryObjStr));

        return this;
    }

    //NOTE :    sort
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }

    //NOTE :    fields - select

    fields() {
        if (this.queryString.fields) {
            const selectFields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(selectFields);
        } else {
            this.query = this.query.select("-__v");
        }

        return this;
    }

    //NOTE :    pagination

    pagination() {
        const limit = Number(this.queryString.limit) || 20;
        const page = Number(this.queryString.page) || 1;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

export default APIFeatures;
