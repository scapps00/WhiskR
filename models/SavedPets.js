let mongoose = require("mongoose");
let Schema3 = mongoose.Schema;

let SavedPetsSchema =  new Schema3({
  userId: String,
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

var SavedPets = mongoose.model("SavedPets", SavedPetsSchema);

module.exports = SavedPets;