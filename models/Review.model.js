const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");

const reviewSchema = new Schema(
  {
    value: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
  },
    {
        timestamps: true, 
    }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;