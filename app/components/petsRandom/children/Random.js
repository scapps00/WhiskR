import React from "react";

const path = require("path");
const axios = require("axios");

export default class Random extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			petCount: 0
		}
		this.nextPet = this.nextPet.bind(this);
		this.savePet = this.savePet.bind(this);
		this.likePet = this.likePet.bind(this);
		this.nextPet = this.nextPet.bind(this);
		this.getLikedPets = this.getLikedPets.bind(this);
	}

	savePet(event) {
		event.preventDefault();
		axios.get("/getLikedPets")
			.then(function(results) {
				axios.post("/savePet", {
					data: results.data[event.target.id]
				}).then(function(results) {
					this.props.getSavedPets();
				}.bind(this));
			}.bind(this)).catch(function(error) {
				console.log(error);
			});
	}

	getLikedPets() {
		axios.get("/getLikedPets")
			.then(function(results) {
				console.log(results);
				let likedPets = $("<div>");
				for (let i = 0; i < results.data.length; i++) {
					likedPets.append("<strong>Name:</strong> " + results.data[i].name + "<br>");
					let likedPetImg = $("<img>");
					likedPetImg.attr("src", results.data[i].image);
					likedPets.append(likedPetImg);
					likedPets.append("<br>");
					likedPets.append("<strong>Type of Animal:</strong> " + results.data[i].type + "<br>");
					likedPets.append("<strong>Age:</strong> " + results.data[i].age + "<br>");
					likedPets.append("<strong>Sex:</strong> " + results.data[i].sex + "<br>");
					likedPets.append("<strong>Size:</strong> " + results.data[i].size + "<br>");
					likedPets.append("<strong>Description:</strong> " + results.data[i].description + "<br>");
					likedPets.append("<strong>Location:</strong> " + results.data[i].city + ", " + results.data[i].state + "<br>");
					likedPets.append("<strong>Contact Email:</strong> " + results.data[i].email + "<br>");
					let savePetButton = $("<button>");
					savePetButton.text("Save");
					savePetButton.attr("id", i);
					savePetButton.click(function(event) {
						this.savePet(event);
					}.bind(this));
					likedPets.append(savePetButton);
					likedPets.append("<br><br>");
				}
				console.log(likedPets);
				$("#likedPetsDiv").html(likedPets);
			}.bind(this)).catch(function(error) {
				console.log(error);
			});
	}

	nextPet(event) {
		event.preventDefault();
		$("#petImg").attr("class", "animate");
		let next = (this.state.petCount + 1);
		if (next !== 10) {
			this.setState({ petCount: next });
			setTimeout(function() {
				$("#petImg").attr("class", "still");
			}, 2000);
		} else if (next == 10) {
			$(".glyphicon").css("display", "none");
			$("#petImg").css("display", "none");
			$("#petName").css("display", "none");
			this.getLikedPets();
		}
	}

	likePet(event) {
		event.preventDefault();
		axios.post("/likePet", {
				age: this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.age.$t,
				city: this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.contact.city.$t,
				description: this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.description.$t,
				email: this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.contact.email.$t,
				image: this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.media.photos.photo[3].$t,
				name: this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.name.$t,
				sex: this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.sex.$t,
				size: this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.size.$t,
				state: this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.contact.state.$t,
				type: this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.animal.$t
			}).then(function(result) {
				console.log(result);
			}.bind(this)).catch(function(error) {
				console.log(error);
			});
		$("#petImg").attr("class", "animate");
		let next = (this.state.petCount + 1);
		if (next !== 10) {
			this.setState({ petCount: next });
			setTimeout(function() {
				$("#petImg").attr("class", "still");
			}, 2000);
		} else if (next == 10) {
			$(".glyphicon").css("display", "none");
			$("#petImg").css("display", "none");
			$("#petName").css("display", "none");
			this.getLikedPets();
		}
	}

	render() {
		if (this.props.randomPets !== "") {
			return (
				<div>
					<h3 id="petName">{this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.name.$t}</h3>
					<br />
					<img id="petImg" className="still" src={this.props.randomPets[this.state.petCount].data.petfinder.pets.pet.media.photos.photo[3].$t} />
					<br />
					<span className="glyphicon glyphicon-heart" onClick={this.likePet} /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className="glyphicon glyphicon-remove" onClick={this.nextPet} />
					<div id="likedPetsDiv"></div>
				</div>
			)
		} else {
			return (
				null
			)
		}
	}
}
