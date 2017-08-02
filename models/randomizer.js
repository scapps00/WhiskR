
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RandomPetSchema =  new Schema({
  age: String,
  city: String,
  description: String,
  email: String,
  image: String,
  name: String,
  sex: String,
  size: String,
  state: String,
  type: String
});

var RandomPet = mongoose.model("RandomPets", RandomPetSchema);

module.exports = RandomPet;
