import React from "react";

import Random from "./Random.js";
//woo
const axios = require("axios");

const key = require("../../../../keys.js");

export default class Query extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			randomPets: ""
		};
		this.search = this.search.bind(this);
		this.findAnimals = this.findAnimals.bind(this);
		this.deletePet = this.deletePet.bind(this);
		this.getSavedPets = this.getSavedPets.bind(this);
	}

	deletePet(event, name) {
		event.preventDefault();
		axios.post("/deletePet/" + name)
			.then(function(result) {
				this.getSavedPets();
			}.bind(this)).catch(function(error) {
		        console.log(error);
		    });
	}

	getSavedPets() {
	    axios.get("/getSavedPets")
	      .then(function(results) {
	        let savedPets = $("<div>");
	        for (let i = (results.data.length - 1); i >= 0; i--) {
	          savedPets.append("<strong>Name:</strong> " + results.data[i].name + "<br>");
	          let savedPetImg = $("<img>");
	          savedPetImg.attr("src", results.data[i].image);
	          savedPets.append(savedPetImg);
	          savedPets.append("<br>");
	          savedPets.append("<strong>Type of Animal:</strong> " + results.data[i].type + "<br>");
	          savedPets.append("<strong>Age:</strong> " + results.data[i].age + "<br>");
	          savedPets.append("<strong>Sex:</strong> " + results.data[i].sex + "<br>");
	          savedPets.append("<strong>Size:</strong> " + results.data[i].size + "<br>");
	          savedPets.append("<strong>Description:</strong> " + results.data[i].description + "<br>");
	          savedPets.append("<strong>Location:</strong> " + results.data[i].city + ", " + results.data[i].state + "<br>");
	          savedPets.append("<strong>Contact Email:</strong> " + results.data[i].email + "<br>");
	          let deleteButton = $("<button>");
	          deleteButton.text("Delete Pet");
	          deleteButton.click(function(event) {
	          	this.deletePet(event, results.data[i].name);
	          }.bind(this));
	          savedPets.append(deleteButton);
	          savedPets.append("<br><br>");
	        }
	        $("#savedPetsDiv").html(savedPets);
	      }.bind(this)).catch(function(error) {
	        console.log(error);
	      });
	  }

	findAnimals(randomPets) {
		let random = Math.floor(1000 * Math.random());
		let url = "http://api.petfinder.com/pet.find";
		url += "?key=" + key;
		url += "&animal=";
		url += $("input:checked").attr("id");
		url += "&location=";
		url += $("#location").val();
		url += "&offset=";
		url += random;
		url += "&count=1&format=json&output=basic";
		console.log(url);
		axios.get(url)
			.then(function(result) {
				console.log(result);
				if (result.data.petfinder.pets && result.data.petfinder.pets.pet && result.data.petfinder.pets.pet.age.$t && result.data.petfinder.pets.pet.contact && result.data.petfinder.pets.pet.contact.city.$t && result.data.petfinder.pets.pet.description.$t && result.data.petfinder.pets.pet.contact.email.$t && result.data.petfinder.pets.pet.media.photos && result.data.petfinder.pets.pet.media.photos.photo && result.data.petfinder.pets.pet.media.photos.photo[3].$t && result.data.petfinder.pets.pet.name.$t && result.data.petfinder.pets.pet.sex.$t && result.data.petfinder.pets.pet.size.$t && result.data.petfinder.pets.pet.contact.state.$t && result.data.petfinder.pets.pet.animal.$t) {
					randomPets.push(result);
					if (randomPets.length == 10) {
						this.setState({
							randomPets: randomPets
						});
					} else {
						this.findAnimals(randomPets);
					}
				} else {
					this.findAnimals(randomPets);	
				}
			}.bind(this))
			.catch(function(error) {
				console.log(error);
			});
	}

	search(event) {
		event.preventDefault();
		axios.post("/remove")
			.then(function(result) {
			}).catch(function(error) {
				console.log(error);
			});
		let randomPets = [];
		this.findAnimals(randomPets);
	}

	render() {
		return(
			<div className="container">
				<div className="row">
					<div className="col-xs-1"></div>
					<div className="col-xs-2 border">
						<h2>Choose</h2>
						<form>
							<div className="formGroup">
								<label htmlFor="type">Type of Pet</label>
								<br />
								<input type="radio" name="type" id="dog" /> Dog <br />
								<input type="radio" name="type" id="cat" /> Cat <br />
								<input type="radio" name="type" id="bird" /> Bird <br />
								<input type="radio" name="type" id="reptile" /> Reptile/Fish <br />
								<input type="radio" name="type" id="smallfurry" /> Small & Furry <br />
								<input type="radio" name="type" id="horse" /> Horse <br />
								<input type="radio" name="type" id="barnyard" /> Barnyard
							</div>
							<br />
							<div className="formGroup">
								<label htmlFor="location">Location of Pet</label>
								<br />
								<input type="text" id="location" placeholder="Zip Code" />
							</div>
							<br />
							<button type="submit" className="btn btn-default" onClick={this.search}>Search</button>
						</form>
					</div>
					<div className="col-xs-4 border">
						<h2>Pet Lottery</h2>
						<Random randomPets={this.state.randomPets} getSavedPets={this.getSavedPets} />
					</div>
					<div className="col-xs-4 border">
						<h2>Saved Pets</h2>
						<button id="savedPets" onClick={this.getSavedPets}>Update Saved Pets</button>
						<br />
						<br />
						<div id="savedPetsDiv"></div>
					</div>
					<div className="col-xs-1"></div>
				</div>
			</div>
		)
	}
}
