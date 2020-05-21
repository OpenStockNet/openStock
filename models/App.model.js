const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./Category.model");

const appSchema = new Schema(
  {
    logo: String,
    name: String,
    description: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
    },
    website: String,
    device: [String],
    recommended: Boolean,
  },
  {
    timestamps: true,
  }
);

const App = mongoose.model("App", appSchema);
module.exports = App;
