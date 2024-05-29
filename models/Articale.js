const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articaleSchema = new Schema({
  body: String,
});

const Articale = mongoose.model("articale", articaleSchema);

module.exports = Articale;
