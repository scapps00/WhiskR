import React from "react";

import Pets from "./Pets.js";

// import Keys from "../keys.js"

const axios = require("axios");

export default class Query extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // check initial capitalization of "pet"
      pets: []
    };
    this.search = this.search.bind(this);
  }

  search(event) {
    event.preventDefault();
    console.log(this.state);
    // axios.post("/remove").then(function(result) {}).catch(function(error) {
    //   console.log(error);
    // });
   
    for (let i = 0; i < 10; i++) {
      // let random = Math.floor(1000 * Math.random());
      let url = "http://api.petfinder.com/pet.find";
      url += "?key=5974a8605d2508662e64c88fa5150fb9";
      url += "&animal=";
      url += $("input:checked").attr("id");
			url += "&sex=";
			url += $("input[name=gender]:checked").attr("id");
			url += "&size=";
			url += $("input[name=size]:checked").attr("id");
      url += "&location=";
      url += $("#location").val();
      // url += "&offset=";
      // url += random;
      url += "&count=10&format=json&output=basic";
      // console.log(url);
   let petsToo = this.getPets(url);
   this.setState({pets: petsToo});
   console.log(this.state);  
    }
  }
getPets(url) {
   let pets = [];
   axios.get(url).then(function(result) {
        console.log(result);
        // check if initial cap necessary for pets
        pets.push(result);
      }).catch(function(error) {
        console.log(error);
      });
}
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col.md-6">
            <form>
              <div className="formGroup">
                <label htmlFor="type">What Kind of Pet Are You Looking For?</label>
                <br/>
                <fieldset className="type">
                <label className="radio-inline"><input type="radio" name="type" id="dog"/>
                Dog</label>
                <label className="radio-inline"><input type="radio" name="type" id="cat"/>
                Cat</label>
                <label className="radio-inline"><input type="radio" name="type" id="bird"/>
                Bird</label>
                <label className="radio-inline"><input type="radio" name="type" id="horse"/>
                Horse</label>
                <label className="radio-inline"><input type="radio" name="type" id="barnyard"/>
                Barnyard</label>
                <label className="radio-inline"><input type="radio" name="type" id="reptile"/>
                Reptile</label>
                <label className="radio-inline"><input type="radio" name="type" id="smallfurry"/>
                Small and Furry (e.g., hamster, ferret) </label>
                </fieldset>
              </div>

							<br/>
							<div className="formGroup1">
                <label htmlFor="gender">Gender</label>
                <br/>
                <fieldset id="gender">
								<label className="radio-inline"><input type="radio" name="gender" id="M"/>
								Male</label>
								<label className="radio-inline"><input type="radio" name="gender" id="F"/>
								Female</label>
								<label className="radio-inline"><input type="radio" name="gender" id=""/>
								Any</label>
                </fieldset>
							</div>

              
							<br/>
							<div className="formGroup2">
                <label htmlFor="size">Size</label>
                <br/>
                <fieldset className="size">
								<label className="radio-inline"><input type="radio" name="size" id="S"/>
								Small</label>
								<label className="radio-inline"><input type="radio" name="size" id="M"/>
								Medium</label>
								<label className="radio-inline"><input type="radio" name="size" id="L"/>
								Large</label>
								<label className="radio-inline"><input type="radio" name="size" id="XL"/>
								Extra-Large</label>
							</fieldset>
              </div>
              <br/>
              <div className="formGroup3">
                <label htmlFor="location">Location of Pet</label>
                <br/>
                <input type="text" id="location" placeholder="Zip Code"/>
              </div>
              <br/>
              <button type="submit" className="btn btn-default" onClick={this.search}>Search</button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col.md-6">
            <Pets pets={this.state.pets}/>
          </div>
        </div>
      </div>
    )
  }
}
