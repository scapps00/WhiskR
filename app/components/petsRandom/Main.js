import React from "react";

import Query from "./children/Query.js";

const axios = require("axios");

export default class Main extends React.Component {
  
  getSavedPets() {
    axios.get("/getSavedPets")
      .then(function(results) {
        let savedPets = $("<div>");
        savedPets.append("<h2>Your Saved Pets</h2><br>");
        for (let i = 0; i < results.data.length; i++) {
          savedPets.append("Name : " + results.data[i].name + "<br>");
          let savedPetImg = $("<img>");
          savedPetImg.attr("src", results.data[i].image);
          savedPets.append(savedPetImg);
          savedPets.append("<br>");
          savedPets.append("Type of Animal: " + results.data[i].type + "<br>");
          savedPets.append("Age: " + results.data[i].age + "<br>");
          savedPets.append("Sex: " + results.data[i].sex + "<br>");
          savedPets.append("Size: " + results.data[i].size + "<br>");
          savedPets.append("Description: " + results.data[i].description + "<br>");
          savedPets.append("Location: " + results.data[i].city + ", " + results.data[i].state + "<br>");
          savedPets.append("Contact Email: " + results.data[i].email + "<br><br>");
        }
        $("#savedPetsDiv").html(savedPets);
      }).catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Query />
    )
  }
}
