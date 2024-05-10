const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articaleSchema = new Schema({
  title: String,
  body: String,
  numberOfLike: Number,
});

const Articale = mongoose.model("articale", articaleSchema);

module.exports = Articale;
