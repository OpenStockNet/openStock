const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const appSchema = new Schema({
  name: String,
  description: String,
  rate: Number,
  //owner:
}, {
  timestamps: true
});

const App = mongoose.model("App", appSchema);
module.exports = App;