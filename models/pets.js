let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PetsSchema = mongoose.Schema({
  animal: String,
  age: String,
  city: String,
  breed: String,
  description: String,
  email: String,
  image: String,
  name: String,
  sex: String,
  size: String,
  state: String,
  type: String
});

var Pets = mongoose.model("Pets", PetsSchema);

module.exports = Pets;
