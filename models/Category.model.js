const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: String,
    icon: String,
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
